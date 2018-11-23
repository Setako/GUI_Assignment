PortletRender.addPortletHandler("book-ranking", (portletData) => {
    let bookLimit = portletData.bookLimit;
    // language=HTML
    let $contentElement = $(`
        <ul class="list-group">
        </ul>
    `);
    let books = DataStorage.data.books.sort((a, b) => {
        return b.releaseDate - a.releaseDate
    });
    books = books.slice(0, Math.min(books.length, bookLimit));

    let book = books[parseInt(Math.random() * books.length)];
    // language=HTML
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        $(`
            <li class="list-group-item d-flex list-group-item-action align-items-center" style="cursor: pointer"
            onclick="ServiceManager.getService('book-service').showBookByResid(${book.resid})">
                <span class="badge badge-primary badge-pill mr-2">${i + 1}</span>
            ${book.title}
            </li>
        `).appendTo($contentElement);
    }

    return {
        title: "Random book suggestion",
        // language=HTML
        contentElement: $contentElement
    }
});
PortletRender.addPortletSettingTypes("book-ranking", {
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
