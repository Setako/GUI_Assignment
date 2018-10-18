ServiceManager.register(new Service("user-service", {
    data: function () {
        return {
            loggedInUser: null,
            notificationService: ServiceManager.getService("notification-service")
        };
    },
    computed: {
        isLoggedIn: function () {
            return this.loggedInUser != null;
        }
    },
    methods: {
        /**
         * Login as a user
         * @return true if login success
         */
        login: function (username, password, remember) {
            const user = this.getUserByUserName(username);
            let success = !(user == null || user.password !== password);
            if (success && !user.requiredSetPassword) {
                this.loggedInUser = user;
                if (remember) {
                    DataStorage.data.loggedInUser = username;
                    DataStorage.saveData();
                }
                this.notificationService.addNotification({
                    type: "success",
                    content: [`Logged in as ${user.name}`]
                });
            }
            return success;
        },
        logout: function () {
            this.loggedInUser = null;
            DataStorage.data.loggedInUser = null;
            DataStorage.saveData();
            this.notificationService.addNotification({
                type: "success",
                content: [`Logged out`]
            });
        },
        resetPassword: function (email) {
            let user = this.getUserByEmail(email);
            if (user != null) {
                user.password = this.genPassword();
                user.requiredSetPassword = true;
                DataStorage.saveData();
                return true;
            } else {
                return false;
            }
        },
        setNewPassword: function (username, password) {
            this.getUserByUserName(username).password = password;
            this.getUserByUserName(username).requiredSetPassword = false;
            DataStorage.saveData();
        },
        genPassword: function () {
            return "seceret";
        },
        getUserByUserName: function (username) {
            return DataStorage.data.users.find(user => user.username === username);
        },
        getUserByEmail: function (email) {
            return DataStorage.data.users.find(user => user.email === email);
        }
    },
    onInit: function () {
        let loggedInUserName = DataStorage.data.loggedInUser;
        if (loggedInUserName != null) this.loggedInUser = this.getUserByUserName(loggedInUserName);
    }
}));