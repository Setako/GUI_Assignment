componentManager.register(new Component("nav-bar", {
    // language=HTML
    template: `
        <nav class="navbar navbar-dark navbar-expand theme-bg-color">
            <ul class="navbar-nav navbar-expand mr-auto">
                <li class="nav-item">
                    <route-link href="?page=" linkclass="nav-link actived-route">Home</route-link>
                </li>
                <li class="nav-item">
                    <route-link href="?page=reserved" linkclass="nav-link">Reserved Books</route-link>
                </li>
                <li class="nav-item">
                    <route-link href="?page=book-room" linkclass="nav-link">Meeting Room Booking</route-link>
                </li>
            </ul>
            <div class="form-inline" ui-if="this.isSearchPage" ui-if-fade-in="this.searchBarFadeIn"
                 ui-if-fade-out="this.searchBarFadeOut">
                <div class="input-group">
                    <input class="form-control"
                           ui-model="this.searchContent"
                           ui-on:keyup="this.search"
                           type="search"
                           placeholder="keyword..."
                           aria-label="Search">

                    <div class="input-group-append">
                        <button class="btn btn-primary my-2 my-sm-0" ui-on:click="this.search">Search</button>
                    </div>
                </div>
            </div>
            <ul class="navbar-nav navbar-expand ml-4">
                <li class="nav-item" ui-if="!this.userService.isLoggedIn">
                    <a href="" class="nav-link" style="color:white;"
                       ui-on:click="this.showLoginModal">Login</a>
                </li>

                <li class="nav-item" ui-if="this.userService.isLoggedIn">
                    <a href="" class="nav-link"" style="color:white;"
                    ui-on:click="">{{this.userService.loggedInUser.name}}</a>
                </li>
            </ul>
        </nav>
        <div id="auth-modal-area"></div>

    `,
    data: function () {
        return {
            searchContent: '',
            loginModalDisplaying: false,
            userService: ServiceManager.getService("user-service"),
            router: ServiceManager.getService("router")
        }
    },
    computed: {
        isSearchPage: function () {
            return ['search'].indexOf(this.router.urlData.url._deepTarget.searchParams.get('page')) === -1;
        },
    },
    methods: {
        searchBarFadeIn: function (element, endCallback) {
            $(element).hide().fadeIn(1000, endCallback);
        },
        searchBarFadeOut: function (element, endCallback) {
            $(element).fadeOut(1000, endCallback)
        },
        showLoginModal: function (event) {
            event.preventDefault();
            $(componentManager.getComponent("auth-modal").buildNewComponent()).appendTo($("#auth-modal-area"));
        },
        search(e) {
            switch (e.originalEvent.type) {
                case 'keyup':
                case 'keydown':
                    if (e.keyCode !== 13) return;
            }

            Router.navigate('?page=search&content=' + this.searchContent)
        }
    },
    onInit: function () {
        // this.userService.login("student1", "student1");
        // this.userService.logout();
        // this.userService.login("student1", "student1");
    }
}));