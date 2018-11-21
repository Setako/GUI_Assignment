ServiceManager.register(new Service("condition-service", {
    data() {
        return {};
    },
    methods: {
        show(searchConditionList, target, completeCallback = () => {}) {
            const conditionModalComp = componentManager.getComponent("condition-modal").buildNewComponent();
            conditionModalComp.vars.searchConditionList = searchConditionList;
            conditionModalComp.vars.target = target;
            conditionModalComp.vars.completeCallback = completeCallback;
            $(conditionModalComp.element).appendTo($("#condition-modal-area"));
        }
    }
}));