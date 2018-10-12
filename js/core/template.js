const templateRender = (function (componentTagElement, componentInstance) {
    this.slotHTML = componentTagElement.innerHTML;
    $(componentTagElement).empty();
    this.componentTagElement = componentTagElement;
    this.componentInstance = componentInstance;
    let componentObj;
    let renderedExpressionElements = [];

    let render = () => {
        componentObj = $(componentTagElement).append(componentInstance.template);
        this.walk(componentTagElement, componentInstance.vars);
    }

    this.walk = (element, scopeVars) => {
        if (element._isWalked) return;
        // $(element).contents().filter((i, obj) => obj.nodeType === 3).each((i, obj) => replaceTemplateExpression(obj));
        scopeVars = "scopeVars" in element
            ? element.scopeVars
            : scopeVars;

        Object.entries(uiModifier).forEach(entry => {
            try {
                let modifyResult = entry[1](this, element, scopeVars) || {element: element, scopeVars: scopeVars};
                element = modifyResult.element;
                scopeVars = modifyResult.scopeVars;
            } catch (e) {
                console.error({
                    message: "Error while running modifier on element",
                    componentInstance: componentInstance,
                    domPath: elementUtils.getDOMPath(element),
                    modifier: "uiModifier." + entry[0],
                    exception: e
                });
            }
        });

        let childrens = $(element).children();
        if (element === componentTagElement || !element._isComponentTag) {
            childrens.each((i, child) => this.walk(child, scopeVars));
        }

        element._isWalked = true;
    };


    return {
        render: render,

    }
});
