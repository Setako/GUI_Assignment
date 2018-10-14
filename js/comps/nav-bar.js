componentManager.register(new Component("nav-bar", {
    // language=HTML
    template: `
        <nav class="navbar navbar-dark navbar-expand theme-bg-color">
            <ul class="navbar-nav navbar-expand mr-auto">
                <li class="nav-item">
                    <route-link href="" linkclass="nav-link actived-route">Home</route-link>
                </li>
                <li class="nav-item">
                    <route-link href="" linkclass="nav-link">Reserved Books</route-link>
                </li>
                <li class="nav-item">
                    <route-link href="" linkclass="nav-link">Meeting Room Booking</route-link>
                </li>
            </ul>
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
            </form>
            <route-link href="" class="ml-3" linkclass="pl-3 pr-3" linkstyle="color:white;">Login</route-link>
        </nav>
    `
}))