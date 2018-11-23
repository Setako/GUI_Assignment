componentManager.register(new Component("reserve-book-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" ui-if="this.book !=null">
                            {{this.bookService.isReserved(this.book.resid)?"Edit the ":""}}Reserve</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" ui-if="this.book !=null">

                        <!--Quota not enought-->
                        <div class="alert alert-danger" ui-if="this.userQuota ==0">
                            Sorry, your reserve quota maximum was already reach
                        </div>

                        <!--Book not have avaliable amount-->
                        <div class="alert alert-warning" ui-if="this.userQuota !=0 && this.ableToReserveAmount == 0">
                            Sorry, this resource is not avaliable to reserve yet
                        </div>

                        <div class="d-flex">
                            <div class="col-4">
                                <img style="width: 100%"
                                     ui-bind:src="{{this.book.imageLink ? this.book.imageLink : './res/img/no-image-available.gif'}}"
                                     class="img-rounded img-responsive"/>
                            </div>
                            <div class="flex-grow-1 flex-shrink-1">

                                <div>
                                    <span class="h5">{{this.book.title}}</span>
                                </div>
                                <hr>
                                <b>Total Copys amount</b>: {{this.book.copy}} <br>
                                <b>Reserved amount</b>: {{this.book.reserved}} <br>
                                <b>Lended amount</b>: {{this.book.lended}} <br>
                                <b>Available amount</b>: {{this.book.available}}
                            </div>
                        </div>
                        <div ui-if="this.ableToReserveAmount>0">
                            <hr>
                            <div>
                                Enter your reserve amount:
                                <div class="d-flex align-items-center mt-1">
                                    <input type="number" class="form-control form-control-sm mr-2" style="width: 30%"
                                           ui-bind:min="1"
                                           ui-bind:max="this.ableToReserveAmount"
                                           ui-model="this.reservingAmount">
                                    <input type="range" class="custom-range flex-grow-1 flex-shrink-1" min="1"
                                           ui-bind:max="this.ableToReserveAmount" ui-model="this.reservingAmount">
                                </div>
                                <div ui-if="this.reservingAmount > this.book.available" style="color: darkred">
                                    {{this.reservingAmount - this.book.available}} of the copys you requested will
                                    available after it returned.
                                </div>
                            </div>
                            <div>
                                Your reserve quota (used/using/remain):
                                <div class="progress bg-success">
                                    <div class="progress-bar bg-danger" role="progressbar"
                                         ui-bind:style="{width: this.userQuotaUsedPercentage+'%'}" aria-valuenow="15"
                                         aria-valuemin="0" aria-valuemax="100"></div>
                                    <div class="progress-bar bg-warning" role="progressbar"
                                         ui-bind:style="{width: this.userQuotaUsingPercentage+'%'}"
                                         aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div class="float-right">
                                    ({{this.userQuotaUsed}}/
                                    {{this.reservingAmount}}/
                                    {{this.userQuota}} )
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" ui-on:click="this.reserve"
                                ui-bind:disabled="(this.reservingAmount>this.ableToReserveAmount || this.reservingAmount <1)"
                                ui-bind:class="{'disabled':(this.reservingAmount>this.ableToReserveAmount || this.reservingAmount <1)}">
                            Reserve
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
        availableAmount() {
            return this.book == null ? 0 : Math.min(this.book.available, this.userQuota)
        },
        ableToReserveAmount() {
            return this.book == null ? 0 : Math.min(this.book.available + this.book.lended - this.book.reservedLended, this.userQuota)
        },
        userQuota() {
            return ROLES[this.user.type].maxReserve - this.user.reserved
                .map(bookReserve => bookReserve.reserveAmount).reduce((sum, next) => sum + next, 0);
        },
        userQuotaUsed() {
            return this.user.reserved.map(bookReserve => bookReserve.reserveAmount).reduce((sum, next) => sum + next, 0);
        },
        userQuotaUsedPercentage() {
            return (this.userQuotaUsed / ROLES[this.user.type].maxReserve) * 100;
        },
        userQuotaUsingPercentage() {
            return (this.reservingAmount
                / ROLES[this.user.type].maxReserve) * 100;
        },

    },
    methods: {
        reserve() {
            this.bookService.reserve({
                resid: this.book.resid,
                reserveAmount: Math.min(this.reservingAmount, this.book.available),
                reserveLendedAmount: this.reservingAmount - Math.min(this.reservingAmount, this.book.available),
                dueDate: new Date().addDays(3).getTime()
            });
            this.$('.modal').modal('hide');
            ServiceManager.getService("notification-service").addNotification({content:["Reserve success!"],type:"success"});
        }
    },
    onInit() {
        this.$('.modal').modal('show');
    }
}));