componentManager.register(new Component('reserve-book-btn', {
    // language=HTML
    template: `
        <span ui-if="this.user!=null">
        <a href="" class="d-flex align-items-center justify-content-center"
           style="text-decoration: none; outline: none; "

           ui-on:click="this.toggleFavorited">
            <i class="material-icons"
               style="transition: all 200ms ease-in-out"
               ui-bind:style="{color: !this.isReserved? 'gray':'green'}">done </i>
            <span ui-bind:style="{color: !this.isReserved? 'gray':'green'}" style="transition: all 200ms ease-in-out">Reserve</span>
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
            return this.user == null ? false : this.user.favorites.indexOf(this.resid) !== -1;
        },
    },
    methods: {
        toggleReserved(event) {
            // this.$('a').effect('puff',{percent:1000, duration: 100})
            // let user = this.user;
            // event.preventDefault();
            // if (this.isFavorited) {
            //     user.favorites._deepTarget.splice(this.user.favorites.indexOf(this.resid), 1);
            //     user.favorites = this.user.favorites._deepTarget;
            // } else {
            //     user.favorites.push(this.resid)
            //     user.favorites = this.user.favorites._deepTarget;
            // }
        }
    }
}))