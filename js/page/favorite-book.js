componentManager.register(new Component("favorite-book", {
    // language=HTML
    template: `
    `,
    styleSheets: ["./css/comps/reserved-book.css"],
    data() {
        return {
            userService: ServiceManager.getService("user-service"),
            bookService: ServiceManager.getService("book-service")
        }
    },
    computed: {
        user() {
            return this.userService.loggedInUser;
        },
    },
    methods: {
        showItemDetails(e) {
            e.preventDefault();
            ServiceManager
                .getService('book-service')
                .showBookByResid(this.reserveRecord.resid)
        },
    },
    onInit() {
    }
}));