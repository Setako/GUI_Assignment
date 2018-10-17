var uiModifier = uiModifier || {};
uiModifier.uiBind = (render, element, scopeVars) => {
    for (let attributeEntry of element.attributes) {
        if (attributeEntry.name.startsWith("ui-bind:")) {
            let bindingAttribute = attributeEntry.name.replace("ui-bind:", "");
            let bindingExpression = attributeEntry.value;
            let bindingActionFunc = function (isObject) {
                return eval(isObject ? `(${bindingExpression})` : bindingExpression);
            };

            let bindingValueUpdate = () => {
                    let result;
                    let $element = $(element);
                    switch (bindingAttribute) {
                        case "class":
                            result = bindingActionFunc.apply(observerProxyVars, [true]);
                            Object.entries(result).forEach(entry => {
                                if (entry[1] && !$element.hasClass(entry[0])) $element.addClass(entry[0]);
                                if (!entry[1] && $element.hasClass(entry[0])) $element.removeClass(entry[0]);
                            });
                            break;
                        case "style":
                            result = bindingActionFunc.apply(observerProxyVars, [true]);
                            Object.entries(result).forEach(entry => $element.css(entry[0], entry[1]));
                            break;
                        default:
                            result = bindingActionFunc.apply(observerProxyVars);
                            $element.attr(bindingAttribute, bindingActionFunc.apply(observerProxyVars))
                            break;
                    }
                }
            ;
            let observerProxyVars = render.componentInstance.createObserverProxy(bindingValueUpdate, scopeVars);
            bindingValueUpdate();
        }
    }
};

