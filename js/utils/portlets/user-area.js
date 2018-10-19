PortletRender.addPortletHandler("user-area", (portletData) => {
    let bookLimit = portletData.bookLimit;
    let userService = ServiceManager.getService("user-service");
    // language=HTML
    let $contentElement = $(
        `
        <table style="width: 100%">
        <tr>
        <th>Username</th>
        <td>${userService.loggedInUser.username}</td>
        </tr>
        <tr>
        <th>Name</th>
        <td>${userService.loggedInUser.name}</td>
        </tr>
        <tr>
        <th>Role</th>
        <td>${USER_TYPE_DISPLAY[userService.loggedInUser.type]}</td>
        </tr>
        <tr>
        <th>Email</th>
        <td>${userService.loggedInUser.email}</td>
        </tr>
        </table>
    `);
    return {
        contentElement: $contentElement
    }
});
PortletRender.addPortletSettingTypes("user-area", {
    "title": {
        display: "Title",
        type: "text",
        required: true
    }
});
