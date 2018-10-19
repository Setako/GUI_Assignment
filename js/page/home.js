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
                 style="position: fixed; bottom: 2rem; right: 2rem; font-size: 4rem; line-height: 4rem;
                  border-radius: 50%; background-color: #fd7e14;color:white;cursor: pointer;user-select: none;
                  box-shadow: #4e555b 0px 0px 2px; z-index: 10;
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

            <div class="modal fade new-portlet-modal" tabindex="-1" role="dialog"
                 ui-on:hidden.bs.modal="this.configNewPortlet">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Select widget type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Widgets type</label>
                                    </div>
                                    <select ui-model="this.newPortletData.type" class="custom-select"
                                            required>
                                        <option selected>Choose...</option>
                                        <option value="newest-book">Newest book</option>
                                        <option value="newest-magazine">Newest magazine</option>
                                        <option value="random-book">Random book</option>
                                        <option value="book-ranking">Book ranking</option>
                                        <option value="user-area">User area</option>
                                        <option value="activity-news">Activity news</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" ui-on:click="this.configNewPortlet">Create new
                                widget
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <portlet-config></portlet-config>
        </div>
    `,
    data: function () {
        return {
            userService: ServiceManager.getService("user-service"),
            newPortletData: {
                type: ""
            },
            cancelled: false,
            typeModalHidden: false
        }
    },
    computed: {
        loginObserver: function () {
            if (!this.isInit) return;
            this.userService.isLoggedIn;
            this.loadLayout.apply(this._deepTarget)
        }
    },
    methods: {
        addNewPortlet: function (type) {
            this.newPortletData = {
                type: ""
            };
            this.typeModalHidden = false;
            this.$(".new-portlet-modal").modal("show");
        },
        configNewPortlet: function () {
            if (!this.typeModalHidden) {
                this.$(".new-portlet-modal").modal("hide");
                this.typeModalHidden = true
                return;
            }
            this.$("portlet-config")[0].component.vars.show(this.newPortletData, (data) => {
                this.addPortlet(data, data.column)
                this.saveLayout();
            }, true);
        },
        addPortlet: function (portletData, portletSlotIndex) {
            const slotQueries = [".left-portlet-slot", ".mid-portlet-slot", ".right-portlet-slot"];
            let portletSlot = this.$(slotQueries[portletSlotIndex]);
            let $portlet = $("<portlet></portlet>");
            $portlet.appendTo(portletSlot);
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
            console.log("saved")
            if (this.userService.isLoggedIn) {
                let user = this.userService.loggedInUser;
                user.homeLayout = this.serializePortlets();
                DataStorage.saveData();
            }
        },
        loadLayout: function () {
            let str;
            if (this.userService.isLoggedIn) {
                let user = this.userService.loggedInUser;
                str = user.homeLayout != null ? user.homeLayout : PortletRender.getDefaultPortletByRule(user.type);
            } else {
                str = PortletRender.getDefaultPortletByRule(null);
            }
            this.$(".left-portlet-slot").children().each((i, el) => safeRemoveElement(el));
            this.$(".mid-portlet-slot").children().each((i, el) => safeRemoveElement(el));
            this.$(".right-portlet-slot").children().each((i, el) => safeRemoveElement(el));
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