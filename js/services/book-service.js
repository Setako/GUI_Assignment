ServiceManager.register(new Service("book-service", {
    data() {
        return {};
    },
    methods: {
        showBook(book) {
            let bookModalComp = componentManager.getComponent("book-modal").buildNewComponent();
            bookModalComp.vars.book = book;
            $(bookModalComp.element).appendTo($("#book-modal-area"));
        },
        showBookByResid(resid) {
            let res = this.getBookByResid(resid);
            if (res==null) throw "resid not found: " + resid;
            else this.showBook(res);
        },
        showReserveBook(book) {
            let reserveBookModalComp = componentManager.getComponent("reserve-book-modal").buildNewComponent();
            reserveBookModalComp.vars.book = book;
            $(reserveBookModalComp.element).appendTo($("#book-modal-area"));
        },
        showReserveBookByResid(resid) {
            let res = this.getBookByResid(resid);
            console.log(res)
            if (res==null) throw "resid not found: " + resid;
            else this.showReserveBook(res);
        },
        getBookByResid(resid) {
            return DataStorage.data.books.concat(DataStorage.data.magazines).concat(DataStorage.data.software)
                .filter(res => res.resid == resid)[0];
        }
    }
}))