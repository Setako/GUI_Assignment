ServiceManager.register(new Service("notification-service", {
    data: function () {
        return {
            notifications: []
        }
    },
    methods: {
        addNotification: function (notification) {
            this.notifications.push(notification);
        },
        removeNotification: function(notification){
            this.notifications.splice(this.notifications.indexOf(notification));
        }
    },
    onInit:function(){
    }
}));