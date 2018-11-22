ServiceManager.register(new Service("book-service", {
    data() {
        return {
            userService: ServiceManager.getService("user-service")
        };
    },
    computed: {
        user() {
            return this.userService.loggedInUser;
        }
    },
    methods: {
        showBook(book) {
            let bookModalComp = componentManager.getComponent("book-modal").buildNewComponent();
            bookModalComp.vars.book = book;
            $(bookModalComp.element).appendTo($("#book-modal-area"));
        },
        showBookByResid(resid) {
            let res = this.getBookByResid(resid);
            if (res == null) throw "resid not found: " + resid;
            else this.showBook(res);
        },
        showReserveBook(book) {
            let reserveBookModalComp = componentManager.getComponent("reserve-book-modal").buildNewComponent();
            reserveBookModalComp.vars.book = book;
            $(reserveBookModalComp.element).appendTo($("#book-modal-area"));
        },
        showReserveBookByResid(resid) {
            let res = this.getBookByResid(resid);
            if (res == null) throw "resid not found: " + resid;
            else this.showReserveBook(res);
        },
        getBookByResid(resid) {
            return DataStorage.data.books.concat(DataStorage.data.magazines).concat(DataStorage.data.software)
                .filter(res => res.resid == resid)[0];
        },
        isReserved(resid) {
            return this.user == null ? false : this.user.reserved.filter(reserveRecord => reserveRecord.resid == resid).length > 0;
        },
        getReserveQuotaUsed(){
            return this.user.reserved.map(bookReserve => bookReserve.reserveAmount).reduce((sum, next) => sum + next, 0);
        },
        getReserveQuotaRemain(){
            return ROLES[this.user.type].maxReserve - this.user.reserved
                .map(bookReserve => bookReserve.reserveAmount).reduce((sum, next) => sum + next, 0);
        },
        reserve(reserveRecord){
            this.user.reserved.push(reserveRecord);
            DataStorage.saveData();
        },
        cancelReserve(resid){
            for (let i = 0; i < this.user.reserved.length; i++) {
                if(this.user.reserved[i].resid == resid){
                    this.user.reserved._deepTarget = this.user.reserved._deepTarget.splice(i,1);
                    this.user.reserved = this.user.reserved._deepTarget;
                    return;
                }
            }
            DataStorage.saveData();
        }
    }
}))