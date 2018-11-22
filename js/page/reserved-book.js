componentManager.register(new Component("reserved-book", {
    // language=HTML
    template: `
        <div class="d-flex justify-content-center">
            <div style="width: 100%; overflow: hidden" class="flex-grow-0 flex-shrink-0">
                <div ui-if="this.user==null">
                    <div class="alert alert-info" ui-if="!this.isLoggedIn">
                        To use our advance features, please login now.
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="jumbotron flex-shrink-0 flex-grow-0" ui-if="this.reservedBooks.length==0"
                         style="max-width: 1280px; width: 100%;">
                        <h1 class="display-4">Wanna reserve a book?</h1>
                        <p class="lead">We provided book reserve function for your to reserve the books your want.</p>
                        <hr class="my-4">
                        <p>Let's start to pick a book!</p>
                        <route-link href="?page=search">
                            <button class="btn btn-primary btn-lg" href="#" role="button">Search a book</button>
                        </route-link>
                    </div>
                </div>
                <div class="mb-3" style="overflow: hidden; display: inline-block; background: linear-gradient(#ffffff, #e2e2e2 )"
                     ui-bind:style="{display:this.reservedBooks.length>0?'block':'none'}">

                    <div class="d-flex align-items-end flex-row cards d pt-5 pb-5 book-card-container"
                         style="overflow-x: auto; perspective: 1000px; perspective-origin: 120%; padding-left: 9rem; padding-right: 9rem">
                    </div>

                    <span class="card d-inline-block m-2 book-card flex-grow-0 flex-shrink-0"
                          ui-for="this.reservedBooks"
                          ui-for-item-as="reserveRecord"
                          ui-for-replace-root-as=".cards">
                        <div class="card-header">
                                {{this.bookService.getBookByResid(this.reserveRecord.resid).title}}
                        </div>
                        <img class="card-img-top py-2"
                             ui-bind:src="this.bookService.getBookByResid(this.reserveRecord.resid).imageLink"
                             style="max-height: 10rem; object-fit: contain; width: 100%;"/>
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <a class="btn btn-outline-primary" ui-on:click="this.showItemDetails">Details</a>
                            </div>
                        </div>
                        <div class="card-footer">
                            {{this.reserveRecord.reserveAmount}} reserved resource is avaliable to take now
                        </div>
                    </span>
                </div>
                <div ui-if="this.user!=null" class="d-flex justify-content-center">
                    <div class="card flex-shrink-0 flex-grow-0" style="max-width: 1280px; width: 100%">
                        <div class="card-header">
                            Reserve qouta
                        </div>
                        <div class="card-body">
                            Used qouta: {{this.bookService.getReserveQuotaUsed}} / {{ROLES[this.user.type].maxReserve}}
                            <div class="progress">
                                <div class="progress-bar" role="progressbar"
                                     ui-bind:style="{width: this.reservedPercentage}"
                                     aria-valuenow="50"
                                     aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
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
            return this.user == null ? [] : this.user.reserved;
        },
        reservedPercentage() {
            return (this.user == null ? 0 : this.bookService.getReserveQuotaUsed / ROLES[this.user.type].maxReserve) * 100 + "%";
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