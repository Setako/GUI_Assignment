var uiModifier = uiModifier || {};
uiModifier.uiModel = (render, element, scopeVars) => {
    for (let attributeEntry of element.attributes) {
        if (attributeEntry.name.startsWith("ui-model:")) {
            let bindingAttribute = attributeEntry.name.replace("ui-model:", "");
            let bindingExpression = attributeEntry.value;
            let bindingActionFunc = function () {
                return eval(bindingExpression);
            };

            //binding
            let viewValueUpdate = () => {
                let value = bindingActionFunc.apply(observerProxyVars);

                if (element.tagName === "INPUT") {
                    let inputType = $(element).attr("type").toLowerCase();
                    if (inputType === "radio" || inputType === "checkbox") $(element).prop("checked", value);
                    else $(element).val(value);

                } else if (element.tagName === "SELECT") {
                    $(element).val(value);
                }
            };

            let setter = (val) => {
                if (bindingActionFunc.apply(scopeVars) !== val) {
                    console.log("set");
                    return (function () {
                        eval(bindingExpression + "='" + val+"'");
                    }).apply(scopeVars)
                }
            };


            if (element.tagName === "INPUT") {
                let inputType = $(element).attr("type").toLowerCase();
                if (inputType === "radio" || inputType === "checkbox") {
                    $(element).change(() => {
                        setter($(element).val());
                    });
                }
                else {
                    $(element).on('input',(() => {
                        setter($(element).val());
                    }));
                }
            } else if (element.tagName === "SELECT") {
                $(element).change(() => {
                    setter($(element).val());
                });
            }

            //binding event
            // if (element.tagName === "INPUT") {

            // } else if (element.tagName === "SELECT") {
            //     $(element).val(value);
            // }

            let observerProxyVars = render.componentInstance.createObserverProxy(viewValueUpdate, scopeVars);
            viewValueUpdate();
        }
    }
};

