const PageManager = (function () {
    const pageMap = new Map();

    let $container;
    const getContainer = () => $container[0];
    const setContainer = (containerElement) => {
        $container = $(containerElement)
    };

    const addPage = (pageId, pageFactory) => {
        pageMap.set(pageId, pageFactory);
        return PageManager
    };

    const addComponentAsPage = (pageId, componentId = pageId) => {
        addPage(pageId, () => componentManager.pageFactory(componentId));
        return PageManager
    };

    let defaultPageId;
    const setDefaultPage = (pageId) => {
        defaultPageId = pageId;
        return PageManager
    };

    let errorPageId;
    const setErrorPage = (pageId) => {
        errorPageId = pageId;
        return PageManager
    };

    const getParamByURL = (url, key) => new URL(url).searchParams.get(key);
    const getPageId = () => getParamByURL(location.href, 'page');

    let beforeChangeAction = () => {
    };
    const setBeforeChangeAction = (fn) => {
        beforeChangeAction = fn;
        return PageManager
    };

    let afterChangeAction = () => {
    };
    const setAfterChangeAction = (fn) => {
        afterChangeAction = fn;
        return PageManager
    };

    let currentPageId;
    const updatePage = () => {

        let pageId = getPageId();
        pageId = pageId ? pageId : defaultPageId;
        pageId = pageMap.has(pageId) ? pageId : errorPageId;

        if (!pageId) throw '404 (404 Error Page) Not Found';

        if (pageId === currentPageId) return;
        currentPageId = pageId;

        beforeChangeAction();

        const pageElem = pageMap.get(pageId)();

        $container
            .children()
            .each((index, elem) => safeRemoveElement(elem))

        $container
            .empty()
            .append(pageElem);

        afterChangeAction();
    };

    Router.urlSubject.subscribe(new Observer(() => updatePage()));
    return {
        addPage: addPage,
        addComponentAsPage: addComponentAsPage,
        setContainer: setContainer,
        getContainer: getContainer,
        setDefaultPage: setDefaultPage,
        setErrorPage: setErrorPage,
        setBeforeChangeAction: setBeforeChangeAction,
        setAfterChangeAction: setAfterChangeAction
    }
})();