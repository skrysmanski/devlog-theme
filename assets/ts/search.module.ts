import $ from "./jquery.module.js";
import { showBackdrop, hideBackdrop } from "./backdrop.module.js";
import { registerGlobalKeyboardShortcut } from "./keyboard-shortcuts.module.js";

declare global {
    interface PagefindUIOptions {
        element?: string;
        showSubResults: boolean;
        pageSize: number;
        showImages: boolean;
        resetStyles: boolean;
    }

    class PagefindUI {
        constructor(options?: PagefindUIOptions);
    }
}

function hideSearchOverlay() {
    $('#search-overlay-container').removeClass('visible');
    hideBackdrop();
}

function showSearchOverlay() {
    $('#search-overlay-container').addClass('visible');
    $('.pagefind-ui__search-input').trigger('focus');
    showBackdrop('page', hideSearchOverlay);
}

export function initSearch() {
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
        //
        // Create HTML for pagefind
        //
        new PagefindUI({
            element: "#search-overlay",
            // Don't show multiple results per page.
            showSubResults: false,
            // The number of search results to load at once, before a "Load more" button is shown.
            pageSize: 10,
            // We don't have images. No need to show any.
            showImages: false,
            // Removes any inline styles from the generated HTML elements.
            resetStyles: false
        });

        //
        // Improve "enter" key on virtual keyboards on iOS.
        //
        const $searchBox = $('input.pagefind-ui__search-input');
        // Replace "search" with "done" as searching is done automatically (and not on hitting return).
        $searchBox.attr('enterkeyhint', 'done');
        // Close the virtual keyboard when hitting the "Done" button (unfortunately, this doesn't happen automatically).
        $searchBox.on('keyup', (e) => {
            if (e.key === 'Enter') {
                e.target.blur();
                e.preventDefault();
            }
        });

        //
        // Wire up the search button in the header
        //
        $('#open-search-dialog-button').on('click', showSearchOverlay);

        //
        // Pressing the "." key opens the search UI
        //
        registerGlobalKeyboardShortcut('.', showSearchOverlay);
    }
}
