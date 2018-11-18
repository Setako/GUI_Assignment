componentManager.register(new Component("search", {
    // language=HTML
    template: `
        <div class="m-5 pl-5 pr-5">

            <div class="form-inline">
                <span class="input-group mt-4">
                    <p class="mr-5 font-weight-bold">Search for:</p>
                    <span class="custom-control-inline custom-checkbox mr-5"
                          ui-for="this.searchData.searchItemTypeList"
                          ui-for-item-as="itemType">

                        <input type="checkbox" class="custom-control-input" checked
                               ui-bind:id="{{this.itemType.type}}"
                               ui-model="this.itemType.checked">

                        <label class="custom-control-label"
                               ui-bind:for="{{this.itemType.type}}">
                            {{this.itemType.type}}
                        </label>
                    </span>
                </span>

                <span class="input-group mt-4">
                    <p class="mr-5 font-weight-bold">Available:</p>
                    <span class="custom-control-inline custom-checkbox mr-5"
                          ui-for="this.searchData.available"
                          ui-for-item-as="available">

                        <input type="checkbox" class="custom-control-input" checked
                               ui-bind:id="{{this.available.field}}"
                               ui-model="this.available.checked">

                        <label class="custom-control-label"
                               ui-bind:for="{{this.available.field}}">
                            {{this.available.field}}
                        </label>
                    </span>
                </span>

            </div>

            <div class="mt-3 form-inline align-text-top">
                <p class="mr-5 font-weight-bold">Publication Date:</p>
                <span class="input-group align-text-top" style="width: 40%">
                    <span class="mb-4 font-italic w-100">
                        <span>From</span>
                        <span class="font-italic">{{this.displayPublicationFrom}}</span>
                        <div class="d-inline-flex ml-3 mr-3" id="search-year-slider" style="width: 45%"></div>
                        <span>To</span>
                        <span class="font-italic">{{this.displayPublicationTo}}</span>
                    </span>
                </span>
                <span class="input-group" style="width: 40%">
                    <span class="mb-4 font-italic w-100">
                        <span>From</span>
                        <span class="font-italic" style="width: 30px;">{{this.formattedFromMonth}}</span>
                        <div class="d-inline-flex ml-3 mr-3" id="search-month-slider" style="width: 45%"></div>
                        <span>To</span>
                        <span class="font-italic">{{this.formattedToMonth}}</span>
                    </span>
                </span>
            </div>

            <div
                    ui-for="this.searchData.searchConditionList"
                    ui-for-item-as="condition"
                    ui-for-first-as="isFirst">
                <div class="input-group mt-3 search-condition" ui-if="this.isFirst">
                    <div class="input-group-prepend">
                        <button class="btn btn-info dropdown-toggle"
                                style="width: 80px;"
                                data-toggle="dropdown"
                                data-target=".t-relation"
                                aria-haspopup="true"
                                aria-expanded="false">
                            {{this.condition.relation}}
                        </button>
                        <div class="dropdown-menu t-relation">
                            <button class="dropdown-item"
                                    ui-for="this.relationList"
                                    ui-for-item-as="relation"
                                    ui-on:click="this.condition.relation = this.relation">
                                {{this.relation}}
                            </button>
                        </div>
                        <button class="btn btn-info dropdown-toggle"
                                type="button"
                                ui-bind:style="{'width': this.isFirst ? this.longestNameInFieldList * 23 + 'px' : this.longestNameInFieldList * 13 + 'px'}"
                                data-toggle="dropdown"
                                data-target=".t-field"
                                aria-haspopup="true"
                                aria-expanded="false">
                            {{this.condition.field}}
                        </button>
                        <div class="dropdown-menu t-field">
                            <button class="dropdown-item"
                                    ui-for="this.fieldList"
                                    ui-for-item-as="field"
                                    ui-on:click="this.condition.field = this.field">
                                {{this.field}}
                            </button>
                        </div>
                    </div>

                    <input type="text"
                           class="form-control"
                           ui-on:keyup="this.deleteEmptyCondition"
                           ui-on:keydown="this.deleteEmptyCondition"
                           ui-model="this.condition.content">
                </div>

                <div class="input-group mt-3 search-condition" ui-if="!this.isFirst">
                    <div class="input-group-prepend">
                        <button class="btn btn-info dropdown-toggle"
                                type="button"
                                ui-bind:style="{'width': this.isFirst ? this.longestNameInFieldList * 23 + 'px' : this.longestNameInFieldList * 13 + 'px'}"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                            {{this.condition.field}}
                        </button>
                        <div class="dropdown-menu">
                            <button class="dropdown-item"
                                    ui-for="this.fieldList"
                                    ui-for-item-as="field"
                                    ui-on:click="this.condition.field = this.field">
                                {{this.field}}
                            </button>
                        </div>
                    </div>

                    <input type="text"
                           class="form-control"
                           ui-on:keyup="this.deleteEmptyCondition"
                           ui-on:keydown="this.deleteEmptyCondition"
                           ui-model="this.condition.content">
                </div>
            </div>
            
            <div class="mt-4 font-italic font-weight-light">
                <p class="text-secondary" ui-if="!this.isMatchMaxSearchNum">
                    * It is available to add more
                    {{this.maxSearchNum - this.searchData.searchConditionList.length}}
                    condition
                </p>
                <p class="text-danger" ui-if="this.isMatchMaxSearchNum">
                    * Maximum number of condition occurred
                </p>
            </div>

            <div class="bg-light">
                <section class="float-left w-75">

                    <ul class="list-inline">
                        <li class="material-icons list-inline-item text-primary align-text-bottom"
                            ui-if="this.searchItemTypeResult.length !== 0">
                            subdirectory_arrow_right
                        </li>
                        <li class="list-inline-item">
                            <span>
                                <span class="text-secondary mr-1 ml-0">{{""}}</span>
                                <span>{{this.searchItemTypeResult}}</span>
                            </span>
                        </li>
                    </ul>

                    <ul class="list-inline">
                        <li class="material-icons list-inline-item text-primary align-text-bottom"
                            ui-if="this.searchConditionResult.length !== 0">
                            subdirectory_arrow_right
                        </li>
                        <li class="list-inline-item"
                            ui-for="this.searchConditionResult"
                            ui-for-item-as="condition"
                            ui-for-first-as="isFirst">
                            <span>
                                <span class="text-secondary mr-1 ml-0">{{this.isFirst?"":this.condition.relation}}</span>
                                <span class="border-bottom border-info "
                                      style="cursor: pointer;"
                                      ui-on:click="this.focusByResult">
                                    <span class="">{{this.condition.field}} field</span>
                                    <span class="text-secondary">contains</span>
                                    <span class="text-primary">{{this.condition.content}}</span>
                                </span>
                            </span>
                        </li>
                    </ul>
                </section>
                <section class="float-right">
                    <button class="btn btn-danger"
                            ui-on:click="this.reset">
                        <i class="material-icons align-text-top">replay</i>
                        <span>Clear</span>
                    </button>
                    <button class="btn btn-primary"
                            ui-on:click="this.search">
                        <i class="material-icons align-text-top">search</i>
                        Search
                    </button>
                </section>
            </div>

        </div>`,
    data: function () {
        return {
            fieldList: ["Any", "Title", "Author", "Publisher", "Subject", "ISBN"],
            relationList: ["AND", "OR", "NOT"],
            searchData: {
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
            displayPublicationFrom: new Date().getFullYear() - 100,
            displayPublicationTo: new Date().getFullYear(),
            displayPublicationFromMonth: 1,
            displayPublicationToMonth: 12,
            maxSearchNum: 5,
            router: ServiceManager.getService('router'),
            notification: ServiceManager.getService('notification-service')
        }
    },
    computed: {
        formattedFromMonth() {
            return this.formatMonth(this.displayPublicationFromMonth);
        },
        formattedToMonth() {
            return this.formatMonth(this.displayPublicationToMonth);
        },
        searchItemTypeResult() {
            let result = this.searchData.searchItemTypeList
                .filter((itemType) => itemType.checked)
                .map((itemType) => itemType.type.toLowerCase())
                .join(', ');

            return result.length === 0 ? '' : 'Search ' + result
        },
        searchConditionResult() {
            return this.searchData.searchConditionList
                .filter((condition) => !!condition.content.trim())
        },
        longestNameInFieldList() {
            return this.longestNameInList(this.fieldList);
        },
        isMatchMaxSearchNum() {
            return this.searchData.searchConditionList.length >= this.maxSearchNum;
        },
        searchConditionString() {
            return this.searchData.searchConditionList
                .filter((condition) => condition.content)
                .map((condition) => condition.field + ' contains ' + condition.content)
                .join(', and ')
        }
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
        reset() {
            this.searchData.searchItemTypeList
                .forEach((itemType) => itemType.checked = true);

            this.searchData.searchConditionList
                .forEach((condition) => condition.content = '');

            this.searchData.available
                .forEach((available) => available.checked = true);

            const now = new Date().getFullYear();
            this.$('#search-year-slider')
                .slider('values', 1, now)
                .slider('values', 0, now - 100);

            this.$('#search-month-slider')
                .slider('values', 1, 12)
                .slide('values', 2, 1);

            this.$('.search-condition input:first')
                .focus();

            this.$('.search-condition:not(:first)')
                .show()
                .slideUp(800, () => {
                    this.searchData.searchConditionList
                        .splice(1);
                })
        },
        focusByResult() {
            const condition = this.condition._deepTarget;
            const conditionList = this.searchData.searchConditionList._deepTarget;
            const index = conditionList.indexOf(condition);
            this.$('.search-condition input')
                .eq(index)
                .focus();
        },
        longestNameInList(list = []) {
            return list
                .map((field) => field.length)
                .sort()
                .pop() || 0
        },
        addCondition(field = this.fieldList[0], content = '', relation = this.relationList[0]) {
            this.searchData.searchConditionList.push({
                field: field,
                relation: relation,
                content: content
            });
        },
        deleteEmptyCondition(e) {
            const _searchDataRaw = this.searchData._deepTarget;
            const index = _searchDataRaw.searchConditionList.indexOf(this.condition._deepTarget);
            const nextCondition = _searchDataRaw.searchConditionList[index + 1];

            if (e.originalEvent.type === 'keydown' && e.keyCode === 13) {
                return this.search();
            }

            if (_searchDataRaw.searchConditionList[index].content === '') {
                if (e.originalEvent.type !== 'keydown' || e.keyCode !== 8) return;

                let deletedIndex = nextCondition === undefined || nextCondition.content === ''
                    ? index + 1
                    : index;

                this.$('.search-condition')
                    .eq(deletedIndex)
                    .show()
                    .slideUp(250, () => {
                        this.searchData.searchConditionList._deepTarget.splice(deletedIndex, 1);
                        this.searchData.searchConditionList = this.searchData.searchConditionList._deepTarget;

                        const hasEmptyCondition = this.searchData.searchConditionList
                            .filter((condition) => !condition.content.trim())
                            .length !== 0;

                        if (!hasEmptyCondition) {
                            this.addCondition();
                            this.$('.search-condition:last')
                                .hide()
                                .slideDown(250, () => {
                                    this.$('.search-condition input:last').focus();
                                });
                        } else {
                            this.$('.search-condition input:last').focus();
                        }
                    });

            } else if (nextCondition === undefined) {
                if (this.searchData.searchConditionList.length >= this.maxSearchNum) return;

                this.addCondition();
                this.$('.search-condition:last')
                    .hide()
                    .slideDown(250);
            }
        },
        search() {
            const hasSelectType = this.searchData.searchItemTypeList
                .filter((itemType) => itemType.checked)
                .length > 0;

            if (!hasSelectType) {
                this.notification.addNotification({
                    type: 'danger',
                    content: ['You should choose at least one type for searching!']
                });
                return;
            }

            let conditionList = this.searchData.searchConditionList._deepTarget;
            conditionList = conditionList.filter((condition) => condition.content.trim());
            this.searchData.searchConditionList = conditionList;

            const data = JSON.stringify(this.searchData._deepTarget);
            const base64 = btoa(data);
            this.router.navigate('?page=search-result&data=' + base64)
        }
    },
    onInit: function () {
        const self = this;
        this.addCondition();
        this.$("#search-year-slider").slider({
            range: true,
            min: new Date().getFullYear() - 100,
            max: new Date().getFullYear(),
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
    }
}));