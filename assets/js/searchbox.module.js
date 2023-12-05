export const initSearchBox = () => {
    //
    // Initializes the search box.
    //
    // See: https://pagefind.app/docs/ui/
    //
    // NOTE: To test this:
    //
    // 1. Run "hugo" to compile the site
    // 2. Run "npx pagefind --site "../../../public" (from the assets directory) to compile the search index
    // 3. Copy the directory "public/pagefind" to the site's "static" directory.
    //
    if (typeof PagefindUI !== 'undefined') {
        new PagefindUI({
            element: "#search-box",
            // Don't show multiple results per page.
            showSubResults: false,
            // The number of search results to load at once, before a "Load more" button is shown.
            pageSize: 10,
            // We don't have images. No need to show any.
            showImages: false,
            // Removes any inline styles from the generated HTML elements.
            resetStyles: false
        });
    }
}
