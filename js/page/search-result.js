componentManager.register(new Component("search-result", {
    styleSheets: ["./css/pages/search-result.css"],
    // language=HTML
    template: `
        <div class="pl-4 pr-4 bg-light" style="min-height: 89vh;">

            <div class="material-icons"
                 id="back-to-top"
                 style="display: none ;position: fixed; bottom: 2rem; right: 2rem; font-size: 3rem; line-height: 3rem;
                  border-radius: 50%; background-color: #ffa41e;color:white;cursor: pointer;user-select: none;
                  box-shadow: #4e555b 0px 0px 2px; z-index: 10;
                  -moz-user-select: none;  -webkit-user-select: none; user-select: none"
                 ui-on:click="this.addNewPortlet">
                arrow_upward
            </div>

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
                             data-toggle="collapse"
                             data-target="#search-condition"
                             aria-expanded="true"
                             aria-controls="#search-condition">
                            <span class="font-italic h5">
                                <span>Search condition</span>
                                <!--<span class="material-icons align-text-bottom">-->
                                <!--{{this.expandedList.searchCondition ? "arrow_drop_down" : "arrow_drop_up"}}-->
                                <!--</span>-->
                            </span>
                        </div>

                        <div class="collapse show" id="search-condition">
                            <div class="card card-body bg-light border-0">
                                <span class="search-condition-list-item"
                                      ui-if="this.searchData.searchConditionList.length === 0">
                                    <span class="font-italic text-muted">No condition</span>
                                </span>
                                <span class="search-condition-list-item"
                                      ui-on:click="this.changeCondition"
                                      ui-for="this.searchData.searchConditionList"
                                      ui-for-item-as="condition"
                                      ui-for-first-as="isFirst">
                                    <span class="text-muted"
                                          ui-if="!this.isFirst">
                                        {{this.condition.relation.length < 3 ? this.condition.relation + "&nbsp;&nbsp;" : this.condition.relation}}
                                    </span>
                                    <span class="text-muted"
                                          ui-if="this.isFirst">
                                        &ensp;&ensp;&ensp;&ensp;
                                    </span>
                                    <span class="ml-3">{{this.condition.field}} field</span>
                                    <span class="text-secondary">contains</span>
                                    <span class="text-primary">{{this.condition.content}}</span>
                                    <br>
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
                                        <span class="font-italic">{{this.formattedFromMonth}}</span>
                                        <span>To</span>
                                        <span class="font-italic">{{this.formattedToMonth}}</span>
                                    </div>
                                    <div class="" id="search-month-slider"></div>
                                    <div class="mb-3 font-italic pt-3">
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
                                
                                <span class="float-right">
                                    <span>Items per page: </span>
                                    <input class="form-control-sm" type="number" min="1" max="100"
                                           ui-model="this.displaySize">
                                </span>
                            </span>
                            <span class="text-danger" ui-if="this.filteredList.length === 0">
                                <span>No results were found.</span>
                                <span>Try clearing your filters to improve your results.</span>
                            </span>
                        </div>

                        <div class="list-group-item mb-0"
                             style="min-height: 13rem"
                             ui-for="this.filteredListSliceByPage"
                             ui-for-item-as="book">
                            <div class="row">
                                <div class="col-xs-3 col-md-2 text-center">
                                    <img style="width: 100%"
                                         ui-bind:src="{{this.book.imageLink ? this.book.imageLink : './res/img/no-image-available.gif'}}"
                                         class="img-rounded img-responsive"/>
                                </div>
                                <div class="col-xs-9 col-md-10 section-box">
                                    <span class="h5"><a ui-on:click="this.showItemDetails"
                                                        href="">{{this.book.title}}</a></span>
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
                fromMonth: 1,
                toMonth: 12,
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
            displayPublicationFromMonth: 1,
            displayPublicationToMonth: 12,
            isInit: false,
            bookList: DataStorage.data.books,
            magazineList: DataStorage.data.magazines,
            softwareList: DataStorage.data.software,
            paginationList: [],
            expandedList: {
                searchFor: true,
                searchCondition: true,
                publicationDate: true,
                available: true
            }
        }
    },
    computed: {
        filteredList() {
            const _ = {
                getOrElse(target, orElse) {
                    return target || orElse;
                },
                lowercase(string = '') {
                    return typeof string === 'string'
                        ? string.toLowerCase()
                        : string;
                },
                trim(string) {
                    return typeof string === 'string'
                        ? string.trim()
                        : string;
                },
                isSame(x, y) {
                    return x === y;
                },
                isNumber(number) {
                    return !isNaN(parseFloat(number)) && isFinite(number);
                },
                lowercaseArrayValue(arr) {
                    return arr.map(_.lowercase).map(_.trim)
                },
                lowercaseObjectValue(obj = {}) {
                    return Object.keys(obj).reduce((result, key) => {
                        result[key] = Array.isArray(obj[key])
                            ? _.lowercaseArrayValue(obj[key])
                            : _.lowercase(obj[key]);
                        return result;
                    }, {});
                }
            };

            const itemList = {
                'book': this.bookList,
                'magazine': this.magazineList,
                'software': this.softwareList
            };

            let filtered = this.searchData.searchItemTypeList
                .filter((itemTyp) => itemTyp.checked)
                .map((itemType) => _.lowercase(itemType.type))
                .flatMap((type) => _.getOrElse(itemList[type], []));

            filtered = filtered.filter((item) => {
                return item.publicationDate >= this.searchData.from &&
                    item.publicationDate <= this.searchData.to;
            });

            const checkAvailable = {
                available: (item) => item.copy > item.borrowed,
                unavailable: (item) => item.copy <= item.borrowed
            };

            const lowercaseAvailable = this.searchData.available
                .filter((available) => available.checked)
                .map((available) => _.lowercase(available.field));

            filtered = filtered.filter((item) => {
                return lowercaseAvailable.some(available => checkAvailable[available](item))
            });

            if (this.searchData.searchConditionList.length !== 0) {
                const lowercaseCondition = this.searchData.searchConditionList
                    .map(_.lowercaseObjectValue);

                filtered = filtered.filter((item) => {
                    const lowercaseItem = _.lowercaseObjectValue(item);
                    return lowercaseCondition.flatMap((condition) => {
                        return condition.field === 'any'
                            ? Object.keys(lowercaseItem)
                                .some((key) => _.isNumber(lowercaseItem[key]) ? false
                                    : lowercaseItem[key].includes(condition.content))
                            : _.getOrElse(lowercaseItem[condition.field], [])
                                .includes(condition.content);
                    }).some(Boolean);
                });
            }

            filtered.sort((x, y) => {
                const xTitle = x.title.toLowerCase();
                const yTitle = y.title.toLowerCase();

                return x.publicationDate > y.publicationDate
                    ? -2 : x.publicationDate < y.publicationDate
                        ? 2 : xTitle < yTitle
                            ? -1 : xTitle > yTitle
                                ? 1 : 0;
            });

            return filtered;
        },
        filteredListSliceByPage() {
            return this.filteredList
                .slice((this.displayPage - 1) * this.displaySize, this.displayPage * this.displaySize);
        },
        totalPage() {
            let total = this.filteredList.length / this.displaySize || 1;
            return ~~total === total ? total : ~~total + 1;
        },
        encodedSearchData() {
            if (!this.isInit) return;
            const _ = {
                encode(item) {
                    return btoa(JSON.stringify(item));
                },
                isSame(x, y) {
                    return x === y;
                },
                update(page, size, base64) {
                    history.pushState(null, null, `?page=search-result&displayPage=${page}&displaySize=${size}&data=${base64}`);
                }
            };

            const base64 = _.encode(this.searchData);
            if (!_.isSame(this.originSearchDataBase64, base64)) {
                this.originSearchDataBase64 = base64;
                this.changePage(1);
                return;
            }

            _.update(this.displayPage, this.displaySize, base64);
            if (this.totalPage < this.displayPage) {
                this.changePage(1);
            }
            return base64;
        },
        formattedFromMonth() {
            return this.formatMonth(this.displayPublicationFromMonth);
        },
        formattedToMonth() {
            return this.formatMonth(this.displayPublicationToMonth);
        },
    },
    methods: {
        formatMonth(month) {
            const map = new Map([
                [1, 'Jan'],
                [2, 'Feb'],
                [3, 'Mar'],
                [4, 'Apr'],
                [5, 'May'],
                [6, 'Jun'],
                [7, 'July'],
                [8, 'Aug'],
                [9, 'Sep'],
                [10, 'Oct'],
                [11, 'Nov'],
                [12, 'Dec']
            ]);

            return map.get(month);
        },
        changeCondition() {
            ServiceManager
                .getService('condition-service')
                .show(this.searchData, this.condition);
        },
        showItemDetails(e) {
            e.preventDefault();
            ServiceManager
                .getService('book-service')
                .showBook(this.book)
        },
        changeYearSlider(toYear = 100) {
            const now = new Date().getFullYear();
            this.$('#search-year-slider')
                .slider('values', 1, now)
                .slider('values', 0, now - toYear);
            this.$('#search-month-slider')
                .slider('values', 1, 12)
                .slider('values', 0, 1);
        },
        generatePaginationList(displayPage) {
            const _ = {
                hasTrue(list = []) {
                    return list.some((item) => item === true);
                },
                range(size = 0, start = 0) {
                    return [...new Array(size).keys()].map(key => key + start);
                },
                inRange(start, end, item) {
                    return item >= start && item <= end;
                }
            };

            const skip = [this.totalPage === 0, !this.isInit];
            if (_.hasTrue(skip)) return [];
            let currentPage = this.displayPage;
            let totalPage = this.totalPage;

            let pagination = _.range(totalPage + 1)
                .filter((page) => _.inRange(1, totalPage, page))
                .filter((page) => {
                    if (currentPage <= 3) {
                        return _.inRange(1, 7, page)
                    } else if (totalPage - currentPage <= 3) {
                        return _.inRange(totalPage - 6, totalPage, page)
                    }

                    return _.inRange(currentPage - 3, currentPage + 3, page)
                })
                .map((item) => ({
                    name: `${item}`,
                    active: item === currentPage,
                    disabled: false,
                    to: () => {
                        this.backToTop();
                        this.changePage(item);
                    }
                }));

            pagination.unshift({
                name: 'Previous',
                active: false,
                disabled: currentPage <= 1,
                to: () => {
                    this.backToTop();
                    this.changePage(currentPage - 1)
                }
            });

            pagination.push({
                name: 'Next',
                active: false,
                disabled: currentPage === totalPage,
                to: () => {
                    this.backToTop();
                    this.changePage(currentPage + 1);
                }
            });

            return pagination;
        },
        changePage(pageNum) {
            const displayPage = pageNum > this.totalPage ? 1 : pageNum < 1 ? 1 : pageNum;
            this.displayPage = displayPage;
        },
        calDescription(description) {
            const _ = {
                trim(list, split = ' ') {
                    return list.split(split).filter((key) => key.length).join(split);
                }
            };

            const trimDescription = _.trim(description);

            const result = trimDescription
                .split('.').slice(0, 2).join('.');

            return trimDescription !== result && result.length !== 0
                ? result + '...'
                : result;
        },
        addCondition(field = this.fieldList[0], content = '') {
            this.searchData.searchConditionList.push({
                field: field,
                content: content
            });
        },
        toggleBackToTop(topSize = 50, ms = 200) {
            document.documentElement.scrollTop > topSize
                ? this.$('#back-to-top').fadeIn(ms)
                : this.$('#back-to-top').fadeOut(ms);
        },
        backToTop(top = 0, ms = 500, callback) {
            $('html').animate({
                scrollTop: top
            }, ms, callback);
        },
        updateSearch() {
            const _ = {
                getOrElse(target, orElse) {
                    return target || orElse;
                },
                getDeepTarget(proxy) {
                    return proxy._deepTarget;
                },
                decode(base64) {
                    return JSON.parse(atob(base64));
                },
                isEmptyString(item) {
                    return item.trim().length === 0;
                },
                isNothing(item) {
                    return item === null || item === undefined;
                }
            };

            const params = _.getOrElse(_.getDeepTarget(this.router.urlData.url).searchParams, new Map());

            const base64 = params.get('data');
            if (!base64) return;

            let data = _.decode(base64);
            data.searchConditionList = _.getOrElse(data.searchConditionList, [])
                .filter((condition) => !_.isEmptyString(condition.content));

            const searchData = _.getDeepTarget(this.searchData);
            this.searchData = Object.keys(searchData).reduce((result, key) => {
                result[key] = _.getOrElse(data[key], searchData[key]);
                return result;
            }, {});

            this.displayPublicationFrom = _.getOrElse(data.from, this.displayPublicationFrom);
            this.displayPublicationTo = _.getOrElse(data.to, this.displayPublicationTo);
            this.displayPublicationFromMonth = _.getOrElse(data.fromMonth, this.displayPublicationFromMonth);
            this.displayPublicationToMonth = _.getOrElse(data.toMonth, this.displayPublicationToMonth);

            this.isInit = true;
            const currentPage = this.displayPage;
            let pageNum = ~~_.getOrElse(params.get('displayPage'), currentPage);
            this.displaySize = _.getOrElse(params.get('displaySize'), this.displaySize);
            if (pageNum !== currentPage) {
                this.changePage(pageNum);
            }
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
        this.$("#search-month-slider").slider({
            range: true,
            min: 1,
            max: 12,
            values: [self.searchData.fromMonth, self.searchData.toMonth],
            change(event, ui) {
                self.displayPublicationFromMonth = ui.values[0];
                self.displayPublicationToMonth = ui.values[1];
                self.searchData.fromMonth = ui.values[0];
                self.searchData.toMonth = ui.values[1];
            },
            slide(event, ui) {
                self.displayPublicationFromMonth = ui.values[0];
                self.displayPublicationToMonth = ui.values[1];
            },
            stop(event, ui) {
                self.searchData.fromMonth = ui.values[0];
                self.searchData.toMonth = ui.values[1];
            }
        });

        $(window).scroll(() => self.toggleBackToTop());
        this.$('#back-to-top').click(() => self.backToTop()).click();
    }
}));