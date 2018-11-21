componentManager.register(new Component("reserve-book-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Reserve</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" ui-if="this.book !=null">
                        <div class="d-flex">
                            <div class="col-4">
                                <img style="width: 100%"
                                     ui-bind:src="{{this.book.imageLink ? this.book.imageLink : './res/img/no-image-available.gif'}}"
                                     class="img-rounded img-responsive"/>
                            </div>
                            <div>
                                <b>Total Copys amount</b>: {{this.book.copy}} <br>
                                <b>Lending amount</b>: {{this.book.borrowed}} <br>
                                <b>Avaliable amount</b>: {{this.avaliableAmount}}
                                <div id="slider" ui-init="this.beSlider"></div>
                                <div class="input-group">
                                    <input type="number" class="form-group" ui-bind:min="1"
                                           ui-bind:max="this.avaliableAmount"
                                           ui-model="this.reservingAmount">
                                </div>
                            </div>
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
            reservingAmount: 1,
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser
        },
        avaliableAmount() {
            return this.book == null ? 0 : this.book.copy - this.book.borrowed
        },
        userQuota() {
            return ROLES[this.user.type].maxReserve - this.user.reserved
                .map(bookReserve => bookReserve.reserveAmount).reduce((sum, next) => sum + next, 0);
        }
    },
    methods: {
        beSlider(el) {
            $(el).slider()
        }
    },
    onInit() {
        this.$('.modal').modal('show');
    }
}));