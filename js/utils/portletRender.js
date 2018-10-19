const PortletRender = (function () {
    let portletHandlers = new Map();
    let portletSettingTypes = new Map();
    return {
        addPortletHandler(type, handler) {
            portletHandlers.set(type, handler);
        },
        addPortletSettingTypes(type, settingTypes) {
            portletSettingTypes.set(type, settingTypes);
        },
        getPortlet(portletData) {
            if (!portletHandlers.has(portletData.type)) return null;
            return (portletHandlers.get(portletData.type)(portletData));
        },
        getPortletSettingTypes(portletType) {
            if (!portletSettingTypes.has(portletType)) return null;
            return portletSettingTypes.get(portletType);
        },
        getDefaultPortletByRule(rule) {
            switch (rule) {
                case null:
                    return "[[{\"type\":\"book-ranking\",\"title\":\"Top 10 book\",\"bookLimit\":10,\"column\":0}],[{\"type\":\"newest-book\",\"title\":\"Newest book suggestion\",\"bookLimit\":6,\"column\":1}],[{\"type\":\"random-book\",\"title\":\"Random Book\",\"column\":0},{\"type\":\"random-book\",\"title\":\"Random Book\",\"column\":2}]]";
                case USER_TYPE.ALUMNI:
                    return "[[{\"type\":\"newest-book\",\"title\":\"Newest book suggestion\",\"bookLimit\":2,\"column\":1}],[{\"type\":\"book-ranking\",\"title\":\"Top 5 book\",\"bookLimit\":5,\"column\":0},{\"type\":\"activity-news\",\"title\":\"Activity\",\"column\":1}],[{\"type\":\"user-area\",\"title\":\"User info\",\"column\":2},{\"type\":\"random-book\",\"title\":\"Random Book\",\"column\":0}]]";
                case USER_TYPE.STUDENT:
                    return "[[{\"type\":\"book-ranking\",\"title\":\"Top 10 book\",\"bookLimit\":10,\"column\":0}],[{\"type\":\"newest-book\",\"title\":\"Newest book suggestion\",\"bookLimit\":6,\"column\":1}],[{\"type\":\"user-area\",\"title\":\"User info\",\"column\":2},{\"type\":\"activity-news\",\"title\":\"\",\"column\":2}]]";
                case USER_TYPE.TEACHING_STAFF:
                    return "[[{\"type\":\"random-book\",\"title\":\"Random Book\",\"column\":0}],[{\"type\":\"newest-book\",\"title\":\"Newest book suggestion\",\"bookLimit\":6,\"column\":1}],[{\"type\":\"user-area\",\"title\":\"User info\",\"column\":2},{\"type\":\"book-ranking\",\"title\":\"Top 10 book\",\"bookLimit\":10,\"column\":0}]]";
                case USER_TYPE.NON_TEACHING_STAFF:
                    return "[[{\"type\":\"newest-book\",\"title\":\"Newest book suggestion\",\"bookLimit\":2,\"column\":1}],[{\"type\":\"book-ranking\",\"title\":\"Top 3 book\",\"bookLimit\":3,\"column\":0}],[{\"type\":\"user-area\",\"title\":\"User info\",\"column\":2},{\"type\":\"random-book\",\"title\":\"Random Book\",\"column\":0}]]";
            }
        }
    }
})();
