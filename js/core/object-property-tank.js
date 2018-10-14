class DataUpdateObserver {
    constructor(onUpdate) {
        this.onUpdate = onUpdate;
        this.subscribedProperty = new Map();
    }


    unregister() {
        this.subscribedProperty
            .forEach(target => {
                return target
                    .forEach(p => p.forEach(tank => {
                        if (tank.dataUpdateObservers.has(target) && tank.dataUpdateObservers.get(target).has(p)) {
                            tank.dataUpdateObservers.get(target).get(p).delete(this);
                            // $.each(this.dataUpdateObservers.get(target).get(p), (i) => {
                            //     if (this.dataUpdateObservers.get(target).get(p)[i] === this) {
                            //         this.dataUpdateObservers.get(target).get(p).splice(i, 1);
                            //         return false;
                            //     }
                            // })
                        }
                    }));
            });
        this.subscribedProperty = null;
    }
}

class ObjectPropertyTank {
    constructor() {
        this.propertiesTank = {};
        this.propertiesSources = {};

        this.dataUpdateObservers = new Map();
        this.nestedPropertyTankBlackList = new Set();


        let proxySetter = (target, p, value, receiver) => {
            if (target === this.propertiesTank && p in this.propertiesSources) {
                this.propertiesSources[p][p] = value;
            }

            //remove sub listener if removed it
            if (target[p] != null && target[p] !== value) {
                this.removeSubTargetObservers(target, p, false);
            }

            // console.debug({
            //     message: "Value changed!",
            //     target: target,
            //     p: p,
            //     value: value
            // });

            let res = Reflect.set(target, p, value, receiver);
            if (!target._isPropertyTank)
                this.pushUpdate(target, p); //emit
            return res;
        };

        this.getTankObjectProxyHandler = (originReceiver) => {
            return {
                get: (target, p, receiver) => {
                    if (p === "_target") return target;
                    if (p === "_isPropertyTank") return true;
                    if (p === "observer") {
                        return originReceiver == null ? undefined : originReceiver.observer;
                    }
                    if (!target._isPropertyTank && Reflect.get(receiver, "observer") != null) {
                        this.addObserver(target, p, receiver.observer);
                    }
                    // if (target._isPropertyTank) console.log("catched you");
                    if (target[p] !=null && typeof target[p] === "object") {
                        return new Proxy(Reflect.get(target, p, receiver), this.getTankObjectProxyHandler(receiver))
                    }
                    return Reflect.get(target, p, receiver);
                },
                set: (target, p, value, receiver) => proxySetter(target, p, value, receiver)
            }
        };
    }

    /**
     * do it before actual removed the property from target
     * since it required to search all child object and remove their observers
     * @param target
     * @param p
     * @param removeItself should the node remove itself
     */
    removeSubTargetObservers(target, p, removeItself) {
        let removedObservers = typeof target[p] === "object" ?
            Object.keys(target[p]).map(subP => this.removeSubTargetObservers(target[p], subP, true)).reduce((sum, next) => sum.concat(next), [])
            : [];

        if (removeItself && this.dataUpdateObservers.has(target) && this.dataUpdateObservers.get(target).has(p)) {
            removedObservers = removedObservers.concat(this.dataUpdateObservers.get(target).get(p));
            this.dataUpdateObservers.get(target).delete(p);
        }
        return removedObservers;
    }

    //too many map cause memory problem
    addObserver(target, p, observer) {
        if (!this.dataUpdateObservers.has(target)) this.dataUpdateObservers.set(target, new Map());
        if (!(this.dataUpdateObservers.get(target).has(p))) this.dataUpdateObservers.get(target).set(p, new Set());
        if (!this.dataUpdateObservers.get(target).get(p).has(observer)) {
            // console.debug({
            //     message: "Added 1 observer",
            //     target: target,
            //     p: p,
            //     observer: observer
            // });
            this.dataUpdateObservers.get(target).get(p).add(observer);

            //Add the remove function in observer onRemove()
            if (!(observer.subscribedProperty.has(target))) observer.subscribedProperty.set(target, new Map());
            if (!(observer.subscribedProperty.get(target).has(p))) observer.subscribedProperty.get(target).set(p, new Set());

            //todo check should add or not
            if (!observer.subscribedProperty.get(target).get(p).has(this)) {
                observer.subscribedProperty.get(target).get(p).add(this);
            }

        }
    }

    pushUpdate(target, p) {
        if (this.dataUpdateObservers.has(target) && this.dataUpdateObservers.get(target).has(p)) {
            this.dataUpdateObservers.get(target).get(p).forEach((observer) => {
                // console.debug({
                //     message: "state update",
                //     target: target,
                //     p: p
                // })
                observer.onUpdate();
            })
        }
    }

    injectFromObject(obj) {
        Object.entries(obj).forEach((entry) => {
            this.injectSinglePropFromObject(obj, entry[0]);
        });
        return this;
    }

    injectSinglePropFromObject(obj, p) {
        if (p === "observer") console.warn("Tank reserved property key word:" + entry[0]);
        this.propertiesTank[p] = obj[p];
        this.propertiesSources[p] = obj;
        // if (obj._isPropertyTank) {
        //     console.log("pt detected");
        //     if (!this.nestedPropertyTankBlackList.has(obj)) this.nestedPropertyTankBlackList.add(obj);
        // }
        return this;
    }

    createSingleProperty(p, value) {
        this.propertiesTank[p] = value;
        delete this.propertiesSources[p];
        return this;
    }

    getTankObject() {
        let self = this;
        return new Proxy(this.propertiesTank, this.getTankObjectProxyHandler());
    }
}