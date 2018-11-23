componentManager.register(new Component("meeting-room-booking-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog" ui-on:hidden.bs.modal="this.destroy">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Booking</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" ui-if="!!this.room">
                        <div>
                            Room: {{this.room.name}}
                        </div>
                        <div>
                            Date: {{this.formattedDisplayDay}}
                        </div>
                        <div>
                            <span>
                                From:
                                <span class="text-primary">{{this.formattedFromTime}}</span>
                            </span>
                            <span>
                                To:
                                <span class="text-primary">{{this.formattedToTime}}</span>
                            </span>
                        </div>
                        <div class="d-flex align-items-center">
                            Duration:
                            <select ui-model="this.duration.value"
                                    class="d-inline-block form-control form-control-sm available-duration-select ml-1 mr-1"
                                    style="width: auto" name="">

                            </select>
                            <option ui-for="this.availableDurationList"
                                    ui-for-item-as="availableDuration"
                                    ui-for-replace-root-as=".available-duration-select"
                                    ui-model="this.availableDuration">
                                {{this.availableDuration}}
                            </option>
                            Hours
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" ui-on:click="this.submit">
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
        user() {
            return this.userService.loggedInUser;
        },
        availableDurationList() {
            if (!this.room || !this.user || !this.schedule) return [];
            if (!this.user) return [];

            const maxHours = ROLES[this.user.type].availableRoom
                .find(room => room.type === this.room.type)
                .hours;

            const nextBookedTime = Date.of(this.nextBookedTime);
            const from = Date.of(this.schedule.from);

            const ret = [];
            for (let i = 1; i < maxHours * 2 + 1; i++) {
                if (from.addMinutes(i * 0.5 * 60) > nextBookedTime) break;

                ret.push(i * 0.5)
            }

            return ret;
        },
        nextBookedTime() {
            if (!this.room || !this.schedule) {
                return Date.of(this.displayDay.value).addDays(1).getTime();
            }

            const displayDay = Date.of(this.displayDay.value);
            const result = this.room.schedule
                .filter((schedule) => schedule.isBooked)
                .filter((schedule) => Date.of(schedule.from) > Date.of(this.schedule.from));

            return result.length === 0
                ? Date.of(this.displayDay.value).addDays(1).getTime()
                : Date.of(result[0].from).getTime()
        },
        updateFrom() {
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
    },
    methods: {
        submit() {
            const record = {
                type: this.room.type,
                name: this.room.name,
                booker: this.user.name,
                from: this.schedule.from,
                to: this.schedule.to,
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