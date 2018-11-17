ServiceManager.register(new Service("book-service", {
    data() {
        return {};
    },
    methods: {
        showBook(book) {
            let bookModalComp = componentManager.getComponent("book-modal").buildNewComponent();
            bookModalComp.vars.book = book;
            $(bookModalComp.element).appendTo($("#book-modal-area"));
            console.log($("#book-modal-area")[0])
        },
        showBookByResid(resid) {
            let res = DataStorage.data.books.concat(DataStorage.data.magazines).concat(DataStorage.data.software)
                .filter(res => res.resid === resid);
            if (res.length < 0) throw "resid not found: " + res;
            else this.showBook(res[0]);
        }
    }
}))