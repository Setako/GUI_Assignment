var uiModifier = uiModifier || {};
uiModifier.componentSlot = (render, element, scopeVars) => {
    if(element.tagName === "SLOT"){
        element.innerHTML = render.slotHTML;
    }
}
