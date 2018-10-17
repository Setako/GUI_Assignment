componentManager.register(new Component("search", {
    // language=HTML
    template: `
        <div class="m-5">
            {{this.searchData.searchConditionList}}
            <div class="input-group mt-5">
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
                {{this.searchData.searchConditionList}}
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
                    * It is available to add more than
                    {{this.maxSearchNum - this.searchData.searchConditionList.length}}
                    condition
                </p>
                <p class="text-danger" ui-if="this.isMatchMaxSearchNum">
                    * Maximum number of condition occurred
                </p>
            </div>

            <div class="bg-light">
                <section class="float-left">
                    <div class="material-icons text-primary">subdirectory_arrow_right</div>
                    <span ui-for="this.searchData.searchConditionList"
                          ui-for-item-as="condition">
                        {{this.condition.field}} field contains {{this.condition.content}}
                    </span>
                </section>
                <section class="float-right">
                    <button class="btn btn-primary float-left">
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
                searchConditionList: [{
                    field:"",
                    content:""
                }]
            },
            maxSearchNum: 5,
            router: ServiceManager.getService('router')
        }
    },
    computed: {
        longestNameInFieldList() {
            return this.longestNameInList(this.fieldList);
        },
        isMatchMaxSearchNum() {
            return this.searchData.searchConditionList.length >= this.maxSearchNum;
        },
        isAllItemTypeChecked() {
            return this.searchData.searchItemTypeList
                .filter((itemType) => !itemType.checked)
                .length === 0;
        }
    },
    methods: {
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
            console.log(this.searchData.searchConditionList)
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
                        this.searchData.searchConditionList.splice(deletedIndex, 1);
                        this.$('input:last').focus();
                    });

            } else if (nextCondition === undefined) {
                if (this.isMatchMaxSearchNum) return;

                this.addCondition();
                this.$('.search-condition:last')
                    .hide()
                    .slideDown(250);
            }
        },
        search() {
            const data = JSON.stringify(this.searchData._deepTarget);
            const base64 = btoa(data);
            console.log(atob(base64));
            this.router.navigate('?page=search-result&data=' + base64)
        }
    },
    onInit: function () {
        this.addCondition();

    }
}));