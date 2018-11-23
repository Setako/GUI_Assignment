componentManager.register(new Component("portlet", {
    styleSheets: ["./css/comps/portlet.css"],
    // language=HTML
    template: `
        <div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">
            <div class="portlet-header ui-widget-header ui-corner-all">
                {{this.title}}
                <span class='portlet-setting'>
                    <span class="material-icons ">settings</span>
                    <div class="dropdown-menu dropdown-menu-right portlet-setting-menu">
                        <a class="dropdown-item" href="#" ui-on:click="this.showSetting">Edit</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="javascript:void(0)"
                           ui-on:click="this.$destroy();this.saveSetting()">Remove from my home page</a>
                    </div>
                </span>
            </div>
            <div class="portlet-content"></div>
            <portlet-config></portlet-config>

        </div>
    `,
    data: function () {
        return {
            title: "",
            portletData: null,
            parent: null
        }
    },
    methods: {
        refreshContent: function (portletData) {
            this.$(".portlet-content").empty();
            this.portletData = portletData
            let portlet = PortletRender.getPortlet(portletData)
            this.title = portletData.title
            $(portlet.contentElement).appendTo(this.$(".portlet-content"));
        },
        showSetting: function () {
            this.$("portlet-config")[0].component.vars.show(this.portletData, (portletData) => {
                this.portletData = JSON.parse(JSON.stringify(portletData))
                this.refreshContent(this.portletData);
                this.saveSetting()
            });
        },
        setParent: function (parent) {
            this.parent = parent;
        },
        saveSetting: function () {
            this.parent.saveLayout();
        }
    },
    onInit: function () {
        this.$(".portlet-setting").click((e) => {
            this.$(".portlet-setting-menu").show("blind", {duration: 200});
        });

        $(document).click((e) => {
            if (e.target.closest(".portlet-setting") == null && e.target.closest(".portlet-setting-menu") == null)
                this.$(".portlet-setting-menu").hide("blind", {duration: 200})
        });
    }
}));