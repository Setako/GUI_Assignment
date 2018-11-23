componentManager.register(new Component("book-modal", {
    // language=HTML
    template: `
        <div>
            <div class="modal fade " tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content" style="overflow:hidden;" ui-if="this.book !=null">
                        <div class="modal-header">
                            <h5 class="modal-title">Resource info</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-3 text-center">
                                    <div class="pb-3">
                                        <img style="width: 100%"
                                             ui-bind:src="{{this.book.imageLink ? this.book.imageLink : './res/img/no-image-available.gif'}}"
                                             class="img-rounded img-responsive"/>
                                    </div>
                                    <div>
                                        <add-to-favorite ui-bind:resid="this.book.resid"/>
                                        <reserve-book-btn ui-bind:resid="this.book.resid"/>
                                        <preview-book-btn ui-bind:resid="this.book.resid"/>
                                    </div>
                                </div>
                                <div class="col-9 section-box">
                                    <div>
                                        <span class="h5">{{this.book.title}}</span>
                                    </div>
                                    <div>
                                        <span>by</span>
                                        <span ui-for="this.book.author"
                                              ui-for-item-as="author"
                                              ui-for-last-as="isLast">
                                            <a href="" class="font-italic font-weight-light"
                                               ui-on:click="this.searchByAuthor(this.author)">
                                                {{this.author}}</a>
                                            <span>{{this.isLast ? '' : '; '}}</span>
                                        </span>
                                    </div>
                                    <hr>
                                    <p class="text-justify">
                                        {{this.book.description}}
                                    </p>

                                    <hr>

                                    <div class="text-muted">
                                        <div>
                                            Publisher: <a href="#"
                                                          ui-on:click="this.searchByPublisher">{{this.book.publisher}}</a>
                                        </div>
                                        <div ui-if="this.book.isbn.length>0">
                                            ISBN:
                                            <span ui-for="this.book.isbn"
                                                  ui-for-item-as="isbn"
                                                  ui-for-first-as="isFirst">
                                            {{this.isFirst?"":","}}
                                            {{this.isbn}}
                                        </span>
                                        </div>
                                        <div>
                                            Subject:
                                            <span ui-for="this.book.subject"
                                                  ui-for-item-as="subject"
                                                  ui-for-first-as="isFirst">
                                                {{this.isFirst?"":","}}
                                                <a href="" ui-on:click="this.searchBySubject(this.subject)">{{this.subject}}</a>
                                            </span>
                                        </div>
                                        <div>
                                            Publication {{this.book.displayDate == null? "year":"date"}}: 
                      {{this.book.displayDate == null? this.book.publicationDate:this.book.displayDate}}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            bookService: ServiceManager.getService("book-service"),
            book: null
        }
    },
    methods: {
        searchByPublisher(e) {
            e.preventDefault();
            this.bookService.searchByPublisher(this.book.publisher);
            this.hide();
        },
        //Currying
        searchByAuthor(author) {
            return (e) => {
                e.preventDefault();
                this.bookService.searchByAuthor(author);
                this.hide();
            }
        },
        //Currying
        searchBySubject(subject) {
            return (e) => {
                e.preventDefault();
                this.bookService.searchBySubject(subject);
                this.hide();
            }
        },
        hide() {
            this.$('.modal').modal('hide');
        }
    },
    onInit: function () {
        this.$('.modal').modal('show');
    }
}));