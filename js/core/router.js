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

const Router = (function () {
    const urlSubject = new Subject();

    const forward = (page) => {
        history.replaceState(null, null, page);
        urlSubject.publish()
    };

    const navigate = (page) => {
        history.pushState(null, null, page);
        urlSubject.publish()
    };

    const refresh = () => {
        urlSubject.publish()
    };

    const getParams = () => {
        let result = {};
        new URL(location.href).searchParams.forEach((k, v) => result[k] = v);
        return result;
    };

    const getParam = (key) => getParams()[key];

    addEventListener('load', refresh);
    addEventListener('popstate', refresh);

    return {
        forward: forward,
        navigate: navigate,
        refresh: refresh,
        urlSubject: urlSubject
    }
})();