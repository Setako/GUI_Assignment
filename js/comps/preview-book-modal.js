componentManager.register(new Component("preview-book-modal", {
    // language=HTML
    styleSheets: ["./css/comps/preview-book-modal.css"],
    template: `
        <div>
            <div class="modal fade " tabindex="-1" role="dialog"
                 ui-on:hidden.bs.modal="this.destroy">
                <div class="modal-dialog modal-dialog-centered" style="width: 100% !important; max-width: 75vw;">
                    <div class="modal-content" style="overflow:hidden;">
                        <div class="modal-header">
                            <h5 class="modal-title">Preview Book</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" ui-if="this.book !=null">

                            <div id="carouselExampleIndicators" class="carousel slide"
                                 data-ride="carousel"
                                 ui-init="this.asCarousel">
                                 
                                 
                                 <ol class="carousel-indicators">
                                    <!--<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>-->
                                    <!--<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>-->
                                    <!--<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>-->
                                 </ol>
                                <li 
                                     data-target="#carouselExampleIndicators" ui-bind:data-slide-to="this.i"
                                     ui-for="this.book.preview"
                                     ui-for-index-as="i"
                                     ui-for-item-as="item"
                                     ui-for-replace-root-as=".carousel-indicators"
                                     ui-for-first-as="isFirst"
                                     ui-bind:class="{active:this.isFirst}">
                                </li>
                                 
                                 
                                <div class="carousel-inner"/>
                                <div class="carousel-item"
                                     ui-for="this.book.preview"
                                     ui-for-item-as="imgLink"
                                     ui-for-replace-root-as=".carousel-inner"
                                     ui-for-first-as="isFirst"
                                     ui-bind:class="{active:this.isFirst}">
                                    <img class="d-block w-100"
                                         ui-bind:src="this.imgLink"
                                         ui-bind:style="{height: this.scale.value=='auto'?'auto':this.scale.value+'vh', cursor: this.scale.value=='auto'?'zoom-out':'zoom-in'}"
                                         ui-on:click="this.toggleScale()"
                                         style="object-fit: contain;">
                                </div>


                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                                   data-slide="prev">

                                    <i class="material-icons" style="color:#6610f2;">
                                        chevron_left</i>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button"
                                   data-slide="next">
                                    <i class="material-icons" style="color:#6610f2;">
                                        chevron_right</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            scale: {value: 75},
            book: null
        }
    },
    methods: {
        asCarousel(el) {
            $(el).carousel({
                interval: false,
                wrap: false
            })
        },
        toggleScale() {
            if (this.scale.value < 125) {
                this.scale.value = this.scale.value + 25;
            } else if (this.scale.value == 'auto') {
                this.scale.value = 75;
            } else {
                this.scale.value = 'auto';
            }
        },
        destroy() {
            this.$destroy()
        }
    },
    onInit: function () {
        this.$('.modal').modal('show');
    }
}));
