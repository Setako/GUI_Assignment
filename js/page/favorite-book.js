componentManager.register(new Component("favorite-book", {
    // language=HTML
    template: `
        <div>
            <div class="row">
                <div class="col-3 h-100"
                     style="overflow: hidden; display: inline-block; background: linear-gradient(#ffffff, #e2e2e2 )"
                     ui-bind:style="{display:this.reservedBooks.length>0?'block':'none'}">

                    <div class="d-flex flex-column align-items-end flex-row cards d pt-5 pb-5 book-card-container"
                         style="overflow-y: auto;">
                    </div>

                    <span class="card d-inline-block book-card flex-shrink-0" style="width: 100%"
                          ui-for="this.favorites"
                          ui-for-item-as="favoriteBook"
                          ui-for-replace-root-as=".cards">
                        <div class="card-header " style="overflow: hidden; text-overflow: ellipsis;">
                                {{this.favoriteBook.title}}
                        </div>
                        <img class="card-img-top py-2"
                             ui-bind:src="this.favoriteBook.imageLink"
                             style="max-height: 10rem; object-fit: contain; width: 100%;"/>
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <a class="btn btn-outline-primary" ui-on:click="this.showItemDetails">Details</a>
                            </div>
                        </div>
                </span>
                </div>
                <div class="col-9"></div>
            </div>
        </div>
    `,
    styleSheets: ["./css/comps/favorite-book.css"],
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
        favorites() {
            return this.user.favorites.map(resid => this.bookService.getBookByResid(resid))
        }
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