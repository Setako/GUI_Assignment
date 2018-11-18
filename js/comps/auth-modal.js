componentManager.register(new Component("auth-modal", {
    // language=HTML
    template: `
        <div>
            <div class="modal fade" tabindex="-1" role="dialog" ui-on:hidden.bs.modal="this.destory"
                 ui-on:shown.bs.modal="this.shown">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="overflow:hidden;">
                        <div class="modal-header">
                            <h5 class="modal-title">{{this.process}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div style="position:relative;">
                                <div ui-if="this.process==='Login'" ui-if-fade-in="this.fadeIn"
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
                                        <div class="mb-1">
                                            <span style="float: left;" class="custom-checkbox custom-control">
                                                        <input type="checkbox" class="custom-control-input"
                                                               id="remember-me" ui-model="this.remember">
                                                <label class="custom-control-label" for="remember-me">
                                                    Remember me
                                                </label>
                                            </span>
                                            <span style="float: right">
                                                <a href="javascript:void(0)"
                                                   ui-on:click="this.process='Reset Password'">Forgot
                                                password?</a>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div ui-if="this.process==='Reset Password'" ui-if-fade-in="this.fadeIn"
                                     ui-if-fade-out="this.fadeOut">
                                    <div class="auth-content">
                                        <div class="alert alert-info">
                                            Forgot your password? Enter your registered email here, the new password
                                            will send to your email if you are already registered
                                        </div>
                                        <div ui-if="this.emailNotExist" class="alert alert-danger">
                                            Email not registered!
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <i class="material-icons input-group-text"> email </i>
                                            </div>
                                            <input type="email" ui-model="this.resetEmail"
                                                   ui-on:keydown="this.resetPassword"
                                                   class="form-control" placeholder="Registered email">
                                        </div>
                                        <div style="text-align: right" class="mb-1">
                                            <a href="javascript:void(0)"
                                               ui-on:click="this.process='Login'">I remember my password</a>
                                        </div>
                                    </div>
                                </div>
                                <div ui-if="this.process==='Set New Password'" ui-if-fade-in="this.fadeIn"
                                     ui-if-fade-out="this.fadeOut">
                                    <div class="auth-content">
                                        <div class="alert alert-info">
                                            You are required to set a new password before using the system
                                        </div>
                                        <div ui-if="this.repeatPasswordWrong" class="alert alert-danger">
                                            Password repeat not match!
                                        </div>
                                        <div class="input-group mb-1">
                                            <div class="input-group-prepend">
                                                <i class="material-icons input-group-text"> lock </i>
                                            </div>
                                            <input id="newPwInput" ui-bind:type="this.showPassword?'test':'password'"
                                                   ui-model="this.newPassword"
                                                   ui-on:keydown="this.setPassword"
                                                   ui-on:focus="this.showTips = true"
                                                   ui-on:blur="this.showTips = false"
                                                   class="form-control" placeholder="New password">
                                            <div class="input-group-append" style="cursor: pointer">
                                                <i class="material-icons input-group-text" ui-if="!this.showPassword"
                                                   ui-on:click="this.showPassword = true"> visibility_off </i>
                                                <i class="material-icons input-group-text" ui-if="this.showPassword"
                                                   ui-on:click="this.showPassword = false"> visibility </i>
                                            </div>
                                        </div>
                                        <div class="p-2" style="background-color: #F5F5F5; ">
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated"
                                                     role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     ui-bind:style="this.passwordProgressBarStyle"></div>
                                            </div>
                                            Password Strength: {{this.passwordStrength}}
                                        </div>
                                        <div class="mb-3 p-2" ui-if="this.showTips" style="background-color: #F5F5F5;"
                                             ui-if-fade-in="this.tipsFadeIn" ui-if-fade-out="this.tipsFadeOut">
                                            <div>
                                                Current password length: {{this.newPassword.length}}
                                                <span ui-if="this.newPassword.length<8"
                                                      style="color:red"> Too short</span>
                                            </div>
                                            <div>
                                                Have lower case letter:
                                                <span ui-if="this.pwHaveSmallAlphabet" style="color: green">Yes</span>
                                                <span ui-if="!this.pwHaveSmallAlphabet" style="color:red">No</span>
                                            </div>
                                            <div>
                                                Have upper case letter:
                                                <span ui-if="this.pwHaveUpperAlphabet" style="color: green">Yes</span>
                                                <span ui-if="!this.pwHaveUpperAlphabet" style="color:red">No</span>
                                            </div>
                                            <div>
                                                Have decimal:
                                                <span ui-if="this.pwHaveDecimal" style="color: green">Yes</span>
                                                <span ui-if="!this.pwHaveDecimal" style="color:red">No</span>
                                            </div>
                                            <div>
                                                Have symbol:
                                                <span ui-if="this.pwHaveNonW" style="color: green">Yes</span>
                                                <span ui-if="!this.pwHaveNonW" style="color:red">No</span>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <i class="material-icons input-group-text"> done </i>
                                            </div>
                                            <input type="password" ui-model="this.repeatPassword"
                                                   ui-on:keydown="this.setPassword"
                                                   class="form-control" placeholder="Repeat password">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div style="position:relative; width: 100%;">
                                <div ui-if="this.process==='Reset Password'" ui-if-fade-in="this.fadeIn"
                                     style="width: 100%; text-align: right"
                                     ui-if-fade-out="this.fadeOut">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" class="btn btn-danger" ui-on:click="this.resetPassword">Reset
                                        password
                                    </button>
                                </div>
                                <div ui-if="this.process==='Login'" ui-if-fade-in="this.fadeIn"
                                     style="width: 100%; text-align: right"
                                     ui-if-fade-out="this.fadeOut">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" class="btn btn-primary" ui-on:click="this.login">Login
                                    </button>
                                </div>
                                <div ui-if="this.process==='Set New Password'" ui-if-fade-in="this.fadeIn"
                                     style="width: 100%; text-align: right"
                                     ui-if-fade-out="this.fadeOut">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" class="btn btn-primary" ui-on:click="this.setPassword"
                                            ui-bind:disabled="this.passwordScore<25">Confirm
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            showTips: false,
            showPassword: false,
            process: "Login",
            loginFailed: false,
            repeatPasswordWrong: false,
            emailNotExist: false,
            username: "",
            password: "",
            newPassword: "",
            repeatPassword: "",
            resetEmail: "",
            remember: false,
            notificationService: ServiceManager.getService("notification-service")
        }
    },
    computed: {
        pwHaveDecimal: function () {
            return /\d/.test(this.newPassword);
        },
        pwHaveSmallAlphabet: function () {
            return /[a-z]/.test(this.newPassword);
        },
        pwHaveUpperAlphabet: function () {
            return /[A-Z]/.test(this.newPassword);
        },
        pwHaveNonW: function () {
            return /\W/.test(this.newPassword);
        },
        passwordScore: function () {
            let score = 0;
            if (/\d/.test(this.newPassword)) score += 5;
            if (/\W/.test(this.newPassword)) score += 15;
            if (/[a-z]/.test(this.newPassword)) score += 5;
            if (/[A-Z]/.test(this.newPassword)) score += 10;
            score += this.newPassword.length * 3;
            score = Math.min(score, 100);
            if (this.newPassword.length < 8) {
                score *= 0.25;
            }
            return score;
        },
        passwordStrength: function () {
            let strength = ["Danger", "Weak", "Good", "Strong", "Very Strong"];
            return strength[parseInt(this.passwordScore / 25)];
        },
        passwordProgressBarStyle: function () {
            let color = ["#dc3545", "#ffc107", "#17a2b8", "#28a745", "#28a745"]
            return {
                width: this.passwordScore + '%',
                "background-color": color[parseInt(this.passwordScore / 25)]
            }
        }
    },
    methods: {
        fadeIn: function (element, endCb) {
            // $(element).effect("shake")
            this.$(element).effect("slide", {direction: "right"}, () => endCb());
        },
        fadeOut: function (element, endCb) {
            this.$(element).css("position", "absolute").css("top", "0")
                .hide("slide", {direction: "left"}, () => endCb());
        },
        tipsFadeIn: function (element, endCb) {
            this.$(element).effect("slide", {direction: "up"}, () => endCb());
        },
        tipsFadeOut: function (element, endCb) {
            this.$(element).hide("slide", {direction: "up"}, () => endCb());
        },

        login: function (e) {
            if (e != null && e.type === "keydown" && e.keyCode !== 13) return;
            let success = ServiceManager.getService("user-service").login(this.username, this.password, this.remember);
            if (success) {
                let user = ServiceManager.getService("user-service").getUserByUserName(this.username);
                if (!user.requiredSetPassword) {
                    this.loginFailed = false;
                    this.$('.modal').modal('hide');
                } else {
                    this.process = "Set New Password"
                }
            } else {
                this.loginFailed = true;
                this.$('.modal:not(:animated)').effect("shake", {
                    times: 2
                })
            }
        },
        resetPassword: function (e) {
            if (e != null && e.type === "keydown" && e.keyCode !== 13) return;
            let success = ServiceManager.getService("user-service").resetPassword(this.resetEmail);
            if (success) {
                this.emailNotExist = false;
                this.$('.modal').modal('hide');
                this.notificationService.addNotification({
                    type: "success",
                    content: ["Password reset successfully, please check your email to find out the new password!"]
                });
            } else {
                this.emailNotExist = true;
                this.$('.modal:not(:animated)').effect("shake", {
                    times: 2
                })
            }
        },
        setPassword: function (e) {
            if (e != null && e.type === "keydown" && e.keyCode !== 13) return;
            let success = this.newPassword === this.repeatPassword;
            if (success) {
                ServiceManager.getService("user-service").setNewPassword(this.username, this.newPassword);
                ServiceManager.getService("user-service").login(this.username, this.newPassword, this.remember);
                this.repeatPasswordWrong = false;
                this.$('.modal').modal('hide');
            } else {
                this.repeatPasswordWrong = true;
                this.$('.modal:not(:animated)').effect("shake", {
                    times: 2
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
}));