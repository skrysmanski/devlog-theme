import $ from "./jquery.module.js";

const getBackdropElement = () => {
    return $('#page-backdrop');
}

export const showBackdrop = (backdropLayer = 'page', backdropClickHandler = undefined) => {
    $backdropElement = getBackdropElement();
    $backdropElement.addClass('visible');
    $backdropElement.attr('data-backdrop-layer', backdropLayer);
    $backdropElement.off('click');
    if (backdropClickHandler != undefined) {
        $backdropElement.on('click', backdropClickHandler);
    }
}

export const toggleBackdrop = (backdropLayer = 'page', backdropClickHandler = undefined) => {
    $backdropElement = getBackdropElement();
    if ($backdropElement.hasClass('visible')) {
        hideBackdrop();
    }
    else {
        showBackdrop(backdropLayer, backdropClickHandler);
    }
}

export const hideBackdrop = () => {
    $backdropElement = getBackdropElement();
    $backdropElement.removeClass('visible');
    $backdropElement.off('click');
}
