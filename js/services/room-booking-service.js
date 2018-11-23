ServiceManager.register(new Service("room-booking-service", {
    data() {
        return {
            completeCallback: () => {
            },
            userService: ServiceManager.getService("user-service")
        };
    },
    computed: {
        roomList() {
            return DataStorage.data.rooms;
        },
        user() {
            return this.userService.loggedInUser;
        },
    },
    methods: {
        show(room, schedule, displayDay, completeCallback) {
            const modal = componentManager.getComponent("room-booking-modal").buildNewComponent();
            modal.vars.room = room;
            modal.vars.schedule = schedule;
            modal.vars.displayDay.value = displayDay;

            this.completeCallback = completeCallback ? completeCallback : this.completeCallback;

            $(modal.element).appendTo($("#condition-modal-area"));
        },
        showCancelBooking(record, completeCallback) {
            const modal = componentManager.getComponent('cancel-booking-modal').buildNewComponent();
            modal.vars.record = record;

            this.completeCallback = completeCallback ? completeCallback : this.completeCallback;

            $(modal.element).appendTo($("#condition-modal-area"));
        },
        book(room, record) {
            const selected = this.roomList
                .find((aRoom) => aRoom.name === room.name && aRoom.type === room.type);

            selected.record.push(record);
            this.user.roomBooked.push(record);
            DataStorage.saveData();

            this.completeCallback();
            this.completeCallback = () => {};
        },
        cancel(record) {
            const selected = this.user.roomBooked
                .find((room) => room.type === record.type &&
                    room.name === record.name &&
                    room.from === record.from &&
                    room.to === record.to &&
                    room.status === record.status);

            selected.status = 'canceled';

            const selectedRoom = this.roomList
                .filter((room) => room.type === record.type)
                .find((room) => room.name === record.name);

            const selectedRecord = selectedRoom.record
                .find((room) => room.booker === this.user.name &&
                    room.from === record.from &&
                    room.to === record.to &&
                    room.status === record.status);

            selectedRecord.status = 'canceled';
            DataStorage.saveData();

            this.completeCallback();
            this.completeCallback = () => {};
        }
    }
}));