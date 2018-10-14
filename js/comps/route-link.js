componentManager.register(new Component("route-link", {
    // language=HTML
    template: `
        <a ui-bind:href="this.href" ui-on:click="this.click">
            <slot></slot>
        </a>
    `,
    props: ["href"],
    methods: {
        click: function(event) {
            event.preventDefault();
            Router.navigate(this.href);
            console.log(this.href)
        }
    }
}))