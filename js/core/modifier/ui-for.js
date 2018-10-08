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
            let forUseIndex = $(element).attr("ui-for-use-index");
            let forIndexAs = $(element).attr("ui-for-index-as");
            let forFirstAs = $(element).attr("ui-for-first-as");
            let forLastAs = $(element).attr("ui-for-last-as");
            let forEvenAs = $(element).attr("ui-for-even-as");
            let forOddAs = $(element).attr("ui-for-odd-as");

            let itemIndexElementMap = element.itemIndexElementMap;

            let prevElement = null;
            let updatedItemIndexSet = new Set();
            forTarget.forEach((forItem, index) => {
                if (forTarget.hasOwnProperty(index)) {

                    //if list item add animation here?


                    let itemIndex = forUseIndex == null ? index : (function () {
                        return eval(forUseIndex);
                    }).apply(element.scopeVars);
                    updatedItemIndexSet.add(itemIndex);

                    let isNewElement = !itemIndexElementMap.has(itemIndex);

                    let itemElement = isNewElement
                        ? $(element.listItemElementPrototype).clone()[0]
                        : itemIndexElementMap.get(itemIndex);

                    //check is the place moved, or keep in same place
                    if (isNewElement || itemElement.prevElement !== prevElement) {
                        if (prevElement == null) $(itemElement).prependTo(element);
                        else $(itemElement).insertAfter($(prevElement));
                        if (isNewElement) {
                            itemIndexElementMap.set(itemIndex, itemElement);
                            itemElement.scopeVars = render.componentInstance.createObserverProxy(() => {
                            }, new ObjectPropertyTank().injectFromObject(element.scopeVars).getTankObject());
                        }
                        itemElement.prevElement = prevElement;
                    }

                    if (forItemAs != null) itemElement.scopeVars[forItemAs] = forItem;
                    if (forIndexAs != null) itemElement.scopeVars[forIndexAs] = index;
                    //get the index

                    let oldIndex = itemElement.forUseIndex;
                    if (forUseIndex != null) itemElement.forUseIndex = itemIndex


                    if (forFirstAs != null) itemElement.scopeVars[forFirstAs] = index === 0;
                    if (forLastAs != null) itemElement.scopeVars[forLastAs] = index === forTarget.length - 1;
                    if (forEvenAs != null) itemElement.scopeVars[forEvenAs] = index % 2 === 0;
                    if (forOddAs != null) itemElement.scopeVars[forOddAs] = index % 2 === 1;

                    if (isNewElement) render.walk(itemElement, itemElement.scopeVars);

                    prevElement = itemElement;
                }
            });
            itemIndexElementMap.forEach((itemElement, itemIndex) => {
                if (!updatedItemIndexSet.has(itemIndex)) {
                    safeRemoveElement(itemElement);
                    itemIndexElementMap.delete(itemIndex);
                }
            });

            if (forIndexAs != null) newScopeVarsTank.createSingleProperty(forIndexAs);

        };


        let originElement = element;
        element = $("<ui-for></ui-for>").insertAfter($(element))[0];

        let scopeVarsTank = new ObjectPropertyTank().injectFromObject(scopeVars);
        scopeVars = render.componentInstance.createObserverProxy(() => forTagUpdate(element), scopeVarsTank.getTankObject());
        element.scopeVars = scopeVars;

        element.listItemElementPrototype = $(originElement).clone()[0];
        element.itemIndexElementMap = new Map();
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

