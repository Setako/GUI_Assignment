const PageManager = (function () {
    const pageMap = new Map()

    let $container = null;

    const setContainer = (containerElement) => {
        $container = $(containerElement)
    }

    const addPage = (pageId, pageFactory) => {
        pageMap.set(pageId, pageFactory)
    }

    let defaultPageId;
    const setDefaultPage = (pageId) => {
        defaultPageId = pageId;
    }

    let errorPageId;
    const setErrorPage = (pageId) => {
        errorPageId = pageId
    }

    let currentUrl = null
    const updatePage = () => {
        if (currentUrl === location.href) return
        currentUrl = location.href

        let pageId = new URL(location.href).searchParams.get('page')
        pageId = pageId ? pageId : defaultPageId;
        pageId = pageMap.has(pageId) ? pageId : errorPageId

        if (!pageId) throw '404 (404 Error Page) Not Found'

        const pageElem = pageMap.get(pageId)()

        $container.empty()
        $container.append(pageElem)
    }

    Router.urlSubject.subscribe(new Observer(() => updatePage()))
    return {
        addPage: addPage,
        setContainer: setContainer,
        setDefaultPage: setDefaultPage,
        setErrorPage: setErrorPage
    }

})();

$.fn.extend({
    PageManager: PageManager
})