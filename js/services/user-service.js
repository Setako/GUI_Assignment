ServiceManager.register(new Service("user-service", {
    data: function () {
        return {
            loggedInUser: null
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
        login: function (username, password) {
            const user = this.getUserByUserName(username);
            let success = !(user == null || user.password !== password);
            if (success) this.loggedInUser = user;
            return success;
        },
        logout: function () {
            this.loggedInUser = null;
        },
        getUserByUserName: function (username) {
            return DataStorage.data.users.find(user => user.username === username);
        }
    }
}));