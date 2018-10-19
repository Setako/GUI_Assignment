PortletRender.addPortletHandler("random-book", (portletData) => {
    let $contentElement = $(`
           <div class="d-flex flex-wrap align-items-center justify-content-center">
            </div>
    `);
    let books = DataStorage.data.books.sort((a, b) => {
        return b.releaseDate - a.releaseDate
    });

    let book = books[parseInt(Math.random() * books.length)];
    // language=HTML
    $(`
            <span class="card m-2" style="width: 16rem;">
                    <img class="card-img-top"  src="${book.imageLink}" style="max-height: 16rem; object-fit: cover; width: 100%">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-primary" style="color: white">View details</a>
                    </div>
                </span>
        `).appendTo($contentElement);

    return {
        contentElement: $contentElement
    }
});
PortletRender.addPortletSettingTypes("random-book", {
    "title": {
        display: "Title",
        type: "text",
        required: true
    },
});
