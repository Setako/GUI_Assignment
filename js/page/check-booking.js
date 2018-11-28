componentManager.register(new Component("check-booking", {
    // language=HTML
    template: `
        <div class="material-icons"
             id="back-to-top"
             style="display: none ;position: fixed; bottom: 2rem; right: 2rem; font-size: 3rem; line-height: 3rem;
                  border-radius: 50%; background-color: #ffa41e;color:white;cursor: pointer;user-select: none;
                  box-shadow: #4e555b 0px 0px 2px; z-index: 10;
                  -moz-user-select: none;  -webkit-user-select: none; user-select: none">
            arrow_upward
        </div>
        <div class="d-flex justify-content-center" ui-if="!this.user">
            <div class="flex-grow-0 flex-shrink-0" style="max-width: 1280px; width: 100%;">
                <div class="alert alert-info" ui-if="!this.isLoggedIn">
                    To use our advance features, please login now.
                </div>
                <div class="flex-grow-0 flex-shrink-0">
                    <div class="d-flex justify-content-center">
                        <div class="jumbotron flex-shrink-0 flex-grow-0" style="max-width: 1280px; width: 100%;">
                            <h1 class="display-4">Wanna book a room?</h1>
                            <p class="lead">We provided room booking function for your to book the room your want.</p>
                            <hr class="my-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pl-4 pr-4 bg-light" style="min-height: 89vh;" ui-if="!!this.user">
            <div class="row">
                <div class="col-lg-3 col-sm-12 bg-light p-3">
                    <div class="card flex-shrink-0 flex-grow-0">
                        <div class="card-header">
                            Today Quota
                        </div>
                        <div class="card-body">
                            <div class="mb-2" ui-for="this.todayQuotaList" ui-for-item-as="todayQuota">
                                <span class="text-capitalize">{{this.todayQuota.type}} Room:</span>
                                <span> {{this.todayQuota.used}} / {{this.todayQuota.total}} Hours</span>
                                <div class="progress bg-success">
                                    <div class="progress-bar bg-danger" role="progressbar"
                                         ui-bind:style="{width: this.todayQuota.percentage + '%'}"
                                         ui-bind:aria-valuenow="{{this.todayQuota.used}}"
                                         ui-bind:aria-valuemax="{{this.todayQuota.total}}"
                                         aria-valuemin="0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-sm-12 bg-light p-3">
                    <div class="list-group-flush mb-5 pb-5">
                        <div class="list-group-item mb-0 font-italic">
                            <span class="" ui-if="this.userRecord.length !== 0">
                                <span>{{this.userRecord.length}}</span>
                                <span>bookings</span>
                                <span>
                                    sorted by
                                    <select ui-model="this.sortBy" class="d-inline-block form-control form-control-sm"
                                            style="width: auto" name="" id="">
                                        <option value="date">date</option>
                                        <option value="hours">total hours</option>
                                    </select>
                                </span>
                                
                                <!--<span class="float-right">-->
                                    <!--<span>Items per page: </span>-->
                                    <!--<input class="d-inline-block form-control form-control-sm" style="width: auto"-->
                                           <!--type="number" min="1" max="100"-->
                                           <!--ui-model="this.displaySize">-->
                                <!--</span>-->
                            </span>
                            <span class="text-danger" ui-if="this.userRecord.length === 0">
                                <span>No booking yet!</span>
                            </span>
                        </div>

                        <div class="list-group-item mb-0"
                             ui-for="this.userRecord"
                             ui-for-item-as="record">
                            <div class="row">
                                <div class="col-xs-3 col-md-2 text-center">
                                    <img style="width: 100%; cursor: pointer;"
                                         ui-bind:src="{{this.record.imageLink ? this.record.imageLink : './res/img/no-image-available.gif'}}"
                                         class="img-rounded img-responsive"/>
                                </div>
                                <div class="col-xs-9 col-md-10 section-box">
                                    <span class="h5 text-dark">
                                        <span>
                                            {{this.record.name}}
                                            <span>
                                                ({{Date.of(this.record.from).to12HString()}} - {{Date.of(this.record.to).to12HString()}})
                                            </span>
                                        </span>
                                    </span>
                                    <hr>
                                    <span>
                                        <b>Date</b>: <span>{{Date.of(this.record.from).toTitleString()}} </span> <br>
                                        <b>Total Hours</b>: <span>{{this.record.totalHours}} Hours</span> <br>
                                        <b>Status</b>: <span class="" ui-bind:class="{'text-success': this.record.status === 'confirmed', 'text-danger': this.record.status === 'canceled'}">
                                            {{this.record.status}}
                                    </span>
                                    </span>
                                    <span class="float-right">
                                        <span ui-if="this.isPassed(this.record) && this.record.status !== 'canceled'">
                                            <a href="" class="d-flex align-items-center justify-content-center"
                                               style="text-decoration: none; outline: none; "
                                               ui-on:click="this.cancelBooking">
                                                <span style="transition:color 0.5s"
                                                      class="text-danger">Cancel</span>
                                            </a>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="d-flex justify-content-center" style="z-index: 50">-->
                    <!--<div class="list-group-item page-floating p-0"-->
                         <!--style="position: fixed; bottom: 50px; z-index: 50">-->
                            <!--<span class="pagination justify-content-center"-->
                                  <!--ui-if="this.userRecord.length !== 0 && this.displayPage >= 1 && this.displayPage <= this.totalPage">-->
                                <!--<span class="page-item justify-content-center d-inline-block"-->
                                      <!--ui-for="this.generatePaginationList(this.displayPage)"-->
                                      <!--ui-for-item-as="pagination"-->
                                      <!--ui-bind:class="{'disabled': !this.pagination.active && this.pagination.disabled, 'active': this.pagination.active}">-->
                                    <!--<button class="page-link"-->
                                            <!--ui-bind:class="{'disabled': this.pagination.disabled, 'active': this.pagination.active}"-->
                                            <!--ui-on:click="this.pagination.to">-->
                                        <!--{{this.pagination.name}}-->
                                    <!--</button>-->
                                <!--</span>-->
                            <!--</span>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
    `,
    data() {
        return {
            userService: ServiceManager.getService("user-service"),
            roomBooking: ServiceManager.getService('room-booking-service'),
            router: ServiceManager.getService('router'),
            roomList: DataStorage.data.rooms,
            sortBy: 'date',
            displaySize: 10,
            displayPage: 1
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser;
        },
        availableRoom() {
            if (!this.user) return [];

            return ROLES[this.user.type].availableRoom
        },
        todayQuotaList() {
            if (!this.user) return [];

            const today = this.user.roomBooked
                .filter((record) => Date.of(record.from).isSameDay(Date.of()))
                .filter((record => record.status === 'confirmed'));

            return this.availableRoom
                .map((room) => {
                    const totalHours = today
                        .filter((record) => record.type === room.type)
                        .map((record) => record.totalHours)
                        .reduce((sum, next) => sum + next, 0);

                    return {
                        type: room.type,
                        total: room.hours,
                        used: totalHours,
                        percentage: ((totalHours * 60) / (room.hours * 60)) * 100
                    }
                })
        },
        userRecord() {
            if (!this.user) return [];

            const record = this.user.roomBooked
                .map((record) => ({
                    ...record,
                    imageLink: this.roomList
                        .filter((room) => room.type === record.type)
                        .find((room) => room.name === record.name)
                        .imageLink
                }));

            record.sort((x, y) => {
                if (this.sortBy === 'date') {
                    return y.from - x.from
                } else {
                    return y.totalHours - x.totalHours
                }
            });

            return record;
        },
        toTitleString(date) {
            return Date.of(date).toTitleString();
        },
        totalPage() {
            return Math.ceil(this.userRecord.length / this.displaySize);
        }
    },
    methods: {
        isPassed(record) {
            return Date.of(record.to) >= Date.of();
        },
        cancelBooking(e) {
            e.preventDefault();

            const self = this;
            this.roomBooking.showCancelBooking(this.record, () => {
                self.userService = ServiceManager.getService("user-service")
            })
        },
        toggleBackToTop(topSize = 50, ms = 200) {
            document.documentElement.scrollTop > topSize
                ? this.$('#back-to-top').fadeIn(ms)
                : this.$('#back-to-top').fadeOut(ms);
        },
        backToTop(top = 0, ms = 500, callback) {
            $('html').animate({
                scrollTop: top
            }, ms, callback);
        },
    },
    onInit() {
        const self = this;

        $(window).scroll(() => self.toggleBackToTop());
        this.$('#back-to-top').click(() => self.backToTop()).click();
    }
}));