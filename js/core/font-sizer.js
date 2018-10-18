const FontSizer = (function () {
    let currentSize = 0;
    let fontSizeCSS = [null, "./css/font-size/large.css", "./css/font-size/extra-large.css"];
    fontSizeCSS.filter(css => css != null).forEach(css => StyleSheetManager.register(css, css));
    return {
        toggle() {
            currentSize++;
            if (currentSize > 2) currentSize = 0;
            let currentCSS = fontSizeCSS[currentSize];
            if (currentCSS != null) StyleSheetManager.setStyleSheetDisabled(currentCSS, false);
            fontSizeCSS.filter(css => css != null && css !== currentCSS).forEach(css => StyleSheetManager.setStyleSheetDisabled(css, true));
            console.log("current font size:" + currentSize);
        }
    }
})();