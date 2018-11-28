componentManager.register(new Component("search", {
    // language=HTML
    template: `
        <div class="d-flex justify-content-center">
            <div style="max-width: 1000px;width: 100%;" class="flex-grow-0 flex-shrink-0">

                <div class="form-inline">
                <span class="input-group mt-4">
                    <p class="mr-5 font-weight-bold">Search for:</p>
                    <span class="custom-control-inline custom-checkbox mr-5"
                          ui-for="this.searchData.searchItemTypeList"
                          ui-for-item-as="itemType">

                        <input type="checkbox" class="custom-control-input" checked
                               ui-bind:id="{{this.itemType.type}}"
                               ui-model="this.itemType.checked">

                        <label class="custom-control-label"
                               ui-bind:for="{{this.itemType.type}}">
                            {{this.itemType.type}}
                        </label>
                    </span>
                </span>

                    <span class="input-group mt-4">
                    <p class="mr-5 font-weight-bold">Available:</p>
                    <span class="custom-control-inline custom-checkbox mr-5"
                          ui-for="this.searchData.available"
                          ui-for-item-as="available">

                        <input type="checkbox" class="custom-control-input" checked
                               ui-bind:id="{{this.available.field}}"
                               ui-model="this.available.checked">

                        <label class="custom-control-label"
                               ui-bind:for="{{this.available.field}}">
                            {{this.available.field}}
                        </label>
                    </span>
                </span>

                </div>

                <div class="mt-3 align-text-top mb-4">
                    <div class="row">
                        <div class="d-flex">
                            <div class="flex-grow-0">
                        <span class="col-2 font-weight-bold">
                            Publication Date:
                        </span>
                            </div>
                            <div class="flex-grow-1">
                                <span class="input-group align-text-top">
                                    <span class="mb-4 font-italic w-100">
                                        <span class="d-inline-block">From</span>
                                        <input type="text" class="form-control form-control-sm d-inline-block"
                                               style="width: auto" id="search-from-date"
                                               ui-model="this.searchData.from">
                                        <span>To</span>
                                        <input type="text" class="form-control form-control-sm d-inline-block"
                                               style="width: auto" id="search-to-date" ui-model="this.searchData.to">
                                        
                                        <span class="ml-2 text-primary">
                                            <a style="cursor: pointer" ui-on:click="this.changeYearSlider(1)">Last 1
                                                year</a>
                                            <span>/</span>
                                            <a style="cursor: pointer" ui-on:click="this.changeYearSlider(3)">Last 3
                                                years</a>
                                            <span>/</span>
                                            <a style="cursor: pointer" ui-on:click="this.changeYearSlider(5)">Last 5
                                                years</a>
                                        </span>
                                    </span>
                                </span>
                                <div class="" id="search-year-slider"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <span class="col-2"></span>
                        <span class="col-4">
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="bg-info text-white input-group-text">Subject</div>
                            </div>
                            <select multiple title="Any" class="form-control selectpicker" data-actions-box="true"
                                    data-width="auto" data-live-search="true" id="search-subject">
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="bg-info text-white input-group-text">Language</div>
                            </div>
                            <select multiple title="Any" class="form-control selectpicker" data-actions-box="true"
                                    data-width="auto" data-live-search="true" id="search-language">
                                <option value="Afrikanns">Afrikanns</option>
                                <option value="Albanian">Albanian</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Armenian">Armenian</option>
                                <option value="Basque">Basque</option>
                                <option value="Bengali">Bengali</option>
                                <option value="Bulgarian">Bulgarian</option>
                                <option value="Catalan">Catalan</option>
                                <option value="Cambodian">Cambodian</option>
                                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                                <option value="Croation">Croation</option>
                                <option value="Czech">Czech</option>
                                <option value="Danish">Danish</option>
                                <option value="Dutch">Dutch</option>
                                <option value="English">English</option>
                                <option value="Estonian">Estonian</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finnish">Finnish</option>
                                <option value="French">French</option>
                                <option value="Georgian">Georgian</option>
                                <option value="German">German</option>
                                <option value="Greek">Greek</option>
                                <option value="Gujarati">Gujarati</option>
                                <option value="Hebrew">Hebrew</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Hungarian">Hungarian</option>
                                <option value="Icelandic">Icelandic</option>
                                <option value="Indonesian">Indonesian</option>
                                <option value="Irish">Irish</option>
                                <option value="Italian">Italian</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Javanese">Javanese</option>
                                <option value="Korean">Korean</option>
                                <option value="Latin">Latin</option>
                                <option value="Latvian">Latvian</option>
                                <option value="Lithuanian">Lithuanian</option>
                                <option value="Macedonian">Macedonian</option>
                                <option value="Malay">Malay</option>
                                <option value="Malayalam">Malayalam</option>
                                <option value="Maltese">Maltese</option>
                                <option value="Maori">Maori</option>
                                <option value="Marathi">Marathi</option>
                                <option value="Mongolian">Mongolian</option>
                                <option value="Nepali">Nepali</option>
                                <option value="Norwegian">Norwegian</option>
                                <option value="Persian">Persian</option>
                                <option value="Polish">Polish</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Punjabi">Punjabi</option>
                                <option value="Quechua">Quechua</option>
                                <option value="Romanian">Romanian</option>
                                <option value="Russian">Russian</option>
                                <option value="Samoan">Samoan</option>
                                <option value="Serbian">Serbian</option>
                                <option value="Slovak">Slovak</option>
                                <option value="Slovenian">Slovenian</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Swahili">Swahili</option>
                                <option value="Swedish ">Swedish</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Tatar">Tatar</option>
                                <option value="Telugu">Telugu</option>
                                <option value="Thai">Thai</option>
                                <option value="Tibetan">Tibetan</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Turkish">Turkish</option>
                                <option value="Ukranian">Ukranian</option>
                                <option value="Urdu">Urdu</option>
                                <option value="Uzbek">Uzbek</option>
                                <option value="Vietnamese">Vietnamese</option>
                                <option value="Welsh">Welsh</option>
                                <option value="Xhosa">Xhosa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="search-condition"
                     ui-for="this.searchData.searchConditionList"
                     ui-for-item-as="condition"
                     ui-for-first-as="isFirst">

                    <div ui-if="!this.isFirst" class="d-flex align-content-center mt-3">
                        <div class="pr-2 flex-grow-0">
                            <button class="btn btn-primary dropdown-toggle"
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
                        <div class="input-group flex-grow-1">
                            <div class="input-group-prepend">
                                <button class="btn btn-info dropdown-toggle"
                                        type="button"
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

                    <div class="input-group mt-3" ui-if="this.isFirst">
                        <div class="input-group-prepend">
                            <button class="btn btn-info dropdown-toggle"
                                    type="button"
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
                        </select>
                    </div>

                </div>

                <div class="mt-4 font-italic font-weight-light">
                    <p class="text-secondary" ui-if="!this.isMatchMaxSearchNum">
                        * It is available to add more
                        {{this.maxSearchNum - this.searchData.searchConditionList.length}}
                        condition
                    </p>
                    <p class="text-danger" ui-if="this.isMatchMaxSearchNum">
                        * Maximum number of condition occurred
                    </p>
                </div>

                <div class="bg-light">
                    <section class="float-left w-75">

                        <ul class="list-inline">
                            <li class="material-icons list-inline-item text-primary align-text-bottom"
                                ui-if="this.searchItemTypeResult.length !== 0">
                                subdirectory_arrow_right
                            </li>
                            <li class="list-inline-item">
                            <span>
                                <span class="text-secondary mr-1 ml-0">{{""}}</span>
                                <span>{{this.searchItemTypeResult}}</span>
                            </span>
                            </li>
                        </ul>

                        <ul class="list-inline">
                            <li class="material-icons list-inline-item text-primary align-text-bottom"
                                ui-if="this.searchData.subject.length !== 0">
                                subdirectory_arrow_right
                            </li>
                            <li class="list-inline-item"
                                ui-if="this.searchData.subject.length !== 0">
                                <span>
                                    <span class="text-secondary mr-1 ml-0">{{""}}</span>
                                    <span>Subject contains</span>
                                    <span>{{this.searchData.subject.join(', ')}}</span>
                                </span>
                            </li>
                        </ul>

                        <ul class="list-inline">
                            <li class="material-icons list-inline-item text-primary align-text-bottom"
                                ui-if="this.searchData.language.length !== 0">
                                subdirectory_arrow_right
                            </li>
                            <li class="list-inline-item"
                                ui-if="this.searchData.language.length !== 0">
                                <span>
                                    <span class="text-secondary mr-1 ml-0">{{""}}</span>
                                    <span>Language contains</span>
                                    <span>{{this.searchData.language.join(', ')}}</span>
                                </span>
                            </li>
                        </ul>

                        <ul class="list-inline">
                            <li class="material-icons list-inline-item text-primary align-text-bottom"
                                ui-if="this.searchConditionResult.length !== 0">
                                subdirectory_arrow_right
                            </li>
                            <li class="list-inline-item"
                                ui-for="this.searchConditionResult"
                                ui-for-item-as="condition"
                                ui-for-first-as="isFirst">
                            <span>
                                <span class="text-secondary mr-1 ml-0">{{this.isFirst?"":this.condition.relation}}</span>
                                <span class="border-bottom border-info "
                                      style="cursor: pointer;"
                                      ui-on:click="this.focusByResult">
                                    <span class="">{{this.condition.field}} field</span>
                                    <span class="text-secondary">contains</span>
                                    <span class="text-primary">{{this.condition.content}}</span>
                                </span>
                            </span>
                            </li>
                        </ul>
                    </section>
                    <section class="float-right">
                        <button class="btn btn-danger"
                                ui-on:click="this.reset">
                            <i class="material-icons align-text-top">replay</i>
                            <span>Clear</span>
                        </button>
                        <button class="btn btn-primary"
                                ui-on:click="this.search">
                            <i class="material-icons align-text-top">search</i>
                            Search
                        </button>
                    </section>
                </div>

            </div>
        </div>`,
    data: function () {
        return {
            fieldList: ["Any", "Title", "Author", "Publisher", "ISBN"],
            relationList: ["AND", "OR", "NOT"],
            searchData: {
                searchItemTypeList: [{
                    type: "Book",
                    checked: true
                }, {
                    type: "Magazine",
                    checked: true
                }, {
                    type: "Software",
                    checked: true
                }],
                searchConditionList: [],
                from: '01/01/1918',
                to: $.datepicker.formatDate('dd/mm/yy', new Date()),
                available: [{
                    field: 'Available',
                    checked: true
                }, {
                    field: 'Unavailable',
                    checked: true
                }],
                subject: [],
                language: [],
            },
            maxSearchNum: 5,
            router: ServiceManager.getService('router'),
            notification: ServiceManager.getService('notification-service'),
            bookList: DataStorage.data.books,
            magazineList: DataStorage.data.magazines,
            softwareList: DataStorage.data.software,
        }
    },
    computed: {
        itemSubjectList() {
            const subjects = new Set();
            this.bookList.forEach((book) => subjects.add(...book.subject));
            this.magazineList.forEach((magazine) => subjects.add(...magazine.subject));
            this.softwareList.forEach((software) => subjects.add(...software.subject));

            return Array.from(subjects).filter(Boolean);
        },
        searchItemTypeResult() {
            let result = this.searchData.searchItemTypeList
                .filter((itemType) => itemType.checked)
                .map((itemType) => itemType.type.toLowerCase())
                .join(', ');

            return result.length === 0 ? '' : 'Search ' + result
        },
        searchConditionResult() {
            return this.searchData.searchConditionList
                .filter((condition) => !!condition.content.trim())
        },
        longestNameInFieldList() {
            return this.longestNameInList(this.fieldList);
        },
        isMatchMaxSearchNum() {
            return this.searchData.searchConditionList.length >= this.maxSearchNum;
        },
        searchConditionString() {
            return this.searchData.searchConditionList
                .filter((condition) => condition.content)
                .map((condition) => condition.field + ' contains ' + condition.content)
                .join(', and ')
        }
    },
    methods: {
        reset() {
            this.searchData.searchItemTypeList
                .forEach((itemType) => itemType.checked = true);

            this.searchData.searchConditionList
                .forEach((condition) => condition.content = '');

            this.searchData.available
                .forEach((available) => available.checked = true);

            this.$('#search-subject').selectpicker('deselectAll');
            this.$('#search-language').selectpicker('deselectAll');

            this.$('.search-condition input:first')
                .focus();

            this.$('.search-condition:not(:first)')
                .show()
                .fadeOut(500, () => {
                    this.searchData.searchConditionList
                        .splice(1);
                });

        },
        focusByResult() {
            const condition = this.condition._deepTarget;
            const conditionList = this.searchData.searchConditionList._deepTarget;
            const index = conditionList.indexOf(condition);
            this.$('.search-condition input')
                .eq(index)
                .focus();
        },
        longestNameInList(list = []) {
            return list
                .map((field) => field.length)
                .sort()
                .pop() || 0
        },
        addCondition(field = this.fieldList[0], content = '', relation = this.relationList[0]) {
            this.searchData.searchConditionList.push({
                field: field,
                relation: relation,
                content: content
            });
        },
        deleteEmptyCondition(e) {
            const _searchDataRaw = this.searchData._deepTarget;
            const index = _searchDataRaw.searchConditionList.indexOf(this.condition._deepTarget);
            const nextCondition = _searchDataRaw.searchConditionList[index + 1];

            if (e.originalEvent.type === 'keydown' && e.keyCode === 13) {
                return this.search();
            }

            if (_searchDataRaw.searchConditionList[index].content === '') {
                if (e.originalEvent.type !== 'keydown' || e.keyCode !== 8) return;

                let deletedIndex = nextCondition === undefined || nextCondition.content === ''
                    ? index + 1
                    : index;

                this.$('.search-condition')
                    .eq(deletedIndex)
                    .show()
                    .fadeOut(500, () => {
                        this.searchData.searchConditionList._deepTarget.splice(deletedIndex, 1);
                        this.searchData.searchConditionList = this.searchData.searchConditionList._deepTarget;

                        const hasEmptyCondition = this.searchData.searchConditionList
                            .filter((condition) => !condition.content.trim())
                            .length !== 0;

                        if (!hasEmptyCondition) {
                            this.addCondition();
                            this.$('.search-condition:last')
                                .hide()
                                .fadeIn(500, () => {
                                    this.$('.search-condition input:last').focus();
                                });
                        } else {
                            this.$('.search-condition input:last').focus();
                        }
                    });

            } else if (nextCondition === undefined) {
                if (this.searchData.searchConditionList.length >= this.maxSearchNum) return;

                this.addCondition();
                this.$('.search-condition:last')
                    .hide()
                    .fadeIn(500);
            }
        },
        search() {
            const hasSelectType = this.searchData.searchItemTypeList
                .filter((itemType) => itemType.checked)
                .length > 0;

            if (!hasSelectType) {
                this.notification.addNotification({
                    type: 'danger',
                    content: ['You should choose at least one type for searching!']
                });
                return;
            }

            let conditionList = this.searchData.searchConditionList._deepTarget;
            conditionList = conditionList.filter((condition) => condition.content.trim());
            this.searchData.searchConditionList = conditionList;

            const data = JSON.stringify(this.searchData._deepTarget);
            const base64 = btoa(data);
            this.router.navigate('?page=search-result&data=' + base64)
        },
        changeYearSlider(toYear = 100) {
            const now = new Date().getFullYear();
            this.$('#search-year-slider')
                .slider('values', 1, now)
                .slider('values', 0, now - toYear);
        },
    },
    onInit: function () {
        const self = this;
        this.addCondition();

        const getDate = (element) => {
            try {
                return $.datepicker.parseDate("mm/dd/yy", element.value);
            } catch (error) {
                return null;
            }
        };

        this.$("#search-year-slider").slider({
            range: true,
            min: new Date().getFullYear() - 100,
            max: (new Date()).getFullYear(),
            values: [new Date().getFullYear() - 100, (new Date()).getFullYear()],
            slide(event, ui) {
                const fromVal = $.datepicker.parseDate('dd/mm/yy',
                    self.$('#search-from-date').val()
                );
                fromVal.setFullYear(ui.values[0]);
                self.$('#search-from-date').datepicker('setDate',
                    $.datepicker.formatDate('dd/mm/yy', fromVal));

                const toVal = $.datepicker.parseDate('dd/mm/yy',
                    self.$('#search-to-date').val()
                );
                toVal.setFullYear(ui.values[1]);
                self.$('#search-to-date').datepicker('setDate',
                    $.datepicker.formatDate('dd/mm/yy', toVal))
            },
            change(event, ui) {
                const fromVal = $.datepicker.parseDate('dd/mm/yy',
                    self.$('#search-from-date').val()
                );
                fromVal.setFullYear(ui.values[0]);
                self.$('#search-from-date').datepicker('setDate',
                    $.datepicker.formatDate('dd/mm/yy', fromVal));

                const toVal = $.datepicker.parseDate('dd/mm/yy',
                    self.$('#search-to-date').val()
                );
                toVal.setFullYear(ui.values[1]);
                self.$('#search-to-date').datepicker('setDate', $.datepicker.formatDate('dd/mm/yy', toVal));

                self.searchData.from = $.datepicker.formatDate('dd/mm/yy', fromVal);
                self.searchData.to = $.datepicker.formatDate('dd/mm/yy', toVal)
            }
        });

        this.$('#search-from-date').datepicker({
            dateFormat: 'dd/mm/yy',
            defaultDate: "+1w",
            changeMonth: true,
            changeYear: true,
            autoSize: true,
            minDate: self.searchData.from
        }).on('change', function () {
            self.$("#search-to-date").datepicker("option", "minDate", getDate(this));
            self.searchData.from = $(this).val();
            self.$('#search-year-slider')
                .slider('values', 0, $.datepicker.parseDate('dd/mm/yy', $(this).val()).getFullYear())
        }).datepicker('setDate', this.searchData.from);

        this.$('#search-to-date').datepicker({
            dateFormat: 'dd/mm/yy',
            defaultDate: "+1w",
            changeMonth: true,
            changeYear: true,
            autoSize: true,
            maxDate: this.searchData.to
        }).on("change", function () {
            self.$('#search-from-date').datepicker("option", "maxDate", getDate(this));
            self.searchData.to = $(this).val();
            self.$('#search-year-slider')
                .slider('values', 1, $.datepicker.parseDate('dd/mm/yy', $(this).val()).getFullYear())
        }).datepicker('setDate', this.searchData.to);

        this.itemSubjectList.forEach(item => {
            this.$('#search-subject').append(`<option value="${item}">${item}</option>`)
        });

        this.$('.selectpicker').selectpicker();
        this.$('#search-subject').on('changed.bs.select', function () {
            self.searchData.subject = self.$(this).val();
        });
        this.$('#search-language').on('changed.bs.select', function () {
            self.searchData.language = self.$(this).val();
        })
    }
}));