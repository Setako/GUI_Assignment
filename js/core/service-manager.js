const ServiceManager = (function () {
    let services = {};
    return {
        register: function (service) {
            services[service.id] = service.constructService();
        },
        getService: function (serviceId) {
            if (services[serviceId] == null) throw "Service not exist: " + serviceId;
            return services[serviceId];
        }
    }
})();