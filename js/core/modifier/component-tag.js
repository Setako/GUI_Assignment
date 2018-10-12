var uiModifier = uiModifier || {};
uiModifier.componentTag = (render, element, scopeVars) => {
    if (componentManager.getComponent(element.tagName) != null) {
        let component = componentManager.getComponent(element.tagName);
        component.buildComponent(element);
    }
}
