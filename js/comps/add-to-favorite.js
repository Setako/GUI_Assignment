componentManager.register(new Component('add-to-favorite', {
    // language=HTML
    template: `
        <span ui-if="this.user!=null">
        <a href="" class="d-flex align-items-center justify-content-center"
           style="text-decoration: none; outline: none; "

           ui-on:click="this.toggleFavorited">
            <i class="material-icons"
               style="transition: all 200ms ease-in-out"
               ui-bind:style="{color: !this.isFavorited? 'gray':'red'}">favorite </i>
            <span ui-bind:style="{color: !this.isFavorited? 'gray':'red'}" style="transition: all 200ms ease-in-out">Favorite</span>
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
        isFavorited: function () {
            return this.user == null? false : this.user.favorites.indexOf(this.resid) !== -1;
        },
    },
    methods: {
        toggleFavorited(event) {
            this.$('a').effect('puff',{percent:1000, duration: 100})
            let user = this.user;
            event.preventDefault();
            if (this.isFavorited) {
                user.favorites._deepTarget.splice(this.user.favorites.indexOf(this.resid), 1);
                user.favorites = this.user.favorites._deepTarget;
            } else {
                user.favorites.push(this.resid)
                user.favorites = this.user.favorites._deepTarget;
            }
        }
    }
}))