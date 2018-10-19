componentManager.register(new Component("search", {
    // language=HTML
    template: `
        <div class="m-5">

            <div class="input-group mt-4">

                <p class="mr-5">Search for:</p>

                <div class="custom-control-inline custom-checkbox mr-5"
                     ui-for="this.searchData.searchItemTypeList"
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


            <div class="input-group mt-3 search-condition"
                 ui-for="this.searchData.searchConditionList"
                 ui-for-item-as="condition">
                <div class="input-group-prepend">
                    <button class="btn btn-info dropdown-toggle"
                            type="button"
                            ui-bind:style="{'width': this.longestNameInFieldList * 13 + 'px'}"
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
                                <span class="text-secondary mr-1 ml-0">{{this.isFirst?"":"AND"}}</span>
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
            fieldList: ["Any", "Author", "Title", "Publisher"],
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
                searchConditionList: []
            },
            maxSearchNum: 5,
            router: ServiceManager.getService('router'),
            notification: ServiceManager.getService('notification-service')
        }
    },
    computed: {
        searchItemTypeResult() {
            let result = this.searchData.searchItemTypeList
                .filter((itemType) => itemType.checked)
                .map((itemType) => itemType.type.toLowerCase())
                .join(', ');

            return result.length === 0 ? '' : 'Search ' + result + ' which'
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
        reset() {
            this.searchData.searchItemTypeList
                .forEach((itemType) => itemType.checked = true);

            this.searchData.searchConditionList
                .forEach((condition) => condition.content = '');

            this.$('.search-condition input:first')
                .focus();

            this.$('.search-condition:not(:first)')
                .show()
                .slideUp(500, () => {
                    this.searchData.searchConditionList
                        .splice(1);
                })
        },
        focusByResult() {
            const index = this.searchData.searchConditionList._deepTarget.indexOf(this.condition._deepTarget);
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
        addCondition(field = this.fieldList[0], content = '') {
            this.searchData.searchConditionList.push({
                field: field,
                content: content
            });
        },
        deleteEmptyCondition(e) {
            const _searchDataRaw = this.searchData._deepTarget;
            const index = _searchDataRaw.searchConditionList.indexOf(this.condition._deepTarget);
            const nextCondition = _searchDataRaw.searchConditionList[index + 1];

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

            const hasFilledCondition = this.searchData.searchConditionList
                .filter((condition) => condition.content.trim().length !== 0)
                .length > 0;

            if (!hasFilledCondition) {
                this.notification.addNotification({
                    type: 'danger',
                    content: ['You should fill at least one condition for searching']
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
        this.addCondition();

    }
}));