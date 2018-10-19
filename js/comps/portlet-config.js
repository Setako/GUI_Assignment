componentManager.register(new Component("portlet-config", {
    template: `
            <div class="modal fade setting-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                        <div ui-if="this.notFulfilling" class="alert alert-danger">
                                            The field is not fulfilling!
                                        </div>
                        <form></form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
    `,
    data: function () {
        return {
            portletData: null,
            doneCb: null,
            notFulfilling: false
        }
    },
    methods: {
        show(portletData, doneCb) {
            this.doneCb = doneCb;
            this.portletData = JSON.parse(JSON.stringify(portletData));
            //clear all el
            this.$("form").each(el => safeRemoveElement(el)).empty();


            console.log(PortletRender.getPortletSettingTypes(this.portletData.type));
            //add el
            Object.entries(PortletRender.getPortletSettingTypes(this.portletData.type)).forEach(entry => {
                if (this.portletData[entry[0]] === undefined) this.portletData[entry[0]] = ""
                console.log(this.portletData[entry[0]])
                let $el;
                switch (entry[1].type) {
                    case "number":
                        // language=HTML
                        $el = $(`
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <i class="input-group-text">${entry[1].display}</i>
                                </div>
                                <input type="number" ui-model="this.portletData.${entry[0]}" ui-on:keydown="this.done"
                                       class="form-control" min="${entry[1].min}" max="${entry[1].max}" ${entry[1].required ? "required" : ""}>
                            </div>
                        `).appendTo(this.$("form"));
                        break;
                    case "text":
                        // language=HTML
                        $el = $(`
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <i class="input-group-text">${entry[1].display}</i>
                                </div>
                                <input type="text" ui-model="this.portletData.${entry[0]}" ui-on:keydown="this.done"  ${entry[1].required ? "required" : ""}
                                       class="form-control"
                                       placeholder="Username" name="username">
                            </div>
                        `).appendTo(this.$("form"))
                }
                this.$walk($el[0], this);
            });
            this.$(".setting-modal").modal("show");
        },
        done(e) {
            if (e != null && e.type === "keydown" && e.keyCode !== 13) return;
            if (this.$("form").valid()) {
                this.notFulfilling = false;
                this.$(".setting-modal").modal("hide");
                Object.entries(PortletRender.getPortletSettingTypes(this.portletData.type)).forEach(entry => {
                    switch (entry[1].type) {
                        case "number":
                            this.portletData[entry[0]] = parseInt(this.portletData[entry[0]]);
                            break;
                    }
                });
                this.doneCb(this.portletData);
            } else {
                this.notFulfilling = true;
                this.$('.modal:not(:animated)').effect("shake", {
                    times: 2
                })
            }
        }
    }
}));