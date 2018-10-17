componentManager.register(new Component("search-result", {
    // language=HTML
    template: `
        <div class="text-center align-middle">
            <div class="form-inline bg-light search-bar">

                <div class="input-group mb-3 w-50 p-4 mx-auto">
                    <input type="text" class="form-control" placeholder="Search"
                           aria-label="Search" aria-describedby="basic-addon2">

                    <div class="input-group-append">
                        <button class="material-icons btn btn-outline-primary" type="button">
                            search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {}
    },
    methods: {},
    computed: {},
    onInit: function () {

    }
}));