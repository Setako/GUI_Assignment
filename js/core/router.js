class Subject {
    constructor() {
        this.subscriber = [];
    }

    subscribe(observer) {
        this.subscriber.push(observer);
    }

    unsubscribe(observer) {
        this.subscriber = this.subscriber.filter(value => value !== observer)
    }

    publish() {
        this.subscriber.forEach(observer => observer.update())
    }
}

class Observer {
    constructor(callback) {
        this.callback = callback;
    }

    update() {
        this.callback();
    }
}

ServiceManager.register(new Service("router", {
    data: function () {
        return {
            url: new URL(location.href),
            urlSubject: new Subject()
        }
    },
    methods: {
        forward: function (page) {
            history.replaceState(null, null, page);
            this.refresh();
        },
        navigate: function (page) {
            history.pushState(null, null, page);
            this.refresh();
        },
        refresh: function () {
            this.url = new URL(location.href);
            this.urlSubject.publish()
        }
    },
    onInit: function () {
        addEventListener('load', this.refresh);
        addEventListener('popstate', this.refresh);
    }
}));
const Router = ServiceManager.getService("router");
