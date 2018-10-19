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
                    return "[[],[{\"type\":\"newest-book\",\"bookLimit\":5}],[]]";
                case USER_TYPE.ALUMNI:
                case USER_TYPE.STUDENT:
                case USER_TYPE.TEACHING_STAFF:
                case USER_TYPE.NON_TEACHING_STAFF:
                    return "[[],[{\"type\":\"newest-book\",\"bookLimit\":5}],[]]";
            }
        }
    }
})();
