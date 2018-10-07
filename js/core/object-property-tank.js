class DataUpdateObserver {
    constructor(onUpdate) {
        this.onUpdate = onUpdate;
        this.onRemoveFuncs = new Map();
    }


    unregister() {
        this.onRemoveFuncs
            .forEach(vars => vars
                .forEach(funcs => funcs.forEach((func) => func())));
        this.onRemoveFuncs = new Map();
    }
}

class ObjectPropertyTank {
    constructor() {
        this.propertiesTank = {};
        this.propertiesSources = {};

        this.proxyObserverMap = {};


        this.dataUpdateObservers = new Map();

        let proxyGetter = (target, p, receiver) => {
            if (p === "observer") return undefined;
            if (Reflect.get(receiver, "observer") != null) {
                this.addObserver(target, p, receiver.observer);
            }
            if (typeof target[p] === "object") {
                return new Proxy(target[p], this.getTankObjectProxyHandler(receiver))
            }
            return Reflect.get(target, p, receiver);
        };

        let proxySetter = (target, p, value, receiver) => {
            if (target === this.propertiesTank && p in this.propertiesSources) {
                this.propertiesSources[p][p] = value;
            }

            //remove sub listener if removed it
            if (target[p] != null && target[p] !== value) {
                this.removeSubTargetObservers(target, p, false);
            }

            console.debug({
                message: "Value changed!",
                target: target,
                p: p,
                value: value
            });

            let res = Reflect.set(target, p, value, receiver);
            this.pushUpdate(target, p); //emit
            return res;
        };

        this.getTankObjectProxyHandler = (originReceiver) => {
            return {
                get: (target, p, receiver) => proxyGetter(target, p, originReceiver == null ? receiver : originReceiver),
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

    addObserver(target, p, observer) {
        if (!this.dataUpdateObservers.has(target)) this.dataUpdateObservers.set(target, new Map());
        if (!(this.dataUpdateObservers.get(target).has(p))) this.dataUpdateObservers.get(target).set(p, []);
        if (this.dataUpdateObservers.get(target).get(p).indexOf(observer) === -1) {
            console.debug({
                message: "Added 1 observer",
                target: target,
                p: p,
                observer: observer
            });
            this.dataUpdateObservers.get(target).get(p).push(observer);

            //Add the remove function in observer onRemove()
            if (!(observer.onRemoveFuncs.has(target))) observer.onRemoveFuncs.set(target,new Map());
            if (!(observer.onRemoveFuncs.get(target).has(p))) observer.onRemoveFuncs.get(target).set(p,[]);
            observer.onRemoveFuncs.get(target).get(p).push(() => {
                if (this.dataUpdateObservers.has(target) && this.dataUpdateObservers.get(target).has(p)) {
                    $.each(this.dataUpdateObservers.get(target).get(p), (i) => {
                        if (this.dataUpdateObservers.get(target).get(p)[i] === observer) {
                            console.debug({
                                message: "Removed 1 observer",
                                target: target,
                                p: p,
                                observer: observer
                            });
                            this.dataUpdateObservers.get(target).get(p).splice(i, 1);
                            return false;
                        }
                    })
                }
            });
        }
    }

    pushUpdate(target, p) {
        console.log({
            arr: target,
            o: this.dataUpdateObservers
        });
        if (this.dataUpdateObservers.has(target) && this.dataUpdateObservers.get(target).has(p)) {
            console.log(this.dataUpdateObservers.get(target));
            this.dataUpdateObservers.get(target).get(p).forEach((observer) => {
                console.log({
                    message: "state update",
                    target: target,
                    p: p
                })
                observer.onUpdate();
            })
        }
    }

    injectFromObject(obj) {
        Object.entries(obj).forEach((entry) => {
            this.propertiesTank[entry[0]] = entry[1];
            this.propertiesSources[entry[0]] = obj;
        });
        return this;
    }

    injectSinglePropFromObject(obj, p) {
        this.propertiesTank[p] = obj[p];
        this.propertiesTank[p] = obj;
    }

    createSingleProperty(p, value) {
        this.propertiesTank[p] = value;
        delete this.propertiesTank[p];
    }

    getTankObject() {
        let self = this;
        console.log(this.propertiesTank)
        return new Proxy(this.propertiesTank, this.getTankObjectProxyHandler());
    }
}