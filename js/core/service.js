class Service {
    constructor(id, serviceSetting) {
        this.id = id;
        this._data = serviceSetting.data || new function () {
        };
        this._methods = serviceSetting.methods || {};
        this._computed = serviceSetting.computed || {};
        this._onInit = serviceSetting.onInit || function () {

        };

    }

    constructService() {
        let self = this;
        return new function () {
            let data = self._data();
            let methods = self._methods;

            let varsTank = new ObjectPropertyTank()
                .injectFromObject(data)
                .injectFromObject(methods);

            this.vars = varsTank.getTankObject();

            this.createObserverProxy = (updateCallback, vars) => {
                vars = vars || this.vars;
                let observer = new DataUpdateObserver(updateCallback);
                let proxy = new Proxy(vars, {
                    // get: (target, p, receiver) => p === "observer" ? observer : Reflect.get(target, p, receiver),
                    get: (target, p, receiver) => {
                        if (p === "observer") {
                            return observer;
                        } else {
                            return Reflect.get(target, p, receiver);
                        }
                    },
                    set: (target, p, value, receiver) => {
                        return Reflect.set(target, p, value, receiver);
                    }
                });
                Object.defineProperty(proxy, "observer", {
                    writable: true,
                    configurable: true
                });
                return proxy;
            };


            let computed = {};
            let computedProxies = {};
            let vars = this.vars;
            let emitComputed = function (key) {
                vars[key] = (function () {
                    return eval(self._computed[key]);
                }).apply(computedProxies[key]).apply(computedProxies[key]);
            };
            Object.entries(self._computed).forEach(entry => computedProxies[entry[0]] = this.createObserverProxy(() => emitComputed(entry[0])));
            varsTank.injectFromObject(computed)
            Object.keys(self._computed).forEach(computedKey => emitComputed(computedKey));

            (self._onInit).apply(this.vars);

            return {
                vars: this.vars,
                template: this.template,
                createObserverProxy: this.createObserverProxy
            }

        };

    }
}