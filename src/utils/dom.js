import { html } from 'lit-html';

export const spinner = () => html` <div class="columns is-centered is-mobile">
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
    return new Promise(function (resolve) {
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

// Mutation observer

let observerContainer;
const observerConfig = { attributes: false, childList: true, characterData: false, subtree: true };

export function isRendered(elementSelector, afterRenderCallback) {
    if (document.querySelector(elementSelector)) {
        return true;
    } else {
        if (afterRenderCallback) {
            observerContainer = updateSelector(observerContainer, 'main');
            let observer = new MutationObserver(observerCallback(elementSelector, afterRenderCallback));
            observer.observe(observerContainer, observerConfig);
        }

        return false;
    }
}

function observerCallback(elementSelector, afterRenderCallback) {
    return function (mutationList, observer) {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                if (observerContainer.querySelector(elementSelector)) {
                    afterRenderCallback();
                    observer.disconnect();
                }
            }
        }
    };
}
