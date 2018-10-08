var uiModifier = uiModifier || {};
uiModifier.uiFor = (render, element, scopeVars) => {
    if ($(element).is("[ui-for]:not(ui-for)")) {
        if (element.hasAttribute("id")) {
            console.warn({
                message: "For tag should not have an id attribute",
                componentInstance: render.componentInstance,
                domPath: elementUtils.getDOMPath(element),
                id: $(element).attr("id")
            });
        }


        let forTargetExpression = $(element).attr("ui-for");
        const forTagUpdate = (element) => {
            let forTarget = (function () {
                return eval(forTargetExpression);
            }).apply(element.scopeVars);

            let forItemAs = $(element).attr("ui-for-item-as");
            let forIndexAs = $(element).attr("ui-for-index-as");
            let forFirstAs = $(element).attr("ui-for-first-as");
            let forLastAs = $(element).attr("ui-for-last-as");
            let forEvenAs = $(element).attr("ui-for-even-as");
            let forOddAs = $(element).attr("ui-for-odd-as");

            let itemElementMap = element.itemElementMap;

            let prevElement = null;
            let updatedItemSet = new Set();
            for (let index in forTarget) {
                if (forTarget.hasOwnProperty(index)) {
                    let forItem = forTarget[index];
                    updatedItemSet.add(forItem);
                    let itemElement = itemElementMap.has(forItem)
                        ? itemElementMap.get(forItem)
                        : $(element.listItemElementPrototype).clone()[0];

                    //if list item add animation here?

                    if (prevElement == null) $(itemElement).prependTo(element);
                    else $(itemElement).insertAfter($(prevElement));

                    if (!itemElementMap.has(forItem)) {
                        itemElementMap.set(forItem, itemElement);
                        itemElement.scopeVars = new ObjectPropertyTank().injectFromObject(element.scopeVars).getTankObject();
                    }

                    if (forItemAs != null) itemElement.scopeVars[forItemAs] = forItem;
                    if (forIndexAs != null) itemElement.scopeVars[forIndexAs] = index;
                    if (forFirstAs) itemElement.scopeVars[forFirstAs] = index === 0;
                    if (forLastAs) itemElement.scopeVars[forLastAs] = index === forTarget.length - 1;
                    if (forEvenAs) itemElement.scopeVars[forEvenAs] = index % 2 === 0;
                    if (forOddAs) itemElement.scopeVars[forOddAs] = index % 2 === 1;

                    render.walk(itemElement, itemElement.scopeVars);

                    prevElement = itemElement;
                }
            }
            itemElementMap.forEach((itemElement, item) => {
                if (!updatedItemSet.has(item)) {
                    safeRemoveElement(itemElement);
                    itemElementMap.delete(item);
                }
            });

            if (forIndexAs != null) newScopeVarsTank.createSingleProperty(forIndexAs);
        };


        let originElement = element;
        element = $("<ui-for></ui-for>").insertAfter($(element))[0];

        let scopeVarsTank = new ObjectPropertyTank().injectFromObject(scopeVars);
        scopeVars = render.componentInstance.createObserverProxy(() => forTagUpdate(element), scopeVarsTank.getTankObject());


        element.listItemElementPrototype = $(originElement).clone()[0];
        element.scopeVars = scopeVars;
        element.itemElementMap = new Map();
        $(element.listItemElementPrototype).removeAttr(
            "ui-for", "ui-for-item-as", "ui-for-index-as", "ui-for-first-as",
            "ui-for-last-as", "ui-for-even-as", "ui-for-odd-as");
        $(element).attr({
            "ui-for": $(originElement).attr("ui-for"),
            "ui-for-item-as": $(originElement).attr("ui-for-item-as"),
            "ui-for-index-as": $(originElement).attr("ui-for-index-as"),
            "ui-for-first-as": $(originElement).attr("ui-for-first-as"),
            "ui-for-last-as": $(originElement).attr("ui-for-last-as"),
            "ui-for-even-as": $(originElement).attr("ui-for-even-as"),
            "ui-for-odd-as": $(originElement).attr("ui-for-odd-as"),
        });
        originElement.remove();


        forTagUpdate(element);

        return {
            scopeVars: scopeVars,
            element: element
        };

    }
    //.contents().filter((i, obj) => obj.nodeType === 3).each((i, obj) => replaceTemplateExpression(obj));
};

