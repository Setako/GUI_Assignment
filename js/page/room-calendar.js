componentManager.register(new Component("room-calendar", {
    // language=HTML
    template: `
        <div class="bg-light">
            <div class="m-5 p-5">
                <div class="d-flex">
                    <!--Time col-->
                    <div class="flex-grow-0 flex-shrink-0">
                        <div>
                            <div class="border" style="height: 2rem">Time</div>
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
                        <div>
                            <div class="border" style="height: 2rem">{{this.room.name}}</div>
                            <div class="border-left border-right" style="height: 2rem"
                                 ui-for="this.room.schedule"
                                 ui-for-item-as="schedule"
                                 ui-bind:class="{'bg-warning': this.schedule.isBooked, 'border': !this.schedule.isBooked}">

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
            router: ServiceManager.getService('router'),
            rooms: [
                {
                    type: 'meeting',
                    name: 'Meeting Room 1',
                    capacity: 6,
                    record: [
                        {
                            booker: '123',
                            from: Date.of(2018, 10, 21, 9, 0),
                            to: Date.of(2018, 10, 21, 10, 30),
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
                            from: Date.of(2018, 10, 21, 9, 0),
                            to: Date.of(2018, 10, 21, 10, 30),
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
        displayRoomList() {
            const timeList = this._.getDeepTarget(this.timeList);
            return this._.getDeepTarget(this.rooms)
                .filter((room) => room.type === this.type)
                .map((room) => {
                    room.record = room.record
                        .filter((record) => record.from.isSameDay(this._.getDeepTarget(this.displayDay)));
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

                    // .forEach((record) => {
                    //     room.schedule = room.schedule
                    //         .map((schedule) => {
                    //             console.log(record.from.to12HString(), schedule.from.to12HString())
                    //             return{
                    //             ...schedule,
                    //             isBooked: record.from >= schedule.from && schedule.to <= record.to,
                    //             isStart: record.from.isSame(schedule.from),
                    //             isEnd: record.to.isSame(schedule.to)
                    //         }})
                    //
                    // });

                    return room;
                });
        }
    },
    methods: {},
    onInit() {
        this.type = this._.getDeepTarget(this.router.urlData.url).searchParams.get('type');

        this.rooms
            .forEach((room) => {
                this.$('thead tr').append(`<th scope="col">${room.name}</th>`)
            })
    }
}));