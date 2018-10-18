componentManager.register(new Component("search-result", {
    // language=HTML
    template: `
        <div>
            <div class="form-inline bg-light search-bar">

                <div class="input-group mb-3 w-50 p-4 mx-auto">
                    <input type="text" class="form-control" placeholder="Search"
                           aria-label="Search" aria-describedby="basic-addon2"
                           ui-model="this.searchContent">


                    <div class="input-group-append">
                        <router-link class="material-icons btn btn-primary" type="button"
                                     href="?page=search">
                            search
                        </router-link>
                    </div>

                    <route-link href="?page=search" class="btn text-secondary border-0 ml-3">
                        Advanced Search
                    </route-link>
                </div>


            </div>
        </div>
    `,
    data: function () {
        return {
            searchContent: '',
            searchData: {
                type: 'simple',
                searchItemTypeList: [],
                searchConditionList: []
            },
            router: ServiceManager.getService('router'),
            base64: ''
        }
    },
    computed: {},
    methods: {
        addCondition(field = this.fieldList[0], content = '') {
            this.searchData.searchConditionList.push({
                field: field,
                content: content
            });
        },
        search() {

        },
        updateSearch() {
            let base64 = this.router.urlData.url._deepTarget.searchParams.get('data');
            if (!base64) return;
            if (this.base64 === base64) return;

            let data = JSON.parse(atob(base64));

            this.searchData.type = data.type || this.searchData.type;
            this.searchData.searchItemTypeList.push(...(data.searchItemTypeList || []));
            this.searchData.searchConditionList.push(...(data.searchConditionList || []));

            this.searchContent = this.searchData.searchConditionList
                .map((condition) => condition.content)
                .filter((content) => !!content)
                .join(' ');

            if (this.searchContent === '') return;

            if (this.searchData.type === 'advanced') {
                this.searchContent = 'advanced: ' + this.searchContent;
            }
        }
    },
    onInit: function () {
        this.updateSearch();
    }
}));