import { html } from 'lit-html';

export const spinner = () => html`<div class="spinner">
    <span class="spinner-inner-1"></span>
    <span class="spinner-inner-2"></span>
    <span class="spinner-inner-3"></span>
</div>`;

export function updateSelector(element, selector) {
    if (element == undefined || element.parentElement == null) {
        element = document.querySelector(selector);
    }

    return element;
}
