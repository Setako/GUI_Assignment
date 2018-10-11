const PageManager = (function () {
    const pageMap = new Map()

    let $container;
    const getContainer = () => $container
    const setContainer = (containerElement) => {
        $container = $(containerElement)
    }

    const addPage = (pageId, pageFactory) => {
        pageMap.set(pageId, pageFactory)
        return PageManager
    }

    let defaultPageId;
    const setDefaultPage = (pageId) => {
        defaultPageId = pageId
        return PageManager
    }

    let errorPageId;
    const setErrorPage = (pageId) => {
        errorPageId = pageId
        return PageManager
    }

    const getParamByURL = (url, key) => new URL(url).searchParams.get(key)
    const getPageId = () => getParamByURL(location.href, 'page')

    let beforeChangeAction = () => { }
    const setBeforeChangeAction = fn => {
        beforeChangeAction = fn
        return PageManager
    }

    let afterChangeAction = () => { }
    const setAfterChangeAction = fn => {
        afterChangeAction = fn
        return PageManager
    }

    let currentPageId;
    const updatePage = () => {

        let pageId = getPageId()
        pageId = pageId ? pageId : defaultPageId;
        pageId = pageMap.has(pageId) ? pageId : errorPageId

        if (!pageId) throw '404 (404 Error Page) Not Found'

        console.log(pageId, currentPageId);

        if (pageId === currentPageId) return
        currentPageId = pageId

        beforeChangeAction()

        const pageElem = pageMap.get(pageId)()

        $container.children().each((index, elem) => safeRemoveElement(elem))
        $container.append(pageElem)

        afterChangeAction()
    }

    Router.urlSubject.subscribe(new Observer(() => updatePage()))
    return {
        addPage: addPage,
        setContainer: setContainer,
        getContainer: getContainer,
        setDefaultPage: setDefaultPage,
        setErrorPage: setErrorPage,
        setBeforeChangeAction: setBeforeChangeAction,
        setAfterChangeAction: setAfterChangeAction
    }
})();