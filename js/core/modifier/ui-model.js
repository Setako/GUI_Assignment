var uiModifier = uiModifier || {};
uiModifier.uiModel = (render, element, scopeVars) => {
    for (let attributeEntry of element.attributes) {
        if (attributeEntry.name === "ui-model") {
            let bindingExpression = attributeEntry.value;
            let bindingActionFunc = function () {
                return eval(bindingExpression);
            };

            //binding
            let viewValueUpdate = () => {
                let value = bindingActionFunc.apply(observerProxyVars);
                if (element.tagName === "INPUT") {
                    let inputType = $(element).attr("type").toLowerCase();
                    let boolVal = value;
                    if (Array.isArray(value)) boolVal = value.indexOf($(element).prop("value")) !== -1;
                    switch (inputType) {
                        case "radio":
                            boolVal = value === $(element).prop("value");
                            if ($(element).is(":checked") !== boolVal) $(element).prop("checked", boolVal);
                            break;
                        case "checkbox":
                            if (Array.isArray(value)) boolVal = value.indexOf($(element).prop("value")) !== -1;
                            if ($(element).is(":checked") !== boolVal) $(element).prop("checked", boolVal);
                            break;
                        default:
                            $(element).val(value);
                            break;
                    }

                } else if (element.tagName === "SELECT") {
                    $(element).val(value);
                }
            };

            let setter = (val, valKey) => {
                let settingTargetValue = bindingActionFunc.apply(scopeVars);
                if (Array.isArray(settingTargetValue)) {
                    let valKeyIndex = settingTargetValue.indexOf(valKey);
                    let valKeyInsideArray = (valKeyIndex !== -1);
                    if (val !== valKeyInsideArray) {
                        if (val) settingTargetValue.push(valKey);
                        else settingTargetValue.splice(valKeyIndex, 1);
                    }
                } else if (bindingActionFunc.apply(scopeVars) !== val) {
                    let exp;

                    if (typeof val === "boolean") exp = `${bindingExpression} = ${val}`;
                    else exp = `${bindingExpression} = ${StringUtils.safeString(val)}`;

                    (function () {
                        eval(exp);
                    }).apply(scopeVars)
                }
            };


            if (element.tagName === "INPUT") {
                let inputType = $(element).attr("type").toLowerCase();
                switch (inputType) {
                    case "radio":
                        $(element).change(() => setter($(element).val()));
                        break;
                    case "checkbox":
                        $(element).click((e) => {
                            let val = $(element).is(":checked");
                            setter(val, $(element).prop("value"));
                        });
                        break;
                    default:
                        $(element).on('input', (() => setter($(element).val())));
                        break;
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

