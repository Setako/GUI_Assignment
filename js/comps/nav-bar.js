componentManager.register(new Component("nav-bar", {
    // language=HTML
    template: `
        <nav class="navbar navbar-dark navbar-expand theme-bg-color w-100">
            <ul class="navbar-nav navbar-expand mr-auto">
                <li class="nav-item">
                    <route-link href="?page=" ui-bind:class="this.getRouteLinkClass('home',this.currentPage)">Home
                    </route-link>
                </li>
                <li class="nav-item">
                    <route-link href="?page=reserved" linkclass="nav-link">Reserved Books</route-link>
                </li>
                <li class="nav-item">
                    <route-link href="?page=book-room" linkclass="nav-link">Meeting Room Booking</route-link>
                </li>
            </ul>
            <div class="form-inline"
                 ui-if="this.isSearchPage"
                 ui-if-fade-in="this.searchBarFadeIn"
                 ui-if-fade-out="this.searchBarFadeOut">
                <div class="input-group">
                    <input class="form-control"
                           ui-model="this.searchContent"
                           ui-on:keyup="this.search"
                           type="search"
                           placeholder="Search"
                           aria-label="Search">

                    <div class="input-group-append">
                        <button class="material-icons btn btn-primary"
                                type="button"
                                ui-on:click="this.search">
                            search
                        </button>
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
            const searchPage = ['search', 'search-result'];

            return searchPage
                .indexOf(this.router.urlData.url._deepTarget.searchParams.get('page')) === -1;
        },
        currentPage: function () {
            return this.router.urlData.url._deepTarget.searchParams.get('page');
        }
    },
    methods: {
        searchBarFadeIn: function (element, endCallback) {
            $(element).hide().fadeIn(300, endCallback);
        },
        searchBarFadeOut: function (element, endCallback) {
            $(element).fadeOut(300, endCallback)
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

            const data = {
                type: 'simple',
                searchConditionList: [{
                    field: 'any',
                    content: this.searchContent
                }]
            };

            const base64 = btoa(JSON.stringify(data));
            Router.navigate('?page=search-result&data=' + base64)
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