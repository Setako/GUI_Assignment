componentManager.register(new Component("search", {
    // language=HTML
    template: `
        <div class="input-group mb-3"
             ui-for="this.searchConditionList"
             ui-for-item-as="condition">
            
            <div class="input-group-prepend">
                <button class="btn btn-outline-secondary dropdown-toggle"
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
                   ui-model="this.condition.content">
        </div>
    `,
    data: function () {
        return {
            fieldList: ["Any", "Author", "Title", "Publisher"],
            searchConditionList: []
        }
    },
    computed: {},
    methods: {
        addCondition(field = this.fieldList[0], content = '') {
            this.searchConditionList.push({
                field: field,
                Content: content
            })
        }
    },
    onInit: function () {
        this.addCondition();
    }
}));