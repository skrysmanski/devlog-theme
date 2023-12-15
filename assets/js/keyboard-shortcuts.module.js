import $ from "./jquery.module.js";

export const registerGlobalKeyboardShortcut = (key, eventHandler, options = null) => {
    const requireCtrl = options?.requireCtrl === true;
    const requireShift = options?.requireShift === true;
    const requireMeta = options?.requireMeta === true;

    $(document).on('keyup', (event) => {
        if (event.isComposing) {
            // Ignore CJKT composing.
            // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
            return;
        }

        if (event.key !== key) {
            return;
        }

        if (event.ctrlKey !== requireCtrl || event.shiftKey !== requireShift || event.metaKey !== requireMeta) {
            // Modifier keys don't match.
            return;
        }

        if (event.target.localName?.toLocaleLowerCase() === 'input') {
            // User is typing in an input field. Don't treat these as global shortcuts.
            return;
        }

        eventHandler();
        event.preventDefault();
    });
}
