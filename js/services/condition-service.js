ServiceManager.register(new Service("condition-service", {
    data() {
        return {};
    },
    methods: {
        show(searchData, target) {
            const conditionModalComp = componentManager.getComponent("condition-modal").buildNewComponent();
            conditionModalComp.vars.searchData = searchData;
            conditionModalComp.vars.target = target;
            $(conditionModalComp.element).appendTo($("#condition-modal-area"));
        }
    }
}));