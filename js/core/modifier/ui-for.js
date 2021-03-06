var uiModifier = uiModifier || {};
uiModifier.uiFor = (render, element, scopeVars) => {
    if ($(element).is("[ui-for]:not([ui-for-spawned])")) {
        if (element.hasAttribute("id")) {
            console.warn({
                message: "For tag should not have an id attribute",
                componentInstance: render.componentInstance,
                domPath: elementUtils.getDOMPath(element),
                id: $(element).attr("id")
            });
        }

        let forUpdateEmiterProxyVars;

        let forReplaceAs =  $(element).attr("ui-for-replace-root-as");
        // let forReplaceAs =  "ui-for";

        let forTargetExpression = $(element).attr("ui-for");
        let forTagUpdate = (element) => {
            let forTarget = (function () {
                return eval(forTargetExpression);
            }).apply(scopeVars);

            let forItemAs = $(element).attr("ui-for-item-as");
            const forUseIdentify = $(element).attr("ui-for-use-identify");
            let forIndexAs = $(element).attr("ui-for-index-as");
            let forFirstAs = $(element).attr("ui-for-first-as");
            let forLastAs = $(element).attr("ui-for-last-as");
            let forEvenAs = $(element).attr("ui-for-even-as");
            let forOddAs = $(element).attr("ui-for-odd-as");

            let itemIdentifyElementMap = element.itemIndexElementMap;

            let prevElement = null;
            let updatedItemIdentifySet = new Set();
            forTarget.forEach((forItem, index) => {
                if (forTarget.hasOwnProperty(index)) {
                    // console.log(forItem._target); // todo: check it, can use for compare :D

                    //if list item add animation here?

                    let itemIdentify = forUseIdentify == null ? forItem._target === undefined ? forItem : forItem._target : (function () {
                        return eval(forUseIdentify);
                    }).apply(scopeVars); // cause lag? maybe should not causing for update?

                    updatedItemIdentifySet.add(itemIdentify);

                    let isNewElement = !itemIdentifyElementMap.has(itemIdentify);

                    let itemElement = isNewElement
                        ? $(element.listItemElementPrototype).clone()[0]
                        : itemIdentifyElementMap.get(itemIdentify);

                    //check is the place moved, or keep in same place
                    if (isNewElement || itemElement.prevElement !== prevElement) {
                        if (prevElement == null) $(itemElement).prependTo(element);
                        else $(itemElement).insertAfter($(prevElement));
                        if (isNewElement) {
                            itemIdentifyElementMap.set(itemIdentify, itemElement);
                            itemElement.scopeVars = new ObjectPropertyTank().injectFromObject(scopeVars).getTankObject()


                        }
                        itemElement.prevElement = prevElement;
                        if (forItemAs != null) itemElement.scopeVars[forItemAs] = forItem;
                        // if (forUseIdentify != null) itemElement.scopeVars[forUseIdentify] = itemIdentify;
                    }

                    if (forIndexAs != null) itemElement.scopeVars[forIndexAs] = index;
                    if (forFirstAs != null) itemElement.scopeVars[forFirstAs] = index === 0;
                    if (forLastAs != null) itemElement.scopeVars[forLastAs] = index === forTarget.length - 1;
                    if (forEvenAs != null) itemElement.scopeVars[forEvenAs] = index % 2 === 0;
                    if (forOddAs != null) itemElement.scopeVars[forOddAs] = index % 2 === 1;


                    render.walk(itemElement, itemElement.scopeVars);
                    prevElement = itemElement;
                }
            });
            itemIdentifyElementMap.forEach((itemElement, itemIdentify) => {
                if (!updatedItemIdentifySet.has(itemIdentify)) {
                    safeRemoveElement(itemElement);
                    itemIdentifyElementMap.delete(itemIdentify);
                }
            });
            updatedItemIdentifySet = null;
        };


        let originElement = element;
        if(forReplaceAs == null){
            element = $(`<ui-for></ui-for>`).insertAfter($(element))[0];
        }else{
            element = $(element).parent().find(forReplaceAs)[0]//selector
        }
        $(element).attr("ui-for-spawned",true);


        element.listItemElementPrototype = $(originElement).clone()[0];
        element.itemIndexElementMap = new Map();
        $(element.listItemElementPrototype)
            .removeAttr("ui-for ui-for-item-as ui-for-index-as ui-for-first-as ui-for-last-as ui-for-even-as ui-for-odd-as");
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
        forUpdateEmiterProxyVars = render.componentInstance.createObserverProxy(() => forTagUpdate(element), scopeVars);
        (function () {
            return eval(forTargetExpression);
        }).apply(forUpdateEmiterProxyVars).forEach(() => {
        }); // emit it on the expression var chnaged

        forTagUpdate(element);

        return {
            element: element
        };

    }
    //.contents().filter((i, obj) => obj.nodeType === 3).each((i, obj) => replaceTemplateExpression(obj));
};

