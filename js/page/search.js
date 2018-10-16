componentManager.register(new Component("search", {
    // language=HTML
    template: `
        <div class="m-4">
            <div class="input-group mt-3 float-left"
                 ui-for="this.searchData.searchConditionList"
                 ui-for-item-as="condition">

                <div class="input-group-prepend">
                    <button class="btn btn-info dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        {{this.condition.field}}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item"
                           ui-for="this.fieldList"
                           ui-for-item-as="field"
                           ui-on:click="this.condition.field = this.field">
                            {{this.field}}
                        </a>
                    </div>
                </div>

                <input type="text"
                       class="form-control"
                       ui-on:keyup="this.deleteEmptyCondition"
                       ui-model="this.condition.content">
            </div>
            
        </div>`,
    data: function () {
        return {
            fieldList: ["Any", "Author", "Title", "Publisher"],
            searchData: {
                searchConditionList: [],
            },
            maxSearchNum: 5
        }
    },
    computed: {},
    methods: {
        addCondition(field = this.fieldList[0], content = '') {
            if (this.searchData.searchConditionList.length > this.maxSearchNum) return;
            this.searchData.searchConditionList.push({
                field: field,
                content: content
            })
        },
        deleteEmptyCondition(condition) {
            let _searchDataRaw = this.searchData._target._target;
            let index = _searchDataRaw.searchConditionList.indexOf(this.condition._target._target);
            let nextCondition = _searchDataRaw.searchConditionList[index + 1];

            if (_searchDataRaw.searchConditionList[index].content === '') {
                this.searchData.searchConditionList.splice(
                    nextCondition === undefined || nextCondition.content === ''
                        ? index + 1
                        : index,
                    1
                )
            } else {
                if (nextCondition === undefined) {
                    this.addCondition();
                }
            }
        }
    },
    onInit: function () {
        this.addCondition();
    }
}));