componentManager.register(new Component("room-booking-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog" ui-on:hidden.bs.modal="this.destroy">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Room Booking</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" ui-if="!!this.room">
                        <div class="alert alert-danger" ui-if="this.availableQuota == 0">
                            Sorry, your booking quota ceiling has been reached
                        </div>
                        <div class="alert alert-danger" ui-if="this.room.type === 'study' && this.availableCapacity == 0">
                            Sorry, there is no available capacity for the duration you selected.
                        </div>

                        <div class="d-flex">
                            <div class="col-5">
                                <img style="width: 100%"
                                     ui-bind:src="{{this.room.imageLink ? this.room.imageLink : './res/img/no-image-available.gif'}}"
                                     class="img-rounded img-responsive"/>
                            </div>
                            <div class="flex-grow-0 flex-shrink-1" ui-if="this.room.type !== 'study'">
                                <div>
                                    <span class="h5">{{this.room.name}}</span>
                                </div>
                                <hr>
                                <b>Capacity</b>: {{this.room.capacity}} <br>
                                <b>Date</b>: {{this.formattedDisplayDay}} <br>
                                <b>From</b>: <span class="text-primary">{{this.formattedFromTime}} </span>
                                <b>To</b>: <span class="text-primary">{{this.formattedToTime}} </span> <br>
                            </div>
                            <div class="flex-grow-1 flex-shrink-0" ui-if="this.room.type === 'study'">
                                <div>
                                    <span class="h5">{{this.room.name}}</span>
                                </div>
                                <hr>
                                <b>Available Capacity</b>: {{this.availableCapacity}} <br>
                                <b>Date</b>: {{this.formattedDisplayDay}} <br>
                                <b>From</b>: <span class="text-primary">{{this.formattedFromTime}} </span>
                                <b>To</b>: <span class="text-primary">{{this.formattedToTime}} </span> <br>
                            </div>
                        </div>
                        <div ui-if="this.ableToBookAmount > 0">
                            <hr>
                            <div>
                                Enter the hours you want to book:
                                <div class="d-flex align-items-center mt-1">
                                    <select ui-model="this.duration.value"
                                            class="form-control form-control-sm available-duration-select mr-2"
                                            style="width: 30%" name="">

                                    </select>
                                    <option ui-for="this.availableDurationList"
                                            ui-for-item-as="availableDuration"
                                            ui-for-replace-root-as=".available-duration-select"
                                            ui-model="this.availableDuration">
                                        {{this.availableDuration}}
                                    </option>
                                    <input type="range" class="custom-range flex-grow-1 flex-shrink-1"
                                           min="0.5" ui-bind:max="this.ableToBookAmount" step="0.5"
                                           ui-model="this.duration.value">
                                </div>
                            </div>
                            <div>
                                Your room booking quota (used/using/remain):
                                <div class="progress bg-success">
                                    <div class="progress-bar bg-danger" role="progressbar"
                                         ui-bind:style="{width: this.userQuotaUsedPercentage+'%'}" aria-valuenow="15"
                                         aria-valuemin="0" aria-valuemax="100"></div>
                                    <div class="progress-bar bg-warning" role="progressbar"
                                         ui-bind:style="{width: this.userQuotaUsingPercentage+'%'}"
                                         aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div class="float-right">
                                    ({{this.userQuotaUsed}} /
                                    {{this.duration.value}} /
                                    {{this.userQuota - this.userQuotaUsed - this.duration.value}} hours)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" ui-if="this.room && this.room.type !== 'study'">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" ui-on:click="this.submit"
                                ui-bind:disabled="(this.ableToBookAmount === 0)"
                                ui-bind:class="{'disabled':this.ableToBookAmount === 0}">
                            Submit
                        </button>
                    </div>
                    <div class="modal-footer" ui-if="this.room && this.room.type === 'study'">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" ui-on:click="this.submit"
                                ui-bind:disabled="(this.availableCapacity === 0 || this.availableQuota === 0)"
                                ui-bind:class="{'disabled':this.availableCapacity === 0 || this.availableQuota === 0}">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            userService: ServiceManager.getService("user-service"),
            roomBookingService: ServiceManager.getService("room-booking-service"),
            room: null,
            schedule: null,
            displayDay: {value: null},
            duration: {value: 0.5}
        }
    },
    computed: {
        availableCapacity() {
            if (!this.room || !this.schedule) return 0;

            const people = this.room.schedule
                .filter((schedule) => schedule.from >= this.schedule.from && schedule.to <= this.schedule.to)
                .map((schedule) => schedule.capacity);

            return people.length === 0 ? 0 : Math.min(...people);
        },
        user() {
            return this.userService.loggedInUser;
        },
        userQuota() {
            if (!this.room || !this.schedule || !this.user) return 0;

            const selectRoom = ROLES[this.user.type].availableRoom
                .find(room => room.type === this.room.type);
            return selectRoom ? selectRoom.hours : 0;
        },
        userQuotaUsed() {
            if (!this.room || !this.schedule || !this.user) return 0;

            return this.user.roomBooked
                .filter((record) => record.type === this.room.type &&
                    Date.of(record.from).isSameDay(Date.of(this.schedule.from)))
                .filter((record) => record.status === 'confirmed')
                .reduce((result, next) => result + next.totalHours, 0)
        },
        availableQuota() {
            if (!this.room) return 0;

            return this.userQuota - this.userQuotaUsed
        },
        availableDurationList() {
            if (!this.room || !this.user || !this.schedule) return [];
            if (!this.user) return [];

            const nextBookedTime = Date.of(this.nextBookedTime);
            const from = Date.of(this.schedule.from);

            const ret = [];
            for (let i = 1; i < this.availableQuota * 2 + 1; i++) {
                if (from.addMinutes(i * 0.5 * 60) > nextBookedTime) break;

                ret.push(i * 0.5)
            }

            return ret;
        },
        ableToBookAmount() {
            const maxDuration = this.availableDurationList.length === 0
                ? 0 : Math.max(...this.availableDurationList);

            return Math.min(this.availableQuota, maxDuration)
        },
        nextBookedTime() {
            if (!this.room || !this.schedule) {
                return Date.of(this.displayDay.value).addDays(1).getTime();
            }

            if (this.room.type === 'study') {
                const result = this.room.schedule
                    .filter((schedule) => schedule.capacity === 0)
                    .filter((schedule) => Date.of(schedule.from) > Date.of(this.schedule.from));

                return result.length === 0
                    ? Date.of(this.room.schedule[this.room.schedule.length - 1].to).getTime()
                    : Date.of(result[0].from).getTime()
            }

            const result = this.room.schedule
                .filter((schedule) => schedule.isBooked)
                .filter((schedule) => Date.of(schedule.from) > Date.of(this.schedule.from));

            return result.length === 0
                ? Date.of(this.room.schedule[this.room.schedule.length - 1].to).getTime()
                : Date.of(result[0].from).getTime()
        },
        updateTo() {
            if (!this.schedule) return;

            this.schedule.to = Date.of(this.schedule.from).addMinutes(this.duration.value * 60).getTime();
        },
        formattedDisplayDay() {
            if (!this.displayDay.value) return "";

            return $.datepicker.formatDate("dd/mm/yy", Date.of(this.displayDay.value));
        },
        formattedFromTime() {
            if (!this.schedule) return "";

            return Date.of(this.schedule.from).to12HString();
        },
        formattedToTime() {
            if (!this.schedule) return "";

            return Date.of(this.schedule.to).to12HString();
        },
        userQuotaUsedPercentage() {
            return (this.userQuotaUsed / this.userQuota) * 100;
        },
        userQuotaUsingPercentage() {
            return (this.duration.value / this.userQuota) * 100;
        },
    },
    methods: {
        submit() {
            const from = Date.of(this.schedule.from);
            const to = Date.of(this.schedule.to);
            const record = {
                type: this.room.type,
                name: this.room.name,
                booker: this.user.name,
                from: this.schedule.from,
                to: this.schedule.to,
                totalHours: to.getHours() - from.getHours() + ((to.getMinutes() - from.getMinutes()) / 60),
                status: 'confirmed'
            };

            this.roomBookingService.book(this.room, record);
            this.$('.modal').modal('hide');
        },
        destroy() {
            this.$destroy();
        }
    },
    onInit() {
        this.$('.modal').modal('show');
    }
}));