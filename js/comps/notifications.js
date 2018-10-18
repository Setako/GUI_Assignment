componentManager.register(new Component("notifications", {
    styleSheets: ["./css/comps/notifications.css"],
    // language=HTML
    template: `
        <div>
            <div ui-for="this.notificationService.notifications" ui-for-item-as="notification">
                <div class="alert" ui-bind:class="this.getNotificationClass(this.notification)" role="alert">
                    {{this.notification.content[0]}}
                    <button type="button" class="close" ui-on:click="this.notificationService.removeNotification(this.notification)">
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
        }
    },
    data: function () {
        return {
            notificationService: ServiceManager.getService("notification-service")
        }
    }
}));