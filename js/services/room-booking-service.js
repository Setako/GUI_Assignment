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
        book(room, record) {
            const selected = this.roomList
                .find((aRoom) => aRoom.name === room.name && aRoom.type === room.type);

            selected.record.push(record);
            this.user.roomBooked.push(record);
            DataStorage.saveData();

            this.completeCallback()
        }
    }
}));