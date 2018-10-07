let router = {};
router._routingHandler = [];
router.navigate = function (url) {
    window.pushState()
};
router.addRoutingHandler = function (handler) {
    if (typeof handler !== "function") throw "Routing Handler must be a function";
    this._routingHandler.push(handler);
};
