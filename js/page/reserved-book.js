componentManager.register(new Component("reserved-book", {
    // language=HTML
    template: `
        <div class="d-flex flex-wrap align-items-center justify-content-center">
            <div class="card-group">
            <span class="card d-inline-block m-2" ui-for="this.reservedBooks" ui-for-item-as="book"
                  style="width: 16rem">
                <img class="card-img-top" ui-bind:src="this.book.imageLink"
                     style="max-height: 16rem; object-fit: cover; width: 100%"/>
                <div class="card-body">
                    <h5 class="card-title">{{this.book.title}}</h5>
                    <p class="card-text">{{this.book.author}}</p>
                </div>
                <div class="card-footer">
                    
                </div>
            </span>
            </div>
        </div>
    `,
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
        reservedBooks() {
            return this.user.reserved.map(resid => this.bookService.getBookByResid(resid));
        }
    },

}));