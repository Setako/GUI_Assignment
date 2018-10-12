var uiModifier = uiModifier || {};
uiModifier.uiBind = (render, element, scopeVars) => {
    for (let attributeEntry of element.attributes) {
        if (attributeEntry.name.startsWith("ui-bind:")) {
            let bindingAttribute = attributeEntry.name.replace("ui-bind:", "");
            let bindingExpression = attributeEntry.value;
            let bindingActionFunc = function () {
                return eval(bindingExpression);
            };

            let bindingValueUpdate = () => {
                $(element).attr(bindingAttribute, bindingActionFunc.apply(observerProxyVars))
            };
            let observerProxyVars = render.componentInstance.createObserverProxy(bindingValueUpdate, scopeVars);
            bindingValueUpdate();
        }
    }
};

