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


        let fadeInExpression = $(originElement).attr("ui-if-fade-in");

        let isFadeInPlaying = false;
        let isFadeOutPlaying = false;

        let isWaitingForBackPlaying = false;

        let displayingContentElement = null;

        function fadeIn() {
            if (isWaitingForBackPlaying) {
                isWaitingForBackPlaying = false;
                return;
            }

            if (isFadeOutPlaying) {
                isWaitingForBackPlaying = true;
                return;
            }

            let endCallback = () => {
                isFadeInPlaying = false;
                if (isWaitingForBackPlaying) {
                    isWaitingForBackPlaying = false;
                    fadeOut()
                }
            };

            displayingContentElement = $(originElement).clone()[0];
            render.walk($(displayingContentElement).appendTo(element)[0], scopeVars);

            if (!fadeInExpression) endCallback();
            else {
                let fadeInFunc = (function () {
                    return eval(fadeInExpression)
                }).apply(scopeVars);
                if (typeof fadeInFunc !== "function") throw "fade in expression must be a function";
                fadeInFunc.apply(scopeVars, [displayingContentElement, endCallback])
                if (fadeInFunc.length < 2) endCallback();
            }
        }

        let fadeOutExpression = $(originElement).attr("ui-if-fade-out");

        function fadeOut() {
            //check is there fading in animation wait, if waiting, cancel fading in animation and fading out animation
            if (isWaitingForBackPlaying) {
                isWaitingForBackPlaying = false;
                return;
            }

            if (isFadeInPlaying) {
                isWaitingForBackPlaying = true;
                return;
            }

            isFadeOutPlaying = true;

            let fadeOutElement = displayingContentElement;
            displayingContentElement = null;
            let endCallback = () => {
                isFadeOutPlaying = false;
                safeRemoveElement(fadeOutElement);
                if (isWaitingForBackPlaying) {
                    isWaitingForBackPlaying = false;
                    fadeIn()
                }
            };
            unregisterElementObserverProxy(fadeOutElement);//waiting for improve

            if (!fadeOutExpression) endCallback();
            else {
                let fadeOutFunc = (function () {
                    return eval(fadeOutExpression)
                }).apply(scopeVars);
                if (typeof fadeOutFunc !== "function") throw "fade out expression must be a function";
                fadeOutFunc.apply(scopeVars, [fadeOutElement, endCallback]);
                if (fadeOutFunc.length < 2) endCallback();
            }
        }

        let currentState = false;


        let ifElementUpdate = () => {
            let conditionRes = conditionFunc.apply(observerProxyScopeVars) === true;
            if (conditionRes !== currentState) {
                currentState = conditionRes;
                if (conditionRes) {
                    fadeIn(displayingContentElement);
                } else {
                    fadeOut(displayingContentElement);
                }
            }
        };

        let observerProxyScopeVars = render.componentInstance.createObserverProxy(ifElementUpdate, scopeVars);

        ifElementUpdate();
        //clone origin and inert/ destroy and walk it

        return {
            element: element
        }
    }
};

