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
                        <div ui-if="this.loginFailed" class="alert alert-danger">
                            Username or password wrong!
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <i class="material-icons input-group-text"> account_box </i>
                            </div>
                            <input type="text" ui-model="this.username" ui-on:keydown="this.login" class="form-control" placeholder="Username">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <i class="material-icons input-group-text"> lock </i>
                            </div>
                            <input type="password" ui-model="this.password" ui-on:keydown="this.login" class="form-control" placeholder="Password">
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
            loginFailed: false,
            username: "",
            password: ""
        }
    },
    methods: {
        login: function (e) {
            if (e != null && e.type === "keydown") {
                if (e.keyCode !== 13) return;
            }
            let success = ServiceManager.getService("user-service").login(this.username, this.password);
            if (success) {
                this.loginFailed = false;
                this.$('.modal').modal('hide');
            } else {
                this.loginFailed = true;
                this.$('.modal:not(:animated)').effect("shake", {
                    times: 5
                })
            }
        },
        destory: function () {
            this.$destory();
        },
        createLoginFailedMessage: function () {

        },
    },
    onInit: function () {
        this.$('.modal').modal('show');
    }
}))