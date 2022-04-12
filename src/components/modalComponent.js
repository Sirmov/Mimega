import { updateSelector } from '../utils/dom';

// Modal selectors

let modalContainer = {};
let modalTitle = {};
let modalMessage = {};
const modalContainerSelector = 'div.modal';
const modalMessageSelector = '#modal-message';
const modalTitleSelector = '#modal-title';

function updateModalSelectors() {
    modalContainer = updateSelector(modalContainer, modalContainerSelector);
    modalTitle = updateSelector(modalTitle, modalTitleSelector);
    modalMessage = updateSelector(modalMessage, modalMessageSelector);
}

// Select modal children and add a click event

const modalChildren =
    document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') ||
    [];
modalChildren.forEach((element) => {
    element.addEventListener('click', closeModal);
});

export function openModal(title, message) {
    updateModalSelectors();
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalContainer.classList.add('is-active');
    document.addEventListener('keydown', onKeyDown);
}

function closeModal() {
    updateModalSelectors();
    modalContainer.classList.remove('is-active');
    document.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(event) {
    const e = event || window.event;

    if (e.keyCode === 27) {
        closeModal();
    }
}
