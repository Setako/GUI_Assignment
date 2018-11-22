componentManager.register(new Component("room-calendar", {
    // language=HTML
    template: `
        <div class="">
            <div class="material-icons border-0 btn btn-sm btn-outline-info "
                 ui-on:click="this.toNextDay"
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
                    <span>Back to today</span>
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
            rooms: [
                {
                    type: 'meeting',
                    name: 'Meeting Room 1',
                    capacity: 6,
                    record: [
                        {
                            booker: '123',
                            from: Date.of(2018, 10, 22, 9, 0),
                            to: Date.of(2018, 10, 22, 10, 30),
                            status: 'confirmed'
                        }
                    ]
                },
                {
                    type: 'meeting',
                    name: 'Meeting Room 2',
                    capacity: 6,
                    record: [
                        {
                            booker: '123',
                            from: Date.of(2018, 10, 22, 12, 0),
                            to: Date.of(2018, 10, 22, 15, 30),
                            status: 'confirmed'
                        }
                    ]
                },
                {
                    type: 'meeting',
                    name: 'Meeting Room 3',
                    capacity: 6,
                    record: [
                        {
                            booker: '123',
                            from: Date.of(2018, 10, 22, 16, 0),
                            to: Date.of(2018, 10, 22, 17, 30),
                            status: 'confirmed'
                        }
                    ]
                }
            ],
            displayDay: Date.of()
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
            let timeLoop = Date.of(this._.getDeepTarget(this.displayDay));
            timeLoop.setHours(9, 0, 0, 0);
            return this._.range((21 - 9) * 2, 8)
                .map(() => {
                    const from = timeLoop;
                    const to = timeLoop = timeLoop.addMinutes(unit);
                    return {
                        from,
                        to,
                        formatted: `${from.to12HString()} - ${to.to12HString()}`
                    };
                });
        },
        demo() {

        },
        displayRoomList() {
            const timeList = this._.getDeepTarget(this.timeList);
            const displayDay = this._.getDeepTarget(this.displayDay);

            return this._.getDeepTarget(this.rooms)
                .filter((room) => room.type === this.type)
                .map((room) => {
                    room.record = room.record
                        .filter((record) => record.from.isSameDay(displayDay));
                    room.schedule = timeList
                        .map((schedule) => {
                            room.record
                                .some((record) => {
                                    schedule = {
                                        ...schedule,
                                        isBooked: record.from <= schedule.from && schedule.to <= record.to,
                                        isStart: record.from.isSame(schedule.from),
                                        isEnd: record.to.isSame(schedule.to)
                                    };
                                    return schedule.isBooked;
                                });
                            return schedule;
                        });
                    return room;
                });
        },
        displayDayTitle() {
            return this._.getDeepTarget(this.displayDay).toTitleString();
        },
        isToday() {
            const displayDay = this._.getDeepTarget(this.displayDay);
            return new Date().isSameDay(displayDay);
        }
    },
    methods: {
        toDatePicker(element) {
            const displayDay = this._.getDeepTarget(this.displayDay);
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
                })
                .datepicker('setDate', displayDay)
                .on('change', function () {
                    self.displayDay = $.datepicker.parseDate(dateFormat, $(this).val())
                });
        },
        addBooking(room, schedule) {
            if (schedule.isBooked) return;

            this.roomBooking.show(room, schedule, this._.getDeepTarget(this.displayDay));
        },
        toPreviousDay() {
            const displayDay = this._.getDeepTarget(this.displayDay);
            this.$('#datepicker').datepicker('setDate', displayDay.getPreviousDay());
            this.displayDay = displayDay.getPreviousDay();
        },
        toNextDay() {
            const displayDay = this._.getDeepTarget(this.displayDay);
            this.$('#datepicker').datepicker('setDate', displayDay.getNextDay());
            this.displayDay = displayDay.getNextDay();
        }
    },
    onInit() {
        this.type = this._.getDeepTarget(this.router.urlData.url).searchParams.get('type');
    }
}));