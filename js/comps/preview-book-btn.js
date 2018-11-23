componentManager.register(new Component('preview-book-btn', {
    // language=HTML
    template: `
        <a href="" class="d-flex align-items-center justify-content-center"
           style="text-decoration: none; outline: none; "
           ui-on:click="this.preview">
            <i class="material-icons" style="color:#6610f2;">
                chrome_reader_mode </i>
            <span style="color: #6610f2">Preview</span>
        </a>
    `,
    props: ['resid'],
    data() {
        return {
            bookService: ServiceManager.getService("book-service")
        }
    },
    computed: {},
    methods: {
        preview(event) {
            event.preventDefault();
            this.bookService.previewBook(this.bookService.getBookByResid(this.resid));
        }
    }
}))
