componentManager.register(new Component("condition-modal", {
    // language=HTML
    template: `
        <div>
            <div class="modal fade " tabindex="-1" role="dialog"
                 ui-on:hidden.bs.modal="this.destroy"
                 ui-on:shown.bs.modal="this.shown">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" ui-if="this.searchConditionList !=null">
                        <div class="modal-header">
                            <h5 class="modal-title">Search condition</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="search-condition"
                                 ui-for="this.searchConditionList"
                                 ui-for-item-as="condition"
                                 ui-for-first-as="isFirst">

                                <div ui-if="!this.isFirst" class="d-flex align-content-center mt-3">
                                    <div class="pr-2 flex-grow-0">
                                        <button class="btn btn-primary dropdown-toggle"
                                                style="width: 80px;"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                            {{this.condition.relation}}
                                        </button>
                                        <div class="dropdown-menu">
                                            <button class="dropdown-item"
                                                    ui-for="this.relationList"
                                                    ui-for-item-as="relation"
                                                    ui-on:click="this.condition.relation = this.relation">
                                                {{this.relation}}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="input-group flex-grow-1">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-info dropdown-toggle"
                                                    type="button"
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

                                <div class="input-group mt-3" ui-if="this.isFirst">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-info dropdown-toggle"
                                                type="button"
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
                                    </select>
                                </div>

                            </div>

                            <div class="mt-4 font-italic font-weight-light">
                                <p class="text-secondary" ui-if="!this.isMatchMaxSearchNum">
                                    * It is available to add more
                                    {{this.maxSearchNum - this.searchConditionList.length}}
                                    condition
                                </p>
                                <p class="text-danger" ui-if="this.isMatchMaxSearchNum">
                                    * Maximum number of condition occurred
                                </p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" ui-on:click="this.search">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            fieldList: ["Any", "Title", "Author", "Publisher", "Subject", "ISBN"],
            relationList: ["AND", "OR", "NOT"],
            maxSearchNum: 5,
            searchConditionList: [],
            target: null,
            completeCallback: null
        }
    },
    computed: {
        updateWhenEmpty() {
            if (this.searchConditionList) {
                if (this.searchConditionList.length === 0) {
                    this.addCondition();
                    this.target = this.searchConditionList[0];
                }
            }
        },
        isMatchMaxSearchNum() {
            return this.searchConditionList.length >= this.maxSearchNum;
        }
    },
    methods: {
        addCondition(field = this.fieldList[0], content = '', relation = this.relationList[0]) {
            this.searchConditionList.push({
                field: field,
                relation: relation,
                content: content
            });
            this.searchConditionList = this.searchConditionList._deepTarget;
        },
        search() {
            let conditionList = this.searchConditionList._deepTarget;
            conditionList = conditionList.filter((condition) => condition.content.trim());
            this.completeCallback && this.completeCallback(conditionList);
            this.$('.modal').modal('hide');
        },
        destroy() {

        },
        shown() {
            if (!this.searchConditionList.length) return;


            const condition = this.target;
            const conditionList = this.searchConditionList._deepTarget;

            if (conditionList.length === 1) {
                this.$('.search-condition input')
                    .eq(0)
                    .focus();

                if (!conditionList[0].content.trim()) return;

                this.addCondition();
                this.$('.search-condition:last')
                    .hide()
                    .fadeIn(500);

                return;
            }

            const index = conditionList.indexOf(condition);
            this.$('.search-condition input')
                .eq(index - 1)
                .focus();

            const _searchConditionListRaw = this.searchConditionList._deepTarget;
            const nextCondition = _searchConditionListRaw[_searchConditionListRaw.length];
        },
        deleteEmptyCondition(e) {
            const _searchConditionListRaw = this.searchConditionList._deepTarget;
            const index = _searchConditionListRaw.indexOf(this.condition._deepTarget);
            const nextCondition = _searchConditionListRaw[index + 1];

            if (e.originalEvent.type === 'keydown' && e.keyCode === 13) {
                return this.destroy();
            }

            if (_searchConditionListRaw[index].content === '') {
                if (e.originalEvent.type !== 'keydown' || e.keyCode !== 8) return;

                let deletedIndex = nextCondition === undefined || nextCondition.content === ''
                    ? index + 1
                    : index;

                this.$('.search-condition')
                    .eq(deletedIndex)
                    .show()
                    .fadeOut(500, () => {
                        _searchConditionListRaw.splice(deletedIndex, 1);
                        this.searchConditionList = _searchConditionListRaw;

                        const hasEmptyCondition = this.searchConditionList
                            .filter((condition) => !condition.content.trim())
                            .length !== 0;

                        if (!hasEmptyCondition) {
                            this.addCondition();
                            this.$('.search-condition:last')
                                .hide()
                                .fadeIn(500, () => {
                                    this.$('.search-condition input:last').focus();
                                });
                        } else {
                            this.$('.search-condition input:last').focus();
                        }
                    });

            } else if (nextCondition === undefined) {
                if (this.searchConditionList.length >= this.maxSearchNum) return;

                this.addCondition();
                this.$('.search-condition:last')
                    .hide()
                    .fadeIn(500);
            }
        },
    },
    onInit: function () {
        this.$('.modal').modal('show');
        this.$('.modal-dialog').draggable();
    }
}));