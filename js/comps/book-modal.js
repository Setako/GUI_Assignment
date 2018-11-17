componentManager.register(new Component("book-modal", {
    template: `
        <div >
            <div class="modal fade " tabindex="-1" role="dialog" ui-on:hidden.bs.modal="this.destory"
                 ui-on:shown.bs.modal="this.shown">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style="overflow:hidden;" ui-if="this.book !=null">
                        <div class="modal-header">
                            <!--<h5 class="modal-title">Resource info: {{this.book.title}}</h5>-->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-3 col-md-2 text-center">
                                    <img style="width: 8rem"
                                         ui-bind:src="{{this.book.imageLink ? this.book.imageLink : './res/img/no-image-available.gif'}}"
                                         class="img-rounded img-responsive"/>
                                </div>
                                <div class="col-xs-9 col-md-10 section-box">
                                    <span class="h5"><a href="">{{this.book.title}}</a></span>
                                    <div>
                                        <span>by</span>
                                        <span ui-for="this.book.author"
                                              ui-for-item-as="author"
                                              ui-for-last-as="isLast">
                                            <a href="" class="font-italic font-weight-light">
                                                {{this.author}}</a>
                                            <span>{{this.isLast ? '' : '; '}}</span>
                                        </span>
                                    </div>
                                    <hr>
                                    <p class="text-justify text-muted">
                                        {{this.book.description}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return{
            book: null
        }
    },
    onInit: function () {
        console.log("ok")
        this.$('.modal').modal('show')
        this.$('.modal-dialog').draggable();
    }
}));