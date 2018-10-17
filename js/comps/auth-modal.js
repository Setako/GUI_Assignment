componentManager.register(new Component("auth-modal", {
    // language=HTML
    template: `
        <div class="modal fade" tabindex="-1" role="dialog" ui-on:hidden.bs.modal="this.destory">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">User Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <i class="material-icons input-group-text"> account_box </i>
                            </div>
                            <input type="text" ui-model="this.username" class="form-control" placeholder="Username">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <i class="material-icons input-group-text"> lock </i>
                            </div>
                            <input type="password" ui-model="this.password" class="form-control" placeholder="Password">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" ui-on:click="this.login">Login</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login: function () {
            ServiceManager.getService("user-service").login(this.username, this.password);
            this.$('.modal').modal('hide');
        },
        destory: function () {
            this.$destory();
        },
        createLoginFailedMessage:function(){

        }
    },
    onInit: function () {
        this.$('.modal').modal('show');
    }
}))