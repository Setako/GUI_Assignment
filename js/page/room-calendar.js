componentManager.register(new Component("room-calendar", {
    // language=HTML
    template: `
        <div class="d-flex justify-content-center" ui-if="!this.user">
            <div class="flex-grow-0 flex-shrink-0">
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
        <div class="" ui-if="!!this.user">
            <div class="material-icons border-0 btn btn-sm btn-info py-4"
                 ui-on:click="this.toNextDay"
                 ui-if="!this.isOneMonthAfter"
                 style="position: absolute; bottom: 15rem; right: 1rem; font-size: 2rem;
                  user-select: none">
                arrow_right
            </div>
            <div class="material-icons border-0 btn btn-sm btn-info py-4"
                 ui-if="!this.isToday"
                 ui-on:click="this.toPreviousDay"
                 style="position: absolute; bottom: 15rem; left: 1rem; font-size: 2rem;
                  user-select: none">
                arrow_left
            </div>

            <div class="m-5 p-4">
                <div class="text-center h3 mb-3">
                    {{this.displayDayTitle}}
                </div>
                <div class="text-right mb-2 d-flex justify-content-end">
                    <div class="input-group w-auto">
                        <div class="input-group-prepend">
                            <span class="input-group-text material-icons">calendar_today</span>
                        </div>
                        <input type="text" class="form-control d-inline-block"
                               style="width: auto" ui-init="this.toDatePicker" id="datepicker">
                    </div>

                </div>
                <div class="d-flex calendar" ui-if="!this.isReRenderCalendar">
                    <!--Time col-->
                    <div class="flex-grow-0 flex-shrink-0 time-col">
                        <div class="bg-light">
                            <div class="border text-center" style="height: 3rem">Time</div>
                            <div class="border" style="height: 2rem" ui-for="this.timeList" ui-for-item-as="time">
                                {{this.time.formatted}}
                            </div>
                        </div>
                    </div>

                    <!--Room col-->
                    <div class="flex-grow-1 flex-shrink-1 room-col d-flex"/>
                    <div class="flex-grow-1 flex-shrink-1"
                         ui-for="this.displayRoomList"
                         ui-for-item-as="room"
                         ui-for-replace-root-as=".room-col">

                        <div class="bg-light">
                            <div class="border text-center" style="height: 3rem">
                                <div>{{this.room.name}}</div>
                                <div class="text-muted">Capacity: {{this.room.capacity}} persons</div>
                            </div>
                            <div class="border-left border-right text-center"
                                 style="height: 2rem;"
                                 ui-for="this.room.schedule"
                                 ui-for-item-as="schedule"
                                 ui-on:click="this.addBooking(this.room, this.schedule)"
                                 ui-bind:style="{'cursor: pointer': !this.schedule.isBooked}"
                                 ui-bind:class="{'bg-warning': !!this.schedule.isBooked, 'border': !this.schedule.isBooked, 'border-top': this.schedule.isStart, 'border-bottom': this.schedule.isEnd}">

                                <span class="text-center text-black-50 font-italic"
                                      ui-if="this.schedule.isStart">Booked</span>
                                <span class="font-italic"
                                      ui-if="this.schedule.isBooked && !this.schedule.isStart">"</span>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,
    data() {
        return {
            type: null,
            isReRenderCalendar: false,
            userService: ServiceManager.getService("user-service"),
            router: ServiceManager.getService('router'),
            roomBooking: ServiceManager.getService('room-booking-service'),
            rooms: DataStorage.data.rooms,
            displayDay: {value: Date.of().getTime()}
        }
    },
    computed: {
        _: () => ({
            getDeepTarget(proxy) {
                return proxy._deepTarget;
            },
            range(size = 0, start = 0) {
                return [...new Array(size).keys()].map(key => key + start);
            }
        }),
        user() {
            return this.userService.loggedInUser;
        },
        timeList() {
            const unit = 30;
            let timeLoop = Date.of(this.displayDay.value);
            timeLoop.setHours(9, 0, 0, 0);
            return this._.range((21 - 9) * 2, 8)
                .map(() => {
                    const from = timeLoop;
                    const to = timeLoop = timeLoop.addMinutes(unit);
                    return {
                        from: from.getTime(),
                        to: to.getTime(),
                        formatted: `${from.to12HString()} - ${to.to12HString()}`
                    };
                });
        },
        displayRoomList() {
            const timeList = this.timeList._deepTarget;
            const displayDay = Date.of(this.displayDay.value);

            return this.rooms
                .filter((room) => room.type === this.type)
                .map((room) => ({
                    ...room,
                    record: room.record
                        .filter((record) => Date.of(record.from).isSameDay(displayDay)),
                    schedule: timeList
                        .map((schedule) => {
                            const scheduleFrom = Date.of(schedule.from);
                            const scheduleTo = Date.of(schedule.to);
                            room.record
                                .some((record) => {
                                    const recordFrom = Date.of(record.from);
                                    const recordTo = Date.of(record.to);
                                    schedule = {
                                        ...schedule,
                                        isBooked: recordFrom <= scheduleFrom && scheduleTo <= recordTo,
                                        isStart: recordFrom.isSame(scheduleFrom),
                                        isEnd: recordTo.isSame(scheduleTo),
                                        booker: record.booker
                                    };
                                    return schedule.isBooked;
                                });
                            return schedule;
                        })
                }));
        },
        displayDayTitle() {
            return Date.of(this.displayDay.value).toTitleString();
        },
        isToday() {
            const displayDay = Date.of(this.displayDay.value);
            return new Date().isSameDay(displayDay);
        },
        isOneMonthAfter() {
            const displayDay = Date.of(this.displayDay.value);
            return new Date().addMonths(1).isSameDay(displayDay);
        },
        animate() {
            const displayDay = Date.of(this.displayDay.value);
            this.$('.calendar')
                .fadeOut(0)
                .fadeIn(300)
        }
    },
    methods: {
        toDatePicker(element) {
            const displayDay = Date.of(this.displayDay.value);
            const dateFormat = 'dd/mm/yy';
            const self = this;

            $(element)
                .datepicker({
                    dateFormat,
                    defaultDate: "+1w",
                    changeMonth: true,
                    changeYear: true,
                    autoSize: true,
                    minDate: displayDay,
                    maxDate: displayDay.addMonths(1)
                })
                .datepicker('setDate', displayDay)
                .on('change', function () {
                    self.displayDay.value = $.datepicker.parseDate(dateFormat, $(this).val()).getTime();
                });
        },
        addBooking(room, schedule) {
            if (schedule.isBooked) return;
            const self = this;

            this.roomBooking.show(room._deepTarget, schedule._deepTarget, this.displayDay.value, () => {
                self.rooms = DataStorage.data.rooms;
            });
        },
        toPreviousDay() {
            const displayDay = Date.of(this.displayDay.value);
            this.$('#datepicker').datepicker('setDate', displayDay.getPreviousDay());
            this.displayDay.value = displayDay.getPreviousDay().getTime();
        },
        toNextDay() {
            const displayDay = Date.of(this.displayDay.value);
            this.$('#datepicker').datepicker('setDate', displayDay.getNextDay());
            this.displayDay.value = displayDay.getNextDay().getTime();
        }
    },
    onInit() {
        this.type = this._.getDeepTarget(this.router.urlData.url).searchParams.get('type');
    }
}));