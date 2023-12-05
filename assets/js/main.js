import $ from "./jquery.module.js";
import { initImprovedToc } from "./toc.module.js";
import { initDynamicEndOfPageMargin } from "./dynamic-end-of-page-margin.module.js";
import { initCopyButtons } from "./code-copy-button.module.js";
import { initAutoMenuClose } from "./popup-menu.module.js";
import { initReadingProgressBar } from "./reading-progress.module.js";
import { initSearchBox } from "./searchbox.module.js";

// Prints fontawesome license to the browser's dev tools console.
import "../node_modules/@fortawesome/fontawesome-free/attribution.js";

//
// Change "top links" so that they don't leave an anchor in the URL.
//
const simplifyTopLinks = () => {
    $topLinks = $('a.top-link');
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
$(() => {
    initImprovedToc();
    initDynamicEndOfPageMargin();
    initCopyButtons();
    initAutoMenuClose();
    initReadingProgressBar();
    simplifyTopLinks();
    initSearchBox();
});
