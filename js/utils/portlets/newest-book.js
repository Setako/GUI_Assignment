PortletRender.addPortletHandler("newest-book", (portletData) => {
    let bookLimit = portletData.bookLimit;
    let $contentElement = $(`
           <div class="d-flex flex-wrap align-items-center justify-content-center">
            </div>
    `);
    let books = DataStorage.data.books.sort((a, b) => {
        return b.releaseDate - a.releaseDate
    });
    books = books.slice(0, Math.min(books.length, bookLimit));

    books.forEach(book => {
        // language=HTML
        $(`
            <span class="card m-2" style="width: 16rem;">
                    <img class="card-img-top"  src="${book.imageLink}" style="max-height: 16rem; object-fit: cover; width: 100%">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-primary" style="color: white" onclick="ServiceManager.getService('book-service').showBookByResid(${book.resid})">View details</a>
                    </div>
                </span>
        `).appendTo($contentElement);
    });

    return {
        contentElement: $contentElement
    }
});
PortletRender.addPortletSettingTypes("newest-book", {
    "title": {
        display: "Title",
        type: "text",
        required: true
    },
    "bookLimit": {
        display: "Limit of book number",
        type: "number",
        min: 1,
        max: 10,
        required: true
    }
});