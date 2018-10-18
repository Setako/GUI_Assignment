componentManager.register(new Component("auth-modal", {
    // language=HTML
    template: `
        <div>
            <div class="modal fade" tabindex="-1" role="dialog" ui-on:hidden.bs.modal="this.destory"
                 ui-on:shown.bs.modal="this.shown">
                <div class="modal-dialog">
                    <div class="modal-content" style="overflow:hidden;">
                        <div class="modal-header">
                            <h5 class="modal-title">User Login</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" ui-if="this.process==='login'" ui-if-fade-in="this.fadeIn"
                             ui-if-fade-out="this.fadeOut">
                            <div class="auth-content">
                                <div ui-if="this.loginFailed" class="alert alert-danger">
                                    Username or password wrong!
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <i class="material-icons input-group-text"> account_box </i>
                                    </div>
                                    <input type="text" ui-model="this.username" ui-on:keydown="this.login"
                                           class="form-control"
                                           placeholder="Username" name="username">
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <i class="material-icons input-group-text"> lock </i>
                                    </div>
                                    <input type="password" ui-model="this.password" ui-on:keydown="this.login"
                                           class="form-control" placeholder="Password">
                                </div>
                                <a href="javascript:void(0)">Forgot password?</a>
                                </diva>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" ui-on:click="this.login">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `,
    data: function () {
        return {
            process: "login",
            loginFailed: false,
            username: "",
            password: "",
            notificationService: ServiceManager.getService("notification-service")
        }
    },
    methods: {
        fadeIn: function (element, endCb) {
            // $(element).effect("shake")
        },
        fadeOut: function (element, endCb) {
            this.$(element).effect("slide", () => endCb());
        },
        login: function (e) {
            if (e != null && e.type === "keydown") {
                if (e.keyCode !== 13) return;
            }
            let success = ServiceManager.getService("user-service").login(this.username, this.password);
            if (success) {
                this.loginFailed = false;
                this.$('.modal').modal('hide');
                this.notificationService.addNotification({
                    type: "success",
                    content: ["Login success!"]
                });
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
        shown: function () {
            this.$('input[name="username"]').focus()
        }
    },
    onInit: function () {
        this.$('.modal').modal('show')
    }
}))