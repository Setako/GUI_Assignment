let elementUtils = (function () {

    this.getDOMPath = function (el) {
        let path = el !== document ? getDOMPath($(el).parent().get(0)) : [];
        path.push(el);
        return path;
    };
    return {
        getDOMPath: this.getDOMPath
    }
})();