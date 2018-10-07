var uiModifier = uiModifier || {};
uiModifier.uiExp = (render, element) => {
    console.log("exp")
    const TEMPLATE_PATTERN = /{{(.+?)}}/;//discuss: .+?  or .*?

    let emitExpressionElement = function (element) {
        try {
            element.textContent = (function () {
                return eval(element.expression)
            }).apply(element.observerProxy);
        } catch (e) {
            console.error({
                message: "Exception on template expression",
                componentInstance: render.componentInstance,
                domPath: elementUtils.getDOMPath(element),
                expression: element.expression,
                exception: e
            })
        }
    };


    const replaceTemplateExpression = function (textNode) {
        let expressionElements = []
        while (true) {
            let text = $(textNode).text();
            let regExpResult = TEMPLATE_PATTERN.exec(text);
            if (regExpResult == null) break;

            let textBeforeExpression = text.substr(0, regExpResult.index);
            let textAfterExpression = text.substr(regExpResult.index + regExpResult[0].length, text.length - 1);
            textNode.textContent = textBeforeExpression;

            let expElementJq = $("<ui-exp></ui-exp>").insertAfter($(textNode));
            expElementJq.get(0).expression = regExpResult[1];
            expElementJq.text("exp:`" + regExpResult[1] + "`");

            expressionElements.push(expElementJq.get(0));

            textNode = $(document.createTextNode(textAfterExpression)).insertAfter(expElementJq).get(0);
        }
        expressionElements.forEach(expressionElement => {
            expressionElement.observerProxy = render.componentInstance.createObserverProxy(() => emitExpressionElement(expressionElement));
            emitExpressionElement(expressionElement);
        });
        return expressionElements;

    };

    $(element).contents().filter((i, obj) => obj.nodeType === 3).each((i, obj) => replaceTemplateExpression(obj));
};

