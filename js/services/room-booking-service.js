ServiceManager.register(new Service("room-booking-service", {
    data() {
        return {};
    },
    computed: {
    },
    methods: {
        show(room, schedule, displayDay) {
            const modal = componentManager.getComponent("meeting-room-booking-modal").buildNewComponent();
            modal.vars.room = room;
            modal.vars.schedule = schedule;
            modal.vars.displayDay = displayDay;

            $(modal.element).appendTo($("#condition-modal-area"));
        }
    }
}));