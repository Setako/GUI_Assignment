const StyleSheetManager = (function () {
    let styles = {};
    return {
        register: register,
        setStyleSheetDisabled: setStyleSheetDisabled
    }

    function register(id, href) {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = href;
        styles[id] = link;
        setStyleSheetDisabled(id, true);
    }

    function setStyleSheetDisabled(id, disabled) {
        if (styles[id] == null) throw "unknow stylesheet: " + id;
        let link = styles[id];
        if (!disabled) {
            $(link).appendTo($(document.head));
        } else {
            $(link).detach();
        }
        // styles[id].disabled = disabled;
    }
})();