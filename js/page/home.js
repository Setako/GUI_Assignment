componentManager.register(new Component("home", {
    // language=HTML
    styleSheets: ["./css/pages/home.css"],
    // language=HTML
    template: `
        <!--<div>-->
        <!--<button class="float-right btn btn-primary" ui-on:click="this.newPortlet">Add</button>-->
        <!--</div>-->
        <div>
            <div class="material-icons"
                 style="position: fixed; bottom: 2rem; right: 2rem; font-size: 4rem;
                  border-radius: 50%; background-color: #fd7e14;color:white;cursor: pointer;user-select: none;
                  -moz-user-select: none;  -webkit-user-select: none; user-select: none"
                 ui-on:click="this.addNewPortlet">
                add
            </div>

            <div class="column left-portlet-slot" style="width: 25%">
            </div>

            <div class="column mid-portlet-slot" style="width: 50%">
            </div>

            <div class="column right-portlet-slot" style="width: 25%">
            </div>

            <div class="modal fade add-portlet-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            userService: ServiceManager.getService("user-service"),
            newPortletData: {
                type: ""
            }
        }
    },
    computed: {
        loginObserver: function () {
            if (!this.isInit) return;
            let layoutStr;
            if (this.userService.isLoggedIn) {
                let user = this.userService.loggedInUser;
                layoutStr = user.homeLayout != null ? user.homeLayout : PortletRender.getDefaultPortletByRule(user.type);
            } else {
                layoutStr = PortletRender.getDefaultPortletByRule(null);
            }
            this.loadLayout(layoutStr)
        }
    },
    methods: {
        addNewPortlet: function () {
            this.newPortletData = {
                type: ""
            };
            this.$(".add-portlet-modal").modal("show");
        },
        addPortlet: function (portletData, portletSlotIndex) {
            const slotQueries = [".left-portlet-slot", ".mid-portlet-slot", ".right-portlet-slot"];
            let portletSlot = this.$(slotQueries[portletSlotIndex]);
            let $portlet = $("<portlet></portlet>").appendTo(portletSlot);
            this.$walk($portlet[0], this);
            $portlet[0].component.vars.setParent(this);
            $portlet[0].component.vars.refreshContent(portletData);

        },
        serializePortlets: function () {
            let data = [[], [], []];
            this.$(".left-portlet-slot").find("portlet").each((i, portletEl) => data[0].push(portletEl.component.vars.portletData));
            this.$(".mid-portlet-slot").find("portlet").each((i, portletEl) => data[1].push(portletEl.component.vars.portletData));
            this.$(".right-portlet-slot").find("portlet").each((i, portletEl) => data[2].push(portletEl.component.vars.portletData));
            return JSON.stringify(data);
        },
        saveLayout: function () {
            if (this.userService.isLoggedIn) {
                let user = this.userService.loggedInUser;
                user.homeLayout = this.serializePortlets();
                DataStorage.saveData();
                console.log(user)
            }
        },
        loadLayout: function (str) {
            this.$(".left-portlet-slot").children().each((i, el) => console.log(safeRemoveElement(el)));
            this.$(".mid-portlet-slot").children().each((i, el) => console.log(safeRemoveElement(el)));
            this.$(".right-portlet-slot").children().each((i, el) => console.log(safeRemoveElement(el)));
            let layoutArr = JSON.parse(str);
            for (let i = 0; i < layoutArr.length; i++) {
                layoutArr[i].forEach(portlet => this.addPortlet(portlet, i));
            }
        }
    },
    onInit: function () {
        this.$(".column").sortable({
            connectWith: ".column",
            handle: ".portlet-header",
            cancel: ".portlet-toggle",
            placeholder: "portlet-placeholder ui-corner-all",
            update: () => this.saveLayout()
        });
        // this.addPortlet({
        //     type: "newest-book",
        //     bookLimit: 5
        // }, 1);
        this.isInit = true;
        // this.loadLayout("[[],[{\"type\":\"newest-book\",\"bookLimit\":5}],[]]")
    }
}));