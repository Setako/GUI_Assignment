ServiceManager.register(new Service("page-manager", {
    data: function () {
        return {
            pageMap: new Map(),
            container: null,
            defaultPageId: null,
            errorPageId: null,
            currentPageId: null,
            beforeChangeAction: () => {
            },
            afterChangeAction: () => {
            }
        }
    },
    methods: {
        addPage: function (pageId, pageFactory) {
            this.pageMap._target.set(pageId, pageFactory);
            return PageManager
        },
        addComponentAsPage: function (pageId, componentId = pageId) {
            this.addPage(pageId, () => componentManager.pageFactory(componentId));
            return PageManager
        },
        updatePage: function () {
            const getParamByURL = (url, key) => new URL(url).searchParams.get(key);
            const getPageId = () => getParamByURL(location.href, 'page');
            let pageId = getPageId();
            pageId = pageId ? pageId : this.defaultPageId;
            pageId = this.pageMap._target.has(pageId) ? pageId : this.errorPageId;

            if (!pageId) throw '404 (404 Error Page) Not Found';

            // if (pageId === this.currentPageId) return;
            this.currentPageId = pageId;

            this.beforeChangeAction();

            const pageElem = this.pageMap._target.get(pageId)();

            $(this.container._target)
                .children()
                .each((index, elem) => safeRemoveElement(elem));

            $(this.container._target)
                .empty()
                .append(pageElem);

            this.afterChangeAction();
        }
    },
    onInit: function () {
        Router.urlSubject.subscribe(new Observer(() => this.updatePage()));
    }
}));
const PageManager = ServiceManager.getService("page-manager");
