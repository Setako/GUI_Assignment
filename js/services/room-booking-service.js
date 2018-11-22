ServiceManager.register(new Service("room-booking-service", {
    data() {
        return {};
    },
    computed: {
        roomList() {
            return DataStorage.data.rooms;
        }
    },
    methods: {
        show(room, schedule, displayDay) {
            const modal = componentManager.getComponent("meeting-room-booking-modal").buildNewComponent();
            modal.vars.room = room;
            modal.vars.schedule = schedule;
            modal.vars.displayDay = displayDay;

            $(modal.element).appendTo($("#condition-modal-area"));
        },
        book(room, record) {
            const selected = this.roomList
                .find((aRoom) => aRoom.name === room.name && aRoom.type === room.type);

            selected.record.push(record);
            DataStorage.saveData();
        }
    }
}));