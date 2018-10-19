componentManager.register(new Component("search-result", {
    styleSheets: ["./css/pages/search-result.css"],
    // language=HTML
    template: `
        <div class="pl-4 pr-4 bg-light" style="min-height: 89vh;">

            <div class="row">
                <div class="col-lg-3 col-sm-12 bg-light p-3">
                    <div class="mb-3">
                        <route-link href="?page=search" class="text-primary">
                        <span>
                            <span class="material-icons align-text-top ">arrow_back</span>
                           <span>Advanced Search</span>
                        </span>
                        </route-link>
                    </div>

                    <div class="mt-2">
                        <div class="filter-col"
                             style="cursor: pointer"
                             data-toggle="collapse"
                             data-target="#search-for"
                             aria-expanded="true"
                             aria-controls="#search-for">
                            <span class="font-italic h5">Search for</span>
                        </div>

                        <div class="collapse show" id="search-for">
                            <div class="card card-body bg-light border-0 custom-control custom-checkbox ml-3">
                                <div ui-for="this.searchData.searchItemTypeList"
                                     ui-for-item-as="itemType">

                                    <input type="checkbox" class="custom-control-input" checked
                                           ui-bind:id="{{this.itemType.type}}"
                                           ui-model="this.itemType.checked">

                                    <label class="custom-control-label"
                                           ui-bind:for="{{this.itemType.type}}">
                                        {{this.itemType.type}}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div class="filter-col"
                             style="cursor: pointer"
                             ui-on:click=""
                             data-toggle="collapse"
                             data-target="#search-condition"
                             aria-expanded="true"
                             aria-controls="#search-condition">
                            <span class="font-italic h5">Search condition</span>
                        </div>

                        <div class="collapse show" id="search-condition">
                            <div class="card card-body bg-light border-0">
                                <span class="search-condition-list-item"
                                      ui-for="this.searchData.searchConditionList"
                                      ui-for-item-as="condition">
                                    <span class="">{{this.condition.field}} field</span>
                                    <span class="text-secondary">contains</span>
                                    <span class="text-primary">{{this.condition.content}}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div class="filter-col"
                             style="cursor: pointer"
                             data-toggle="collapse"
                             data-target="#search-year"
                             aria-expanded="true"
                             aria-controls="#search-year">
                            <span class="font-italic h5">Publication date</span>
                        </div>

                        <div class="collapse show" id="search-year">
                            <div class="card card-body bg-light border-0">
                                <div>
                                    <div class="mb-3 font-italic">
                                        <span>From</span>
                                        <span class="font-italic">{{this.displayPublicationFrom}}</span>
                                        <span>To</span>
                                        <span class="font-italic">{{this.displayPublicationTo}}</span>
                                    </div>
                                    <div class="" id="search-year-slider"></div>
                                    <div class="mt-2 text-primary">
                                        <a style="cursor: pointer" ui-on:click="this.changeYearSlider(1)">Last 1
                                            year</a>
                                        <span>/</span>
                                        <a style="cursor: pointer" ui-on:click="this.changeYearSlider(3)">Last 3
                                            years</a>
                                        <span>/</span>
                                        <a style="cursor: pointer" ui-on:click="this.changeYearSlider(5)">Last 5
                                            years</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div class="filter-col"
                             style="cursor: pointer"
                             data-toggle="collapse"
                             data-target="#search-available"
                             aria-expanded="true"
                             aria-controls="#search-available">
                            <span class="font-italic h5">Available</span>
                        </div>

                        <div class="collapse show" id="search-available">
                            <div class="card card-body bg-light border-0 custom-control custom-checkbox ml-3">
                                <div ui-for="this.searchData.available"
                                     ui-for-item-as="available">

                                    <input type="checkbox" class="custom-control-input" checked
                                           ui-bind:id="{{this.available.field}}"
                                           ui-model="this.available.checked">

                                    <label class="custom-control-label"
                                           ui-bind:for="{{this.available.field}}">
                                        {{this.available.field}}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9 col-sm-12 bg-light p-3">
                    <div class="list-group-flush">

                        <div class="list-group-item mb-0 font-italic">
                            <span ui-if="this.filteredList.length !== 0">
                                <span>{{this.filteredList.length}}</span>
                                <span>results</span>
                                <span>sorted by publication date</span>
                            </span>
                            <span class="text-danger" ui-if="this.filteredList.length === 0">
                                <span>No results were found.</span>
                                <span>Try clearing your filters to improve your results.</span>
                            </span>
                        </div>

                        <div class="list-group-item mb-0"
                             ui-for="this.filteredListSliceByPage"
                             ui-for-item-as="book">
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
                                        {{this.calDescription(this.book.description)}}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="list-group-item">
                            <span class="pagination justify-content-center"
                                  ui-if="this.filteredList.length !== 0 && this.displayPage >= 1 && this.displayPage <= this.totalPage">
                                <span class="page-item justify-content-center d-inline-block"
                                      ui-for="this.generatePaginationList(this.displayPage)"
                                      ui-for-item-as="pagination"
                                      ui-bind:class="{'disabled': !this.pagination.active && this.pagination.disabled, 'active': this.pagination.active}">
                                    <button class="page-link"
                                            ui-bind:class="{'disabled': this.pagination.disabled, 'active': this.pagination.active}"
                                            ui-on:click="this.pagination.to">
                                        {{this.pagination.name}}
                                    </button>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `,
    data: function () {
        return {
            searchContent: '',
            searchData: {
                searchItemTypeList: [],
                searchConditionList: [],
                from: new Date().getFullYear() - 100,
                to: new Date().getFullYear(),
                available: [{
                    field: 'Available',
                    checked: true
                }, {
                    field: 'Unavailable',
                    checked: true
                }]
            },
            router: ServiceManager.getService('router'),
            originSearchDataBase64: null,
            displaySize: 10,
            displayPage: 1,
            displayPublicationFrom: new Date().getFullYear() - 100,
            displayPublicationTo: new Date().getFullYear(),
            isInit: false,
            bookList: DataStorage.data.books,
            magazineList: DataStorage.data.magazines,
            paginationList: []
        }
    },
    computed: {
        filteredList() {
            let mapList = {
                'book': this.bookList,
                'magazine': this.magazineList
            };

            let afterItemType = [];
            this.searchData.searchItemTypeList
                .filter((itemType) => itemType.checked)
                .forEach((itemType) => {
                    afterItemType = [...afterItemType, ...(mapList[itemType.type.toLowerCase()] || [])]
                });

            let afterCondition = [];

            if (this.searchData.searchConditionList.length === 0) {
                afterCondition = afterItemType;
            } else {
                afterItemType.forEach((item) => {
                    let title = item.title.toLowerCase();
                    let author = item.author.map((author) => author.toLowerCase());
                    let description = item.description.toLowerCase();
                    let publisher = item.publisher.toLowerCase();
                    let subject = item.subject.map((subject) => subject.toLowerCase().trim());

                    this.searchData.searchConditionList.forEach((condition) => {
                        let field = condition.field.toLowerCase().trim();
                        let content = condition.content.toLowerCase().trim();

                        if (field === 'any') {
                            if (title.includes(content)) {
                                afterCondition.push(item);
                            } else if (author.includes(content)) {
                                afterCondition.push(item);
                            } else if (description.includes(content)) {
                                afterCondition.push(item);
                            } else if (publisher.includes(content)) {
                                afterCondition.push(item);
                            } else if (subject.includes(item)) {
                                afterCondition.push(item)
                            }
                        } else if (field === 'title') {
                            if (title.includes(content)) {
                                afterCondition.push(item);
                            }
                        } else if (field === 'author') {
                            if (author.includes(content)) {
                                afterCondition.push(item);
                            }
                        } else if (field === 'publisher') {
                            if (publisher.includes(content)) {
                                afterCondition.push(item);
                            }
                        } else if (field === 'subject') {
                            if (subject.includes(content)) {
                                afterCondition.push(item)
                            }
                        }
                    })
                });
            }

            let afterPublication = [];
            afterCondition.forEach((item) => {
                if (item.publicationDate < this.searchData.from) return;
                if (item.publicationDate > this.searchData.to) return;
                afterPublication.push(item);
            });

            let afterAvailable = [];
            afterPublication.forEach((item) => {
                if (this.searchData.available[0].checked) {
                    if (item.copy > item.borrowed) {
                        afterAvailable.push(item);
                    }
                }

                if (this.searchData.available[1].checked) {
                    if (item.copy <= item.borrowed) {
                        afterAvailable.push(item);
                    }
                }
            });

            console.log(afterPublication.length)

            afterAvailable
                .sort((item) => item.publicationDate)
                .reverse();

            return afterAvailable;
        },
        filteredListSliceByPage() {
            return this.filteredList
                .slice((this.displayPage - 1) * this.displaySize, this.displayPage * this.displaySize);
        },
        totalPage() {
            let total = this.filteredList.length / this.displaySize || 1;
            return ~~total === total ? total : ~~total + 1;
        },
        searchDataUrlEncoded() {
            if (!this.isInit) return;

            let base64 = btoa(JSON.stringify(this.searchData));

            if (this.originSearchDataBase64 === null) {
                this.originSearchDataBase64 = base64;
                return;
            }

            if (this.originSearchDataBase64 !== base64) {
                this.originSearchDataBase64 = base64;
                this.displayPage = 1;
                return;
            }
            history.pushState(null, null, `?page=search-result&displayPage=${this.displayPage}&data=${base64}`);
            return base64;
        }
    },
    methods: {
        changeYearSlider(toYear) {
            const now = new Date().getFullYear();
            this.$('#search-year-slider')
                .slider('values', 1, now);
            this.$('#search-year-slider')
                .slider('values', 0, now - toYear);
        },
        generatePaginationList(displayPage) {

            let totalPage = this.totalPage;

            if (totalPage === 0) return [];
            if (!this.isInit) return [];

            let pagination = [];

            pagination.push({
                name: 'Previous',
                active: false,
                disabled: this.displayPage <= 1,
                to: () => this.changePage(this.displayPage - 1)
            });

            let temp = [...new Array(totalPage + 1).keys()]
                .slice(1);

            let index = temp.indexOf(this.displayPage);
            temp = temp.slice(index <= 0 ? 0 : -2);
            index = temp.indexOf(this.displayPage);
            temp = temp.slice(index + 3 <= totalPage ? index + 3 : 0);

            temp.forEach((item) => {
                pagination.push({
                    name: `${item}`,
                    active: item === this.displayPage,
                    disabled: false,
                    to: () => this.changePage(item)
                });
            });

            pagination.push({
                name: 'Next',
                active: false,
                disabled: this.displayPage === totalPage,
                to: () => this.changePage(this.displayPage + 1)
            });

            return pagination;
        },
        changePage(pageNum) {
            this.displayPage = pageNum;
        },
        calDescription(description) {
            description = description || '';
            description = description.trim();

            let result = description.split('.').slice(0, 2).join(' ');

            if (description !== result && result.length !== 0) {
                result += '...';
            }

            return result;
        },
        addCondition(field = this.fieldList[0], content = '') {
            this.searchData.searchConditionList.push({
                field: field,
                content: content
            });
        },
        updateSearch() {
            let pageNum = ~~this.router.urlData.url
                ._deepTarget.searchParams.get('displayPage') || this.displayPage;

            this.changePage(pageNum);

            let base64 = this.router.urlData.url._deepTarget.searchParams.get('data');
            if (!base64) return;

            let data = JSON.parse(atob(base64));

            data.searchConditionList = data.searchConditionList
                .filter((condition) => condition.content.trim());

            this.searchData.type = data.type || this.searchData.type;
            this.searchData.searchItemTypeList.push(...(data.searchItemTypeList || []));
            this.searchData.searchConditionList.push(...(data.searchConditionList || []));

            this.searchContent = this.searchData.searchConditionList
                .map((condition) => condition.content)
                .filter((content) => !!content)
                .join(' ');


            this.searchData.available = data.available || this.searchData.available;

            this.searchData.from = data.from || this.searchData.from;
            this.searchData.to = data.to || this.searchData.to;

            this.displayPublicationFrom = data.from || this.displayPublicationFrom;
            this.displayPublicationTo = data.to || this.displayPublicationTo;

            this.isInit = true;
        }
    },
    onInit() {
        let self = this;
        this.updateSearch();
        this.$("#search-year-slider").slider({
            range: true,
            min: new Date().getFullYear() - 100,
            max: (new Date()).getFullYear(),
            values: [self.searchData.from, self.searchData.to],
            change(event, ui) {
                self.displayPublicationFrom = ui.values[0];
                self.displayPublicationTo = ui.values[1];
                self.searchData.from = ui.values[0];
                self.searchData.to = ui.values[1];
            },
            slide(event, ui) {
                self.displayPublicationFrom = ui.values[0];
                self.displayPublicationTo = ui.values[1];
            },
            stop(event, ui) {
                self.searchData.from = ui.values[0];
                self.searchData.to = ui.values[1];
            }
        });
    }
}))
;