componentManager.register(new Component("room-booking", {
    styleSheets: ["./css/pages/room-booking.css"],
    // language=HTML
    template: `
        <div class="d-flex justify-content-center" ui-if="!this.user">
            <div class="flex-grow-0 flex-shrink-0" style="max-width: 1280px; width: 100%;">
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
        <div class="pt-5 d-flex flex-wrap align-items-center justify-content-center" ui-if="!!this.user">
            <div class="card-deck">
                <div class="card" style="cursor: pointer"
                     ui-if="this.shouldDisplayType('meeting')"
                     ui-on:click="this.showCalendar('meeting')">
                    <div class="zoom p-3">
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
                <div class="card" style="cursor: pointer"
                     ui-if="this.shouldDisplayType('activity')"
                     ui-on:click="this.showCalendar('activity')">
                    <div class="zoom p-3">
                        <img class="card-img-top img-fluid"
                             src="./res/img/activity-room.png" style="max-width: 15rem;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-center">Activity Room</h5>
                    </div>
                    <div class="card-footer">

                    </div>
                </div>
                <div class="card" style="cursor: pointer;"
                     ui-if="this.shouldDisplayType('study')"
                     ui-on:click="this.showCalendar('study')">
                    <div class="zoom p-3">
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
            userService: ServiceManager.getService("user-service"),
            router: ServiceManager.getService('router')
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser;
        }
    },
    methods: {
        shouldDisplayType(type) {
            if (!this.user) return false;

            return !!ROLES[this.user.type].availableRoom
                .find((room) => room.type === type);
        },
        showCalendar(type) {
            this.router.navigate(`?page=room-calendar&type=${type}`)
        },
    }
}));