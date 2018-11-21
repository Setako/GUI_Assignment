var uiModifier = uiModifier || {};
uiModifier.uiInit = (render, element, scopeVars) => {
    for (let attributeEntry of element.attributes) {
        if (attributeEntry.name.startsWith("ui-init")) {
            let bindingEvent = attributeEntry.name.replace("ui-init", "");
            let bindingExpression = attributeEntry.value;
            let bindingEventAction = (event) => {
                let result = (function () {
                    return eval(bindingExpression);
                }).apply(scopeVars);
                return typeof result === "function" ? result.apply(scopeVars, [event]) : result;
            };

            bindingEventAction(element);
        }
    }
};

