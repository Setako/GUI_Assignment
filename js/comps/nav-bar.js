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
            <div class="form-inline">
                <input class="form-control mr-sm-2" ui-model:value="this.searchContent" ui-on:keyup="this.search" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-primary my-2 my-sm-0" ui-on:click="this.search">Search</button>
            </div>
            <route-link href="?page=login" class="ml-3" linkclass="pl-3 pr-3" linkstyle="color:white;">Login</route-link>
        </nav>
    `,
    data: () => ({
        searchContent: ''
    }),
    methods: {
        search(e) {
            if (e.keyCode !== 13) return;
            Router.navigate('?page=search&content=' + this.searchContent)
        }
    }
}));