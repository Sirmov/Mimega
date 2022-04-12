import { html } from 'lit-html';

export const layoutTemplate = () =>
    html`<header class="box"></header>
        <main class="section"></main>
        <footer class="footer"></footer>
        <div class="modal">
        <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <h1 id="modal-title" class="title"></h1>
                    <p id="modal-message"></p>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
        </div>`;
