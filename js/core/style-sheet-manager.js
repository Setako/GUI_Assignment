const StyleSheetManager = (function () {
    let styles = {};
    let styleGroup = {};
    return {
        register: register,
        setStyleSheetDisabled: setStyleSheetDisabled
    }

    function register(id, href, group) {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = href;
        styles[id] = link;
        if (group != null) styleGroup[id] = group;
        setStyleSheetDisabled(id, true);
    }

    function setStyleSheetDisabled(id, disabled) {
        if (styles[id] == null) throw "unknow stylesheet: " + id;
        let link = styles[id];
        if (!disabled) {
            let grp = styleGroup[id];
            let el = grp == null ? $(document.head)
                : $(document.head).find("linkgrp." + grp).length > 0
                    ? $(document.head).find("linkgrp." + grp)
                    : $("<linkgrp class='" + grp + "'></linkgrp>").appendTo(document.head);
            $(link).appendTo(el);
        } else {
            $(link).detach();
        }
        // styles[id].disabled = disabled;
    }
})();