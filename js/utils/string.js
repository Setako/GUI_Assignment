let StringUtils = (function () {
    return {
        safeString: function (raw) {
            return JSON.stringify(raw);
        }
    }
})();