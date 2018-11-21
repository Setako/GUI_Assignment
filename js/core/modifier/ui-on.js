var uiModifier = uiModifier || {};
uiModifier.uiOn = (render, element, scopeVars) => {
    for (let attributeEntry of element.attributes) {
        if (attributeEntry.name.startsWith("ui-on:")) {
            let bindingEvent = attributeEntry.name.replace("ui-on:", "");
            let bindingExpression = attributeEntry.value;
            let bindingEventAction = (event) => {
                let result = (function () {
                    return eval(bindingExpression);
                }).apply(scopeVars);
                return typeof result === "function" ? result.apply(scopeVars, [event]) : result;
            };


            $(element).on(bindingEvent, bindingEventAction);
        }
    }
};

