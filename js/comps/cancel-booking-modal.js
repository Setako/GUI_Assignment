componentManager.register(new Component("cancel-booking-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" ui-if="this.record !=null">
                            Booking cancel</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" ui-if="this.record !=null">
                        Are you sure to cancel your booking of 
                        <span class="text-primary">
                        " <span>{{this.record.name}}</span>
                            <span>
                                ({{Date.of(this.record.from).to12HString()}} - {{Date.of(this.record.to).to12HString()}})
                            </span>"
                        </span>?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" ui-on:click="this.cancel">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            record: null,
            userService: ServiceManager.getService("user-service"),
            roomBooking: ServiceManager.getService('room-booking-service'),
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser
        },
    },
    methods: {
        cancel() {
            this.roomBooking.cancel(this.record);
            this.$('.modal').modal('hide');
            ServiceManager.getService("notification-service").addNotification({
                content: ["Booking cancelled!"],
                type: "warning"
            });
        }
    },
    onInit() {
        this.$('.modal').modal('show');
    }
}));