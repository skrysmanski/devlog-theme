import $ from "./jquery.module.js";

let readingProgressContent = null;
let readingProgressContentYPosition = 0;
let visibleHeight = 0;
let progressElement = null;

const setReadingProgress = () => {
    const contentHeight = readingProgressContent.height();
    const contentScrollOffset = readingProgressContent[0].getBoundingClientRect().top - readingProgressContentYPosition;

    let progress;
    if (contentHeight <= visibleHeight) {
        // Content is smaller than the window. Thus, there can't be any progress.
        progress = 100;
    }
    else if (contentScrollOffset > 0) {
        // NOTE: ".top" becomes negative if the user scrolls down
        progress = 0;
    }
    else {
        progress = 100 * (-contentScrollOffset) / (contentHeight - visibleHeight);

        // Make sure we don't create a progress bar with width above 100% (or we'd
        // get a horizontal scrollbar).
        if (progress > 100) {
            progress = 100;
        }
        else if (progress < 0) {
            progress = 0;
        }
    }

    progressElement.css("width", progress + "%");
}

export const initReadingProgressBar = () => {
    // The element we observe for scrolling.
    readingProgressContent = $('main.page.with-reading-progress').closest('.main-container');

    if (readingProgressContent.length > 0) {
        progressElement = $('.reading-progress-bar > .progress');
        readingProgressContentYPosition = readingProgressContent.position().top;

        const $mainHeader = $('#main-header');
        const $mainFooter = $('#main-footer');
        visibleHeight = window.innerHeight - $mainHeader.outerHeight() - $mainFooter.outerHeight();

        setReadingProgress();

        $(window).on('scroll', setReadingProgress);
        $(window).on('resize', () => {
            visibleHeight = window.innerHeight - $mainHeader.outerHeight() - $mainFooter.outerHeight();
        });
    }
};
