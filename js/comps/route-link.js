componentManager.register(new Component("route-link", {
    // language=HTML
    template: `
        <a ui-bind:href="this.href" ui-on:click="this.click" style="color: red">
            <slot></slot>
        </a>
    `,
    props: ["href", "linkclass", "linkstyle"],
    data: function () {
        return {
            isInit: false
        }
    },
    computed: {
        _classInherit: function () {
            if (this.isInit) {
                let classes = this.linkclass;
                this.setClass(classes);
            }
        },
        _styleInherit: function () {
            if (this.isInit) {
                let style = this.linkstyle;
                console.log(this.linkstyle)
                this.setStyle(style);
            }
        }
    },
    methods: {
        click: function (event) {
            event.preventDefault();
            Router.navigate(this.href);
        },
        setClass: function (classes) {
            this.$("a")[0].className = classes;
        },
        setStyle: function (style) {
            this.$("a")[0].style.cssText = style;
        }
    },
    onInit: function () {
        this.isInit = true;
    }
}));