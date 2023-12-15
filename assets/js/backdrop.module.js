import $ from "./jquery.module.js";
import { registerGlobalKeyboardShortcut } from "./keyboard-shortcuts.module.js";

let backdropInitialized = false;
let currentBackdropCloseHandler = null;

const getBackdropElement = () => {
    return $('#page-backdrop');
}

const onCloseBackdropEvent = () => {
    if (currentBackdropCloseHandler != null) {
        currentBackdropCloseHandler();
    }
}

export const showBackdrop = (backdropLayer = 'page', backdropCloseHandler = null) => {
    $backdropElement = getBackdropElement();
    $backdropElement.addClass('visible');
    $backdropElement.attr('data-backdrop-layer', backdropLayer);

    if (!backdropInitialized) {
        $backdropElement.on('click', onCloseBackdropEvent);
        registerGlobalKeyboardShortcut('Escape', onCloseBackdropEvent); // register escape key
        backdropInitialized = true;
    }

    currentBackdropCloseHandler = backdropCloseHandler;
}

export const toggleBackdrop = (backdropLayer = 'page', backdropCloseHandler = null) => {
    $backdropElement = getBackdropElement();
    if ($backdropElement.hasClass('visible')) {
        hideBackdrop();
    }
    else {
        showBackdrop(backdropLayer, backdropCloseHandler);
    }
}

export const hideBackdrop = () => {
    $backdropElement = getBackdropElement();
    $backdropElement.removeClass('visible');
    currentBackdropCloseHandler = null;
}
