var uiModifier = uiModifier || {};
uiModifier.uiIf = (render, element, scopeVars) => {
    if ($(element).is("[ui-if]:not(ui-for)")) {
        let conditionExpression = $(element).attr("ui-if");
        let conditionFunc = function () {
            return eval(conditionExpression)
        };

        let originElement = element;
        $(originElement).removeAttr("ui-if");
        element = $("<ui-if></ui-if>").insertAfter($(originElement))[0];
        $(originElement).detach();
        let ifElementUpdate = () => {
            let conditionRes = conditionFunc.apply(observerProxyScopeVars) === true;
            let currentState = $(element).children().length > 0;
            if (conditionRes !== currentState) {
                if (conditionRes) {
                    render.walk($(originElement).clone().appendTo(element)[0], scopeVars);
                } else {
                    safeRemoveElement($(element).first()[0]);
                }
            }
        };

        let observerProxyScopeVars = render.componentInstance.createObserverProxy(ifElementUpdate, scopeVars);

        ifElementUpdate();
        //clone origin and inert/ destory and walk it

        return {
            element: element
        }
    }
};

