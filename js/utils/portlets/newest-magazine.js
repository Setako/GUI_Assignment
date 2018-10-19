PortletRender.addPortletHandler("newest-magazine", (portletData) => {
    let bookLimit = portletData.bookLimit;
    let $contentElement = $(`
           <div class="d-flex flex-wrap align-items-center justify-content-center">
            </div>
    `);
    let magazines = DataStorage.data.magazines.sort((a, b) => {
        return b.releaseDate - a.releaseDate
    });
    magazines = magazines.slice(0, Math.min(magazines.length, bookLimit));

    magazines.forEach(magazine => {
        // language=HTML
        $(`
            <span class="card m-2" style="width: 16rem;">
                    <img class="card-img-top"  src="${magazine.imageLink}" style="max-height: 16rem; object-fit: cover; width: 100%">
                    <div class="card-body">
                        <h5 class="card-title">${magazine.title}</h5>
                        <p class="card-text">${magazine.author}</p>
                        <a href="#" class="btn btn-primary" style="color: white">View details</a>
                    </div>
                </span>
        `).appendTo($contentElement);
    });

    return {
        contentElement: $contentElement
    }
});
PortletRender.addPortletSettingTypes("newest-magazine", {
    "title": {
        display: "Title",
        type: "text",
        required: true
    },
    "bookLimit": {
        display: "Limit of magazine number",
        type: "number",
        min: 1,
        max: 10,
        required: true
    }
});