function getEmptySearchData() {
    return {
        searchItemTypeList: [{
            type: "Book",
            checked: true
        }, {
            type: "Magazine",
            checked: true
        }, {
            type: "Software",
            checked: true
        }],
        searchConditionList: [],
        from: '01/01/1918',
        to: $.datepicker.formatDate('dd/mm/yy', new Date()),
        available: [{
            field: 'Available',
            checked: true
        }, {
            field: 'Unavailable',
            checked: true
        }],
        subject: [],
        language: [],
    };
}

ServiceManager.register(new Service("book-service", {
    data() {
        return {
            userService: ServiceManager.getService("user-service"),
            router: ServiceManager.getService("router")
        };
    },
    computed: {
        getReserveQuotaUsed() {
            return this.user == null ? 0 : this.user.reserved.map(bookReserve => bookReserve.reserveAmount + bookReserve.reserveLendedAmount).reduce((sum, next) => sum + next, 0);
        },
        getReserveQuotaRemain() {
            return this.user == null ? 0 : ROLES[this.user.type].maxReserve - this.user.reserved
                .map(bookReserve => bookReserve.reserveAmount).reduce((sum, next) => sum + next, 0);
        },
        user() {
            return this.userService.loggedInUser;
        },
        canTakeResourceAmount() {
            return this.user == null ? 0 : this.user.reserved.filter(bookReserve => bookReserve.reserveAmount > 0).reduce((sum, next) => sum + 1, 0);
        }
    },
    methods: {
        showBook(book) {
            let bookModalComp = componentManager.getComponent("book-modal").buildNewComponent();
            bookModalComp.vars.book = book;
            $(bookModalComp.element).appendTo($("#book-modal-area"));
        },
        previewBook(book) {
            let previewBookModalComp = componentManager.getComponent("preview-book-modal").buildNewComponent();
            previewBookModalComp.vars.book = book;
            $(previewBookModalComp.element).appendTo($("#book-modal-area"));
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
        showCancelReserveBookByResid(resid) {
            let book = this.getBookByResid(resid);
            let cancelReserveBookModalComp = componentManager.getComponent("cancel-reserve-book-modal").buildNewComponent();
            cancelReserveBookModalComp.vars.book = book;
            $(cancelReserveBookModalComp.element).appendTo($("#book-modal-area"));
        },
        getBookByResid(resid) {
            return DataStorage.data.books.concat(DataStorage.data.magazines).concat(DataStorage.data.software)
                .filter(res => res.resid == resid)[0];
        },
        isReserved(resid) {
            return this.user == null ? false : this.user.reserved.filter(reserveRecord => reserveRecord.resid == resid).length > 0;
        },
        searchByAuthor(author) {
            let data = getEmptySearchData();
            data.searchConditionList.push({
                field: "Author",
                relation: "AND",
                content: author
            })
            this.searchWithSearchData(data)
        },
        searchByPublisher(publisher) {
            let data = getEmptySearchData();
            data.searchConditionList.push({
                field: "Publisher",
                relation: "AND",
                content: publisher
            })
            this.searchWithSearchData(data)
        },
        searchBySubject(subject) {
            let data = getEmptySearchData();
            data.subject.push(subject);
            this.searchWithSearchData(data)
        },
        searchWithSearchData(searchData) {
            const data = JSON.stringify(searchData);
            const base64 = btoa(data);
            this.router.navigate('?page=search-result&data=' + base64)
            this.router.refresh()
        },
        reserve(reserveRecord) {
            this.user.reserved.push(reserveRecord);
            DataStorage.saveData();
        }
        ,
        cancelReserve(resid) {
            for (let i = 0; i < this.user.reserved.length; i++) {
                if (this.user.reserved[i].resid == resid) {
                    this.user.reserved._deepTarget = this.user.reserved._deepTarget.splice(i, 1);
                    this.user.reserved = this.user.reserved._deepTarget;
                    return;
                }
            }
            DataStorage.saveData();
        }
    },
}))