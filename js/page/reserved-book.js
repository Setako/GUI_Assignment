componentManager.register(new Component("reserved-book", {
    // language=HTML
    template: `
        <div>
            <div ui-if="this.user==null">
                <div class="alert alert-info" ui-if="!this.isLoggedIn">
                    To use our advance features, please login now.
                </div>
            </div>
            <div class="d-flex align-items-end flex-row cards d pt-5 pb-5"
                 style="overflow-x: auto; perspective: 1000px; perspective-origin: 120%;">
            </div>
            <span class="card d-inline-block m-2 pr-2 book-card" ui-for="this.reservedBooks" ui-for-item-as="book"
                  ui-for-replace-root-as=".cards"
                  style="
                    min-width: 18rem; width: 100%;
                    /*min-height: 100%; height: 100%;*/
                    transition: all 0.5s;
                    transform: rotateY(80deg) scaleX(0.6)">
                <img class="card-img-top" ui-bind:src="this.book.imageLink"
                     style="max-height: 32rem; object-fit: contain; width: 100%;"/>
                <div class="card-body">
                    <h5 class="card-title">{{this.book.title}}</h5>
                    <p class="card-text">{{this.book.author}}</p>
                </div>
                <div class="d-flex justify-content-center">
                <a class="btn btn-outline-primary" ui-on:click="this.showItemDetails">Details</a>
                </div>
            </span>
            <h2>Reserve qouta: {{this.reservedBooks.length}} / {{ROLES[this.user.type].maxReserve}}</h2>
            <div class="progress" ui-if="this.user!=null">
                <div class="progress-bar" role="progressbar" ui-bind:style="{width: this.reservedPercentage}"
                     aria-valuenow="50"
                     aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
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
        reservedBooks() {
            return this.user == null ? [] : this.user.reserved.map(resid => this.bookService.getBookByResid(resid));
        },
        reservedPercentage() {
            return (this.user == null ? 0 : this.reservedBooks.length / ROLES[this.user.type].maxReserve) * 100 + "%";
        }

    },
    methods: {
        showItemDetails(e) {
            console.log("ok")
            e.preventDefault();
            ServiceManager
                .getService('book-service')
                .showBook(this.book)
        },
    },
    onInit() {
        let $cards = this.$('.cards');
        $cards[0].addEventListener("wheel", function (e) {
            e.preventDefault();
            let delta = (e.deltaX !== 0 ? e.deltaX : -e.deltaY) * 100;
            $cards.stop().animate({scrollLeft: $cards.scrollLeft() - delta}, 500, 'swing', function () {
            });
            // $cards.scrollLeft($cards.scrollLeft()-delta);
        })
    }

}));