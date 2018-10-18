componentManager.register(new Component("notifications", {
    styleSheets: ["./css/comps/notifications.css"],
    // language=HTML
    template: `
        <div>
            <div ui-for="this.notificationService.notifications" ui-for-item-as="notification"
                 style="text-align: right">
                <div class="alert" ui-bind:class="this.getNotificationClass(this.notification)" role="alert"
                     style="display: inline-block; min-width: 200px;text-align: left">
                    {{this.notification.content[0]}}
                    <button type="button" class="close ml-2"
                            ui-on:click="this.removeNotification(this.notification)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    `,
    methods: {
        getNotificationClass: function (notification) {
            let classes = {};
            classes['alert-' + notification.type] = true;
            return classes
        },
        removeNotification: function (notification) {
            this.notificationService.removeNotification(notification)
        }
    },
    data: function () {
        return {
            notificationService: ServiceManager.getService("notification-service")
        }
    }
}));