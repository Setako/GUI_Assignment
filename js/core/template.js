const templateRender = (function (containerElement, componentInstance) {
    this.containerElement = containerElement;
    this.componentInstance = componentInstance;
    let componentObj;
    let renderedExpressionElements = [];

    let render = () => {
        componentObj = $(containerElement).append(componentInstance.template);
        this.walk(containerElement, componentInstance.vars);
    }

    this.walk = (element, scopeVars) => {
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
        childrens.each((i, child) => this.walk(child, scopeVars));
    };


    return {
        render: render,

    }
});
