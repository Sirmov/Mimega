import { html } from 'lit-html';

export const spinner = () => html`<div class="columns is-centered is-mobile">
    <div class="column is-narrow">
        <div id="spinner"></div>
    </div>
</div>`;

export function updateSelector(element, selector) {
    if (element == undefined || element.parentElement == null) {
        element = document.querySelector(selector);
    }

    return element;
}
