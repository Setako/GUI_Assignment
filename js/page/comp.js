console.log(componentManager)
componentManager.register(new Component("test", {
    // language=HTML
    template: `
        <div>
            Hi,<br>
            User: {{this.user.name}}<br>
            Friends: {{this.user.friends}}<br>  
            Last Refresh time: {{this.getCurrentTime()}}<br>
            Money: HK$ {{this.user.money}}
            <hr>
            <div>
                Book: {{this.book.name}}<br>
                Author: {{this.book.author}}<br>
                <button>
                    Buy this book with HK$ {{this.book.price}}<br>
                    Your current money is HK$ {{this.user.money}}<br>
                    you will still have HK$ {{this.moneyAfterBuy}} after buy this book!
                </button>
            </div>
        </div>
    `,
    data: function () {
        return {
            user: {
                name: "Tester",
                friends: ["no", "friend", "here"],
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
            // $("#container").empty();
            // componentManager.getComponent("test").buildComponent($("#container").get(0));
        })
    }
}));
$(document).ready(() => {
    componentManager.getComponent("test").buildComponent($("#container").get(0));
});