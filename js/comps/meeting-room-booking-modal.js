componentManager.register(new Component("meeting-room-booking-modal", {
    // language=HTML
    template: `
        <div class="modal fade " tabindex="-1" role="dialog">
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
                        <div class="d-flex align-items-center" >
                            Duration:
                            <select ui-model="this.duration" class="d-inline-block form-control form-control-sm available-duration-select ml-1 mr-1" style="width: auto" name="">

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
                        <button type="button" class="btn btn-primary" ui-on:click="this.reserve"
                                ui-bind:disabled="(this.reservingAmount>this.availableAmount || this.reservingAmount <1)"
                                ui-bind:class="{'disabled':(this.reservingAmount>this.availableAmount || this.reservingAmount <1)}">
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
            room: null,
            schedule: null,
            displayDay: null,
            duration: 0.5
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser;
        },
        availableDurationList() {
            if (!this.room) return [];
            if (!this.user) return [];

            const maxHours = ROLES[this.user.type].availableRoom
                .find(room => room.type === this.room.type)
                .hours;

            const ret = [];
            for (let i = 1; i < maxHours * 2 + 1; i++) {
                ret.push(i * 0.5)
            }

            return ret;
        },
        updateFrom() {
            if (!this.schedule) return;

            this.schedule.to = this.schedule.from._deepTarget.addMinutes(this.duration * 60);
        },
        formattedDisplayDay() {
            if (!this.displayDay) return "";

            return $.datepicker.formatDate("dd/mm/yy", this.displayDay._deepTarget);
        },
        formattedFromTime() {
            if (!this.schedule) return "";

            return this.schedule.from._deepTarget.to12HString();
        },
        formattedToTime() {
            if (!this.schedule) return "";

            return this.schedule.to._deepTarget.to12HString();
        }
    },
    methods: {},
    onInit() {
        this.$('.modal').modal('show');
    }
}));