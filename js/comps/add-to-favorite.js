componentManager.register(new Component('add-to-favorite', {
    // language=HTML
    template: `
        <!--disabled-->
        <span ui-if="this.user!=null && false">
        <a href="" class="d-flex align-items-center justify-content-center"
           style="text-decoration: none; outline: none; "

           ui-on:click="this.toggleFavorited">
            <i class="material-icons"
               style="transition:color 0.5s"
               ui-bind:style="{color: !this.isFavorited? 'gray':'red'}">favorite </i>
            <span style="transition:color 0.5s"
                  ui-bind:style="{color: !this.isFavorited? 'gray':'red'}">Favorite</span>
        </a>

        </span>
    `,
    props: ['resid'],
    data() {
        return {
            userService: ServiceManager.getService("user-service")
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser
        },
        isFavorited: function () {
            return this.user == null ? false : this.user.favorites.indexOf(this.resid) !== -1;
        },
    },
    methods: {
        toggleFavorited(event) {
            this.$('a').hide('puff', {duration: 200});
            let user = this.user;
            event.preventDefault();
            if (this.isFavorited) {
                user.favorites._deepTarget.splice(this.user.favorites.indexOf(this.resid), 1);
                user.favorites = this.user.favorites._deepTarget;
            } else {
                user.favorites.push(this.resid)
                user.favorites = this.user.favorites._deepTarget;
            }

            DataStorage.saveData();
        }
    }
}))