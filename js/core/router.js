class Subject {
    constructor() {
        this.subscribeSet = [];
    }

    subscribe(observer) {
        this.subscribeSet.push(observer);
    }

    unsubscribe(observer) {
        this.subscribeSet = this.subscribeSet.filter(value => {
            value !== observer
        })
    }

    publish() {
        this.subscribeSet.forEach(observer => observer.update())
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
    const urlSubject = new Subject()

    const forward = (page) => {
        history.replaceState(null, null, page)
        urlSubject.publish()
    }

    const navigate = (page) => {
        history.pushState(null, null, page)
        urlSubject.publish()
    }

    const refresh = () => {
        urlSubject.publish()
    }

    addEventListener('load', () => refresh())
    addEventListener('popstate', () => refresh())

    return {
        forward: forward,
        navigate: navigate,
        refresh: refresh,
        urlSubject: urlSubject
    }
})()