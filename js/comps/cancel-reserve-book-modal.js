componentManager.register(new Component("cancel-reserve-book-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" ui-if="this.book !=null">
                            Reserve cancel</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" ui-if="this.book !=null">
                        Are you sure to cancel your reservation of "{{this.book.title}}"?
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
            book: null,
            userService: ServiceManager.getService("user-service"),
            bookService: ServiceManager.getService("book-service"),
            reservingAmount: 1,
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser
        },
    },
    methods: {
        cancel() {
            this.bookService.cancelReserve(this.book.resid);
            this.$('.modal').modal('hide');
            ServiceManager.getService("notification-service").addNotification({
                content: ["Reserve cancelled!"],
                type: "warning"
            });
        }
    },
    onInit() {
        this.$('.modal').modal('show');
    }
}));