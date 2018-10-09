componentManager.register(new Component("test", {
    // language=HTML
    template: `
        <div>
            Hi,<br>
            User: {{this.user.name}}<br>
            <div ui-for="this.user.friends" ui-for-item-as="friend">
                Friend:{{this.friend.name}}
                Money:{{this.friend.money}}
                <button></button>
            </div>
            Last Refresh time: {{this.getCurrentTime()}}<br>
            Money: HK$ {{this.user.money}}
            <hr>
            <div>
                Book: {{this.book.name}}<br>
                Author: {{this.book.author}}<br>
                <button id="t" ui-bind:test="this.test" ui-bind:test2="this.test2">
                    Buy this book with HK$ {{this.book.price}}<br>
                    Your current money is HK$ {{this.user.money}}<br>
                    you will still have HK$ {{this.moneyAfterBuy}} after buy this book!
                </button>
            </div>
        </div>
    `,
    data: function () {
        return {
            test:10,
            test2:"wtf",
            user: {
                name: "Tester",
                friends: [{
                    name: "Tester2",
                    money: 500
                }, {
                    name: "Tester3",
                    money: 150
                }, {
                    name: "EdgePeople",
                    money: 100
                }],
                money: 100
            },
            book: {
                name: "Math Book",
                author: "God",
                price: 5
            }
        }
    },
    methods: {
        getCurrentTime: function () {
            return new Date().toISOString();
        },
        buyBook: function () {
            this.user.money -= this.book.price;
        }
    },
    computed: {
        moneyAfterBuy: function () {
            return this.user.money - this.book.price;
        }
    },
    onInit: function () {
        this.$("button").click((i, el) => {
            this.buyBook();
            // this.user.friends[2].money-=10

            // $("#container").empty();
            this.user.friends.forEach(friend => {
                friend.money -= (Math.random() * 10);
            });
            this.user.friends.push({
                name: "Added",
                money: 100
            });
            // componentManager.getComponent("test").buildComponent($("#container").get(0));
        })
    }
}));
$(document).ready(() => {
    componentManager.getComponent("test").buildComponent($("#container").get(0));
});