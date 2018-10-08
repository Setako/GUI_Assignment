function unregisterElementObserverProxy(element) {
    if(typeof element === "object") {
        if ("observerProxy" in element) {
            element.observerProxy.unregister();
            element.observerProxy = null;

        }
        if ("scopeVars" in element) {
            element.scopeVars.observer.unregister();
            element.scopeVars.observerProxy = null;
            element.scopeVars = null;
        }
    }
}

function safeRemoveElement(element){
    $(element).children().each(el=>safeRemoveElement(el));
    unregisterElementObserverProxy(element);
    $(element).remove();
}

