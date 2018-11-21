componentManager.register(new Component("reserve-book-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" ui-if="this.book !=null">
                    <div class="modal-header">
                        <h5 class="modal-title">Reserve Book</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <input type="number" class="form-group" ui-bind:min="1" ui-bind:max="this.avaliableAmount">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            book: null,
            userService: ServiceManager.getService("user-service"),
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser
        },
        avaliableAmount() {
            return this.book == null ? 0 : Math.min(ROLES[this.user.type].maxReserve, this.book.copy - this.book.borrowed)
        }
    },
    onInit: function () {
        this.$('.modal').modal('show');
    }
}));