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
            return !(user == null || user.password !== password);

        },
        getUserByUserName: function (username) {
            return Object.values(DataStorage.data).find(user => user.username === username);
        }
    }
}));