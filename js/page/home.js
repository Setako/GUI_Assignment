componentManager.register(new Component("home", {
    // language=HTML
    styleSheets: ["./css/pages/home.css"],
    template: `
        <div class="text-center">
            <h1>Welcome to this index page!</h1>
        </div>
        <div class="column" style="width: 25%">

            <div class="portlet">
                <div class="portlet-header">Feeds</div>
                <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
            </div>

            <div class="portlet">
                <div class="portlet-header">News</div>
                <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
            </div>

        </div>

        <div class="column" style="width: 50%">

            <div class="portlet">
                <div class="portlet-header">Shopping</div>
                <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
            </div>

        </div>

        <div class="column" style="width: 25%">

            <div class="portlet">
                <div class="portlet-header">Links</div>
                <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
            </div>

            <div class="portlet">
                <div class="portlet-header">Images</div>
                <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
            </div>

        </div>
    `, onInit: function () {
        this.$(".column").sortable({
            connectWith: ".column",
            handle: ".portlet-header",
            cancel: ".portlet-toggle",
            placeholder: "portlet-placeholder ui-corner-all"
        });

        this.$(".portlet")
            .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            .addClass("ui-widget-header ui-corner-all")
            .prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

        this.$(".portlet-toggle").on("click", function () {
            var icon = $(this);
            icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
            icon.closest(".portlet").find(".portlet-content").toggle();
        });
    }
}));