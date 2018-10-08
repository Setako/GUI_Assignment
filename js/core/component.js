class Component {
    constructor(id, componentSetting) {
        this.id = id;
        this._data = componentSetting.data || new function () {
        };
        this._template = componentSetting.template || "";
        this._methods = componentSetting.methods || {};
        this._computed = componentSetting.computed || {};
        this._props = componentSetting.props || [];
        this._onInit = componentSetting.onInit || function () {

        };
    }

    buildComponent(containerElement) {
        if (containerElement == null) throw "container cannot be null";
        let self = this;
        return new function () {
            let data = self._data();
            let methods = self._methods;
            let props = {};
            self._props.forEach(propName => props[propName] = $(containerElement).attr(propName));

            let varsTank = new ObjectPropertyTank()
                .injectFromObject(data)
                .injectFromObject(methods)
                .injectFromObject(props)
                .injectFromObject({
                    $: function (selector) {
                        return $(containerElement).find(selector);
                    }
                });
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


            this.destoryObserver = (observer) => {
                observer.unregister();
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


            this.template = self._template;

            varsTank.injectFromObject({
                $destory: this.destory
            });

            //render should return all rendered element, then can use for destory
            let renderResult = new templateRender(containerElement, this).render();

            (self._onInit).apply(this.vars);

            return {
                vars: this.vars,
                evalElement: this.evalElement,
                template: this.template,
                destory: this.destory,
                createObserverProxy: this.createObserverProxy
            }

        };

    }
}

let componentManager = (function () {
    let components = {};
    return {
        register: function (component) {
            components[component.id] = component;
        },
        getComponent: function (id) {
            return components[id];
        }
    }
})();
