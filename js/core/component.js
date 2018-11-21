class Component {
    constructor(id, componentSetting) {
        this.id = id;
        this._data = componentSetting.data || function () {
            return {};
        };
        this.styleSheets = componentSetting.styleSheets || [];
        this._template = componentSetting.template || "";
        this._methods = componentSetting.methods || {};
        this._computed = componentSetting.computed || {};
        this._props = componentSetting.props || [];
        this.classStyleTransfer = componentSetting.classStyleTransfer || false;
        this._onInit = componentSetting.onInit || function () {

        };
    }

    buildNewComponent(compFunc) {
        let newCompoent = $(`<${this.id}>`)[0];
        if (compFunc != null) compFunc(compFunc);
        return this.buildComponent(newCompoent);
    }

    buildComponent(componentTagElement) {
        if (componentTagElement == null) throw "container cannot be null";
        componentTagElement._isComponentTag = true;
        let self = this;
        return new function () {
            this.destory = function () {
                safeRemoveElement(componentTagElement);
            };
            let data = self._data();
            let methods = self._methods;
            let props = {};
            self._props.forEach(propName => props[propName] = $(componentTagElement).attr(propName));


            let varsTank = new ObjectPropertyTank()
                .injectFromObject(data)
                .injectFromObject(methods)
                .injectFromObject(props)
                .injectFromObject({
                    $: function (selector) {
                        return $(componentTagElement).find(selector);
                    },
                    $element: componentTagElement,
                    $destory: this.destroy
                });
            this.vars = varsTank.getTankObject();

            let mutationLock = false;
            let propsObserver = new MutationObserver(function (mutationsList, observer) {
                if (mutationLock) return;
                for (var mutation of mutationsList) {
                    if (mutation.type === 'attributes' && self._props.indexOf(mutation.attributeName) !== -1) {
                        vars[mutation.attributeName] = $(componentTagElement).attr(mutation.attributeName);
                    }
                }
            });
            propsObserver.observe(componentTagElement, {attributes: true});

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

            // varsTank.injectFromObject({
            //     $destroy: this.destroy
            // });

            //render should return all rendered element, then can use for destroy
            let render = new templateRender(componentTagElement, this);
            varsTank.injectFromObject({
                $walk: render.walk
            });
            render.render();


            (self._onInit).apply(this.vars);

            let exportComponent = {
                setMutationLock: (lock) => mutationLock = lock,
                element: componentTagElement,
                vars: this.vars,
                evalElement: this.evalElement,
                template: this.template,
                destroy: this.destroy,
                createObserverProxy: this.createObserverProxy
            }
            componentTagElement.component = exportComponent;
            return exportComponent;

        };

    }
}

let componentManager = (function () {
    let components = {};
    return {
        register: function (component) {
            component.styleSheets.forEach(styleSheet => {
                StyleSheetManager.register(styleSheet, styleSheet)
                StyleSheetManager.setStyleSheetDisabled(styleSheet, false)
            });
            components[(component.id).toUpperCase()] = component;
        },
        getComponent: function (id) {
            if (id == null) return null;
            return components[id.toUpperCase()];
        },
        pageFactory: function (id) {
            return componentManager.getComponent(id).buildNewComponent().element;
        }
    }
})();
