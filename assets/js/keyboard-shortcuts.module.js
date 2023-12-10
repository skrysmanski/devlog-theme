import $ from "./jquery.module.js";

export const registerGlobalKeyboardShortcut = (key, eventHandler, options = null) => {
    const requireCtrl = options?.requireCtrl === true;
    const requireShift = options?.requireShift === true;
    const requireMeta = options?.requireMeta === true;

    const keyCodeToCheck = Number.isInteger(key) && key;

    $(document).on('keyup', (event) => {
        if (event.isComposing || event.keyCode === 229) {
            // Ignore CJKT composing.
            // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
            return;
        }

        if ((keyCodeToCheck && event.which === keyCodeToCheck) || (event.key === key)) {
            if (   event.ctrlKey === requireCtrl
                && event.shiftKey === requireShift
                && event.metaKey === requireMeta
                && event.target.localName != 'input') {
                eventHandler();
                event.preventDefault();
            }
        }
    });
}
