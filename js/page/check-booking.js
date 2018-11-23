componentManager.register(new Component("check-booking", {
    // language=HTML
    template: `
        <div>
            <div ui-if="this.user!=null" class="d-flex justify-content-center">
                <div class="card flex-shrink-0 flex-grow-0" style="max-width: 1280px; width: 100%">
                    <div class="card-header">
                        Today 
                    </div>
                    <div class="card-body">
                        Used qouta: {{this.bookService.getReserveQuotaUsed}} / {{ROLES[this.user.type].maxReserve}}
                        <div class="progress bg-success">
                            <div class="progress-bar bg-danger" role="progressbar"
                                 ui-bind:style="{width: this.reservedPercentage}"
                                 aria-valuenow="50"
                                 aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
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

    }
}));