PortletRender.addPortletHandler("activity-news", (portletData) => {
    let bookLimit = portletData.bookLimit;
    let userService = ServiceManager.getService("user-service");
    // language=HTML
    let $contentElement = $(
            `
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Reading Activity</h5>
                            <small>start in 2 days</small>
                        </div>
                        <p class="mb-1">Reading the book with other student together. Reading the book with other
                            student together. Reading the book with other student together.</p>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Video sharing</h5>
                            <small>start in 2 days</small>
                        </div>
                        <p class="mb-1">Enjoy in watching other's video and sharing your funny video</p>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Be a writer</h5>
                            <small class="text-muted">comming soon</small>
                        </div>
                        <p class="mb-1">Do you dream to become a writer? Just do it!</p>
                    </a>
                </div>
        `);

    console.log($contentElement)
    return {
        contentElement: $contentElement
    }
});
PortletRender.addPortletSettingTypes("activity-news", {
    "title": {
        display: "Title",
        type: "text",
        required: true
    }
});
