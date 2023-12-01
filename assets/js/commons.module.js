import $ from "./jquery.module.js";

export const getContentRoot = () => {
    return $('main.page #page-content');
}
