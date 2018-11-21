componentManager.register(new Component("room-booking", {
    styleSheets: ["./css/pages/room-booking.css"],
    // language=HTML
    template: `
        <div class="pt-5 d-flex flex-wrap align-items-center justify-content-center">
            <div class="card-deck">
                <div class="card" style="cursor: pointer"
                     ui-on:click="this.showCalendar('meeting')">
                <div class="zoom">
                    <img class="card-img-top img-fluid"
                         src="./res/img/meeting-room.png"
                         style="max-width: 15rem">
                    </div>
                    <div class=" card-body">
                    <h5 class="card-title text-center">Meeting Room</h5>
                </div>
                <div class="card-footer">

                </div>
            </div>
            <div class="card" style="cursor: pointer" ui-on:click="this.showCalendar('activity')">
                <div class="zoom">
                    <img class="card-img-top img-fluid"
                         src="./res/img/activity-room.png" style="max-width: 15rem;">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Activity Room</h5>
                </div>
                <div class="card-footer">

                </div>
            </div>
            <div class="card" style="cursor: pointer;" ui-on:click="this.showCalendar('study')">
                <div class="zoom">
                    <img class="card-img-top img-fluid"
                         src="./res/img/study-room.png" style="max-width: 15rem;">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Study Room</h5>
                </div>
                <div class="card-footer">

                </div>
            </div>
        </div>
        </div>`,
    data() {
        return {
            router: ServiceManager.getService('router')
        }
    },
    methods: {
        showCalendar(type) {
            this.router.navigate(`?page=room-calendar&type=${type}`)
        }
    }
}));