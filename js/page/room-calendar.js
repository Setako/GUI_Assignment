componentManager.register(new Component("room-calendar", {
    // language=HTML
    template: `
        <div class="">
            <div class="material-icons border-0 btn btn-sm btn-outline-info "
                 ui-on:click="this.toNextDay"
                 ui-if="!this.isOneMonthAfter"
                 style="position: absolute; bottom: 15rem; right: 1rem; font-size: 2rem;
                  user-select: none">
                arrow_right
            </div>
            <div class="material-icons border-0 btn btn-sm btn-outline-info"
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
                <div class="text-right mb-2">
                    <input type="text" class="form-control form-control-sm d-inline-block"
                           style="width: auto" ui-init="this.toDatePicker" id="datepicker">
                </div>
                <div class="d-flex">
                    <!--Time col-->
                    <div class="flex-grow-0 flex-shrink-0 time-col">
                        <div class="bg-light">
                            <div class="border text-center" style="height: 2rem">Time</div>
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

                        <div class="bg-light"
                             ui-if="!this.isReRenderCalendar">
                            <div class="border text-center" style="height: 2rem">{{this.room.name}}</div>
                            <div class="border-left border-right"
                                 style="height: 2rem;"
                                 ui-for="this.room.schedule"
                                 ui-for-item-as="schedule"
                                 ui-on:click="this.addBooking(this.room, this.schedule)"
                                 ui-bind:style="{'cursor: pointer': !this.schedule.isBooked}"
                                 ui-bind:class="{'bg-warning': !!this.schedule.isBooked, 'border': !this.schedule.isBooked}">
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
            router: ServiceManager.getService('router'),
            roomBooking: ServiceManager.getService('room-booking-service'),
            rooms: DataStorage.data.rooms,
            displayDay: Date.of().getTime()
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
        timeList() {
            const unit = 30;
            let timeLoop = Date.of(this.displayDay);
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
            const displayDay = Date.of(this.displayDay);

            const ret=  this.rooms
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
                                        isEnd: recordTo.isSame(scheduleTo)
                                    };
                                    return schedule.isBooked;
                                });
                            return schedule;
                        })
                }));

            console.log(ret)

            return ret;
        },
        displayDayTitle() {
            return Date.of(this.displayDay).toTitleString();
        },
        isToday() {
            const displayDay = Date.of(this.displayDay);
            return new Date().isSameDay(displayDay);
        },
        isOneMonthAfter() {
            const displayDay = Date.of(this.displayDay);
            return new Date().addMonths(1).isSameDay(displayDay);
        }
    },
    methods: {
        toDatePicker(element) {
            const displayDay = Date.of(this.displayDay);
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
                    self.displayDay = $.datepicker.parseDate(dateFormat, $(this).val()).getTime();
                });
        },
        addBooking(room, schedule) {
            if (schedule.isBooked) return;
            this.roomBooking.show(room._deepTarget, schedule._deepTarget, this.displayDay);
        },
        toPreviousDay() {
            const displayDay = Date.of(this.displayDay);
            this.$('#datepicker').datepicker('setDate', displayDay.getPreviousDay());
            this.displayDay = displayDay.getPreviousDay().getTime();
        },
        toNextDay() {
            const displayDay = Date.of(this.displayDay);
            this.$('#datepicker').datepicker('setDate', displayDay.getNextDay());
            this.displayDay = displayDay.getNextDay().getTime();
        }
    },
    onInit() {
        this.type = this._.getDeepTarget(this.router.urlData.url).searchParams.get('type');
    }
}));