import $ from "./jquery.module.js";
import { initImprovedToc } from "./toc.module.js";
import { initDynamicEndOfPageMargin } from "./dynamic-end-of-page-margin.module.js";
import { initCopyButtons } from "./code-copy-button.module.js";
import { initAutoMenuClose } from "./popup-menu.module.js";
import { initReadingProgressBar } from "./reading-progress.module.js";
import { initSearch } from "./search.module.js";
import { renderDates } from "./date-time-utils.module.js";

// Prints fontawesome license to the browser's dev tools console.
import "../node_modules/@fortawesome/fontawesome-free/attribution.js";

//
// Change "top links" so that they don't leave an anchor in the URL.
//
function simplifyTopLinks() {
    const $topLinks = $('a.top-link');
    if ($topLinks.length > 0) {
        $topLinks.attr('href', '');
        $topLinks.on('click', () => {
            history.pushState("", "", window.location.pathname + window.location.search); // remove anchor from location bar
            $("#page-title")[0].scrollIntoView();
            return false;
        });
    }
}

// Execute when DOM is loaded. https://api.jquery.com/ready/
$(function () {
    initImprovedToc();
    initDynamicEndOfPageMargin();
    initCopyButtons();
    initAutoMenuClose();
    initReadingProgressBar();
    simplifyTopLinks();
    initSearch();
});

// Export renderDates() so that it can be called from a script tag.
(<any>window).renderDates = renderDates;
