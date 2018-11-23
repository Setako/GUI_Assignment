componentManager.register(new Component('preview-book-btn', {
    // language=HTML
    template: `
        <span>
        <a href="" class="d-flex align-items-center justify-content-center"
           style="text-decoration: none; outline: none; "
           ui-if="this.show"
           ui-on:click="this.preview">
            <i class="material-icons" style="color:#6610f2;">
                chrome_reader_mode </i>
            <span style="color: #6610f2">Preview</span>
        </a>
        <span class="d-flex align-items-center justify-content-center"
           style="text-decoration: none; outline: none; "
           ui-if="!this.show">
            <i class="material-icons" style="color:#6c757d;">
                chrome_reader_mode </i>
            <span style="color: #6c757d">No Preview</span>
        </a>
        </span>
    `,
    props: ['resid'],
    data() {
        return {
            bookService: ServiceManager.getService("book-service")
        }
    },
    computed: {
        show() {
            return this.resid != null && this.bookService.getBookByResid(this.resid).preview != null
        }
    },
    methods: {
        preview(event) {
            event.preventDefault();
            this.bookService.previewBook(this.bookService.getBookByResid(this.resid));
        }
    }
}))
