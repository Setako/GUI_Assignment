componentManager.register(new Component("condition-modal", {
    template: `
        <div >
            <div class="modal fade " tabindex="-1" role="dialog"
                ui-on:hidden.bs.modal="this.destory"
                 ui-on:shown.bs.modal="this.shown">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content"  ui-if="this.searchData !=null">
                        <div class="modal-header">
                            <!--<h5 class="modal-title">Resource info: {{this.book.title}}</h5>-->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="">
                                <div class="input-group mt-3 search-condition"
                                     ui-for="this.searchData.searchConditionList"
                                     ui-for-item-as="condition"
                                     ui-for-first-as="isFirst">
                    
                                    <div class="input-group-prepend mr-2"
                                         ui-if="!this.isFirst">
                                        <button class="btn btn-info dropdown-toggle"
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
            searchData: null,
            target: null
        }
    },
    onInit: function () {
        this.$('.modal').modal('show');
        this.$('.modal-dialog').draggable();
        this.$('.modal').on('shown.bs.modal', () => {
            if (!this.target) return;

            const condition = this.target._deepTarget;
            const conditionList = this.searchData.searchConditionList._deepTarget;
            const index = conditionList.indexOf(condition);
            this.$('.search-condition input')
                .eq(index)
                .focus();
        });
    }
}));