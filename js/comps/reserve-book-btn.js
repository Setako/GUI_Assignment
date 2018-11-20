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
            user: ServiceManager.getService('user-service').loggedInUser
        }
    },
    computed: {
        isReserved: function () {
            return this.user == null ? false : this.user.reserved.indexOf(this.resid) !== -1;
        },
    },
    methods: {
        toggleReserve(event) {
            this.$('a').hide('puff', {duration: 200});
            let user = this.user;
            event.preventDefault();
            if (this.isReserved) {
                user.reserved._deepTarget.splice(this.user.reserved.indexOf(this.resid), 1);
                user.reserved = this.user.reserved._deepTarget;
            } else {
                user.reserved.push(this.resid)
                user.reserved = this.user.reserved._deepTarget;
            }
            DataStorage.saveData();
        }
    }
}))