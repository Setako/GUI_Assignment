ServiceManager.register(new Service("notification-service", {
    data: function () {
        return {
            notifications: []
        }
    },
    methods: {
        addNotification: function (notification) {
            this.notifications.push(notification);
            setTimeout(() => this.removeNotification(notification), 5000)
        },
        removeNotification: function (notification) {
            if (this.notifications._deepTarget.indexOf(notification) === -1) return;
            this.notifications._deepTarget.splice(this.notifications._deepTarget.indexOf(notification), 1);
            this.notifications = this.notifications._deepTarget;
        }
    },
    onInit: function () {
    }
}));