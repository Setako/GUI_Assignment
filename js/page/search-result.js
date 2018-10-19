componentManager.register(new Component("search-result", {
    styleSheets: ["./css/pages/search-result.css"],
    // language=HTML
    template: `
        <div class="m-4 bg-light">

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

                    <div class="mt-1">
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

                    <div class="mt-1">
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

                    <div class="mt-1">
                        <div class="filter-col"
                             style="cursor: pointer"
                             data-toggle="collapse"
                             data-target="#search-year"
                             aria-expanded="true"
                             aria-controls="#search-year">
                            <span class="font-italic h5">Publication date</span>
                        </div>

                        <div class="collapse show" id="search-year">
                            <div class="card card-body bg-light border-0 custom-control custom-checkbox ml-3">
                                <div ui-for="this.searchData.searchItemTypeList"
                                     ui-for-item-as="itemType">


                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="col-lg-9 col-sm-12 bg-light p-3">

                    <div class="list-group-flush">

                        <div class="list-group-item bg-white"
                             ui-for="this.bookList"
                             ui-for-item-as="book">
                            <div class="row">
                                <div class="col-xs-3 col-md-3 text-center">
                                    <img style="width: 8rem" ui-bind:src="{{this.book.imageLink}}"
                                         class="img-rounded img-responsive"/>
                                </div>
                                <div class="col-xs-9 col-md-9 section-box">
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
                                        {{this.book.description.split('.').slice(0, 2).join(' ') + '...'}}
                                    </p>
                                </div>
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
                searchConditionList: []
            },
            router: ServiceManager.getService('router'),
            base64: '',
            bookList: DataStorage.data.books
        }
    },
    computed: {},
    methods: {
        addCondition(field = this.fieldList[0], content = '') {
            this.searchData.searchConditionList.push({
                field: field,
                content: content
            });
        },
        search() {

        },
        updateSearch() {
            let base64 = this.router.urlData.url._deepTarget.searchParams.get('data');
            if (!base64) return;
            if (this.base64 === base64) return;

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

            if (this.searchContent === '') return;

            if (this.searchData.type === 'advanced') {
                this.searchContent = 'advanced: ' + this.searchContent;
            }
        }
    },
    onInit: function () {
        this.updateSearch();
    }
}));