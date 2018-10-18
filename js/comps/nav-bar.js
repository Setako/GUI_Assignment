componentManager.register(new Component("nav-bar", {
    // language=HTML
    template: `
        <nav class="navbar navbar-dark navbar-expand theme-bg-color" style="position: fixed; top:0; width: 100%">
            <ul class="navbar-nav navbar-expand mr-auto">
                <li class="nav-item">
                    <route-link href="?page="
                                ui-bind:class="this.getRouteLinkClass('home',this.currentPage)">Home
                    </route-link>
                </li>
                <li class="nav-item">
                    <route-link href="?page=reserved"
                                ui-bind:class="this.getRouteLinkClass('reserved',this.currentPage)">
                        Reserved Books
                    </route-link>
                </li>
                <li class="nav-item">
                    <route-link href="?page=book-room"
                                ui-bind:class="this.getRouteLinkClass('book-room',this.currentPage)">
                        Meeting Room Booking
                    </route-link>
                </li>
            </ul>
            <div class="form-inline" ui-if="this.isSearchPage"
                 ui-if-fade-in="this.searchBarFadeIn"
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
            router: ServiceManager.getService("router"),
            pageManager: ServiceManager.getService("page-manager")
        }
    },
    computed: {
        isSearchPage: function () {
            const searchPage = ['search', 'search-result'];

            return searchPage
                .indexOf(this.router.urlData.url._deepTarget.searchParams.get('page')) === -1;
        },
        currentPage: function () {
            return this.pageManager.currentPageId;
        }
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
            const type = ['keyup', 'keydown'];
            if (type.indexOf(e.originalEvent.type) !== -1) {
                if (e.keyCode !== 13) return;
            }

            const base64 = btoa(JSON.stringify({
                field: 'any',
                content: this.searchContent
            }));
            Router.navigate('?page=search&content=' + base64)
        },
        getRouteLinkClass: function (targetPage, currentPage) {
            return ({
                'nav-link': true,
                'actived-route': targetPage === currentPage
            });
        }
    },
    onInit: function () {
        // this.userService.login("student1", "student1");
        // this.userService.logout();
        // this.userService.login("student1", "student1");
    }
}));