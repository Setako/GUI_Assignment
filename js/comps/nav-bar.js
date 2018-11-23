componentManager.register(new Component("nav-bar", {
    // language=HTML
    template: `
        <nav class="navbar navbar-dark navbar-expand theme-bg-color w-100">
            <route-link class="navbar-brand" href="?page=home">Library Engine</route-link>
            <ul class="navbar-nav navbar-expand mr-auto">
                <li class="nav-item">
                    <route-link href="?page=reserved-book"
                                ui-bind:class="this.getRouteLinkClass('reserved-book',this.currentPage)">
                        Reserved Books
                    </route-link>
                </li>
                <li class="nav-item">
                    <route-link href="?page=room-booking"
                                ui-bind:class="this.getRouteLinkClass('room-booking',this.currentPage)">
                        Room Booking
                    </route-link>
                    
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
                    <a href="javascript:void(0)" class="nav-link" style="outline: none"
                       ui-on:click="this.showLoginModal">Login</a>
                </li>

                <li class="nav-item dropdown" ui-if="this.userService.isLoggedIn">
                    <a href="javascript:void(0)" class="nav-link user-button" style="outline: none;"
                       ui-on:click="this.openUserMenu">Hi, {{this.userService.isLoggedIn?this.userService.loggedInUser.name:""}}</a>
                    <div class="dropdown-menu dropdown-menu-right user-menu" aria-labelledby="navbarDropdown"
                         style="box-shadow:#000 0px 1px 2px"
                         ui-on:click="(e)=>e.stopPropagation()">
                        <!--<a class="dropdown-item" href="#">Action</a>-->
                        <!--<a class="dropdown-item" href="#">Another action</a>-->
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="javascript:void(0)" ui-on:click="this.userService.logout()">Logout</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a href="javascript:void(0)" class="nav-link setting-button material-icons"
                       style="outline: none;"
                       ui-on:click="this.openSettingMenu">
                        settings
                    </a>
                    <div class="dropdown-menu dropdown-menu-right setting-menu" aria-labelledby="navbarDropdown"
                         style="box-shadow:#000 0px 1px 2px"
                         ui-on:click="(e)=>e.stopPropagation()">
                        <a class="dropdown-item" href="javascript:void(0)" ui-on:click="FontSizer.toggle()">
                            <i class="material-icons" style="vertical-align: middle">
                                format_size
                            </i> Toggle font size
                        </a>
                    </div>
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
        openUserMenu: function (e) {
            this.$(".user-menu").show("blind", {duration: 200});
            // e.stopPropagation();
        },
        openSettingMenu: function (e) {
            this.$(".setting-menu").show("blind", {duration: 200});
            // e.stopPropagation();
        },
        searchBarFadeIn: function (element, endCallback) {
            $(element).hide().fadeIn(300, endCallback);
        },
        searchBarFadeOut: function (element, endCallback) {
            $(element).fadeOut(300, endCallback)
        },
        showLoginModal: function (event) {
            event.preventDefault();
            $(componentManager.getComponent("auth-modal").buildNewComponent().element).appendTo($("#auth-modal-area"));
        },
        search(e) {
            const type = ['keyup', 'keydown'];
            if (type.indexOf(e.originalEvent.type) !== -1 && e.keyCode !== 13) return;

            if (this.searchContent.trim().length === 0) {
                return this.router.navigate('?page=search');
            }

            const data = {
                searchItemTypeList: [{
                    type: "Book",
                    checked: true
                }, {
                    type: "Magazine",
                    checked: true
                }, {
                    type: "Software",
                    checked: true
                }],
                searchConditionList: [{
                    field: 'Any',
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
        this.$(".dropdown-menu").hide();
        // $("body").click(() => this.$(".user-menu").hide("blind", {duration: 200}))
        $(document).click((e) => {
            if (e.target.closest(".setting-button") == null && e.target.closest(".setting-menu") == null)
                this.$(".setting-menu").hide("blind", {duration: 200})
            if (e.target.closest(".user-button") == null && e.target.closest(".user-menu") == null)
                this.$(".user-menu").hide("blind", {duration: 200})

        })
        // this.userService.login("student1", "student1");
        // this.userService.logout();
        // this.userService.login("student1", "student1");
    }
}));