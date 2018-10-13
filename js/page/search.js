componentManager.register(new Component("search", {
    // language=HTML
    template: `
        <div class="input-group mb-3"
             ui-for="this.searchConditionList"
             ui-for-item-as="condition"
             xmlns:ui-on="http://www.w3.org/1999/xhtml"
             xmlns:ui-model="http://www.w3.org/1999/xhtml">

            <div class="input-group-prepend">
                <button class="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                    {{this.condition.selectedField}}
                </button>
                <div class="dropdown-menu"
                     ui-for="this.fieldList"
                     ui-for-item-as="field"
                     ui-if="this.field !== this.condition.selectedField">

                    <a class="dropdown-item"
                       ui-on:click="this.condition.selectedField = this.field">
                        {{this.field}}
                    </a>
                </div>
            </div>

            <input type="text"
                   class="form-control"
                   ui-model:value="this.condition.searchContent">
        </div>
    `,
    data: function () {
        return {
            fieldList: ["All", "Author", "Title", 'Publisher'],
            searchConditionList: [{
                selectedField: 'All',
                searchContent: ''
            }]
        }
    },
    methods: {},
    computed: {},
    onInit: function () {

    }
}));