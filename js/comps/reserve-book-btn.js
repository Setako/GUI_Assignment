componentManager.register(new Component('reserve-book-btn', {
    // language=HTML
    template: `
        <span ui-if="this.user!=null">
        <a href="" class="d-flex align-items-center justify-content-center"
           style="text-decoration: none; outline: none; "
           ui-on:click="this.toggleReserve">
            <i class="material-icons"
               style="transition:color 0.5s"
               ui-bind:style="{color: !this.isReserved? 'gray':'green'}">done </i>
            <span style="transition:color 0.5s"
                  ui-bind:style="{color: !this.isReserved? 'gray':'green'}">Reserve</span>
        </a>

        </span>
    `,
    props: ['resid'],
    data() {
        return {
            bookService: ServiceManager.getService("book-service"),
            userService: ServiceManager.getService("user-service")
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser
        },
        isReserved: function () {
            return this.user == null ? false : this.bookService.isReserved(this.resid)
        },
    },
    methods: {
        toggleReserve(event) {
            event.preventDefault();
            if (!this.isReserved) {
                this.bookService.showReserveBookByResid(this.resid);
            }else{
                this.bookService.showCancelReserveBookByResid(this.resid);
            }
            // this.$('a').hide('puff', {duration: 200});
            // let user = this.user;
            // if (this.isReserved) {
            //     user.reserved._deepTarget.splice(this.user.reserved.indexOf(this.resid), 1);
            //     user.reserved = this.user.reserved._deepTarget;
            // } else {
            //     user.reserved.push(this.resid)
            //     user.reserved = this.user.reserved._deepTarget;
            // }
            // DataStorage.saveData();
        }
    }
}))