import { html } from 'lit-html';

export const spinner = () => html`
<div class="columns is-centered is-mobile">
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

export function simulatePromise(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

export function getDate(timestamp) {
    let date = timestamp.toDate();

    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    date = dd + '/' + mm + '/' + yyyy;
    return date;
}
