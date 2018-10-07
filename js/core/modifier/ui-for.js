var uiModifier = uiModifier || {};
uiModifier.uiFor = (render, element, scopeVars) => {
    if ($(element).is("[ui-for]:not(ui-for)")) {
        if ($(element).is("[id]"))
            console.warn({
                message: "For tag should not have an id attribute",
                componentInstance: componentInstance,
                domPath: elementUtils.getDOMPath(element),
                id: $(element).attr("id")
            });


        const forTagUpdate = (element) => {


            let forTarget =

                let
            forItemAs = $(element.attr("ui-for-item-as"));
            let forIndexAs = $(element.attr("ui-for-index-as"));
            let forFirstAs = $(element.attr("ui-for-first-as"));
            let forLastAs = $(element.attr("ui-for-last-as"));
            let forEvenAs = $(element.attr("ui-for-even-as"));
            let forOddAs = $(element.attr("ui-for-odd-as"));


            if (forIndexAs != null) newScopeVarsTank.createSingleProperty(forIndexAs);
        };

        let newScopeVarsTank = new ObjectPropertyTank().injectFromObject(scopeVars);

        let forTargetExpression = $(element.attr("ui-for"));
        let originElement = element;
        let element = $("<ui-for></ui-for>").insertAfter($(element))[0];
        element.listItemElementPrototype = originElement.clone()[0];
        element.listItemElementPrototype.scopeVars = scopeVars;
        $(element.listItemElementPrototype).removeAttr(
            "ui-for", "ui-for-item-as", "ui-for-index-as", "ui-for-first-as",
            "ui-for-last-as", "ui-for-even-as", "ui-for-odd-as");
        $(element).attr({
            "ui-for": $(originElement.attr("ui-for")),
            "ui-for-item-as": $(originElement.attr("ui-for-item-as")),
            "ui-for-index-as": $(originElement.attr("ui-for-index-as")),
            "ui-for-first-as": $(originElement.attr("ui-for-first-as")),
            "ui-for-last-as": $(originElement.attr("ui-for-last-as")),
            "ui-for-even-as": $(originElement.attr("ui-for-even-as")),
            "ui-for-odd-as": $(originElement.attr("ui-for-odd-as")),
        });
        originElement.remove();
        let observerProxy = render.componentInstance.createObserverProxy(() => forTagUpdate());


        return {
            scopeVars: scopeVars,
            element: element
        };

    }
    //.contents().filter((i, obj) => obj.nodeType === 3).each((i, obj) => replaceTemplateExpression(obj));
};

