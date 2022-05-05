import { html, render, nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { until } from 'lit-html/directives/until.js';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { spinner } from '../utils/dom';

const memesContainer = createRef();

export const memesTemplate = (memesPromise) => html`${until(memesPromise, spinner())}`;

export const memesGridTemplate = (memes, onDelete, onLike, onUnlike) =>
    html`<div class="columns is-vcentered is-multiline is-variable is-6" ${ref(memesContainer)}>
        ${memeCardsTemplate(memes, onDelete, onLike, onUnlike)}
    </div>`;

export const memeCardsTemplate = (memes, onDelete, onLike, onUnlike) =>
    html`${memes.length > 0
        ? html`${repeat(
              memes,
              (meme) => meme.id,
              (meme, index) => memeCardTemplate(meme, onDelete, onLike, onUnlike)
          )}
</div>`
        : html`<h1>No memes sorry :(</h1>`}`;

const memeCardTemplate = (meme, onDelete, onLike, onUnlike) =>
    html`<div class="column is-one-third-widescreen is-half-tablet">
        <div class="card meme-card">
            <header class="card-header">
                <h1 class="card-header-title title is-size-5-desktop is-size-6-touch">${meme.title}</h1>
            </header>
            <div class="card-image">
                <figure class="image is-5by4">
                    <img src=${meme.imageUrl} alt="Meme image" />
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <p class="title is-6">${meme.author}</p>
                    <time>Last updated: ${getDate(meme.updatedAt)}</time>
                </div>
            </div>
            <footer class="card-footer">
                ${meme.isOwner
                    ? html`${cardFooterItemTemplate(
                          meme,
                          'Edit',
                          'warning',
                          'fa-solid fa-pen-to-square',
                          null,
                          `/edit-meme/${meme.id}`
                      )}
                      ${cardFooterItemTemplate(meme, 'Delete', 'danger', 'fa-solid fa-trash', onDelete)}`
                    : meme.isLiked
                    ? html`${cardFooterItemTemplate(meme, 'Unlike', 'danger', 'fa-solid fa-heart', onUnlike)}`
                    : html`${cardFooterItemTemplate(meme, 'Like', 'danger', 'fa-solid fa-heart', onLike)}`}
                ${cardFooterItemTemplate(meme, 'Comment', 'info', 'fa-solid fa-message')}
            </footer>
        </div>
    </div>`;

const cardFooterItemTemplate = (meme, text, color, icon, eventHandler = null, link = 'javascript:void(0)') =>
    html`<a
        href=${link}
        class="card-footer-item has-background-${color} has-text-light"
        data-id=${meme.id}
        @click=${eventHandler}
    >
        <span class="icon">
            <i class=${icon}></i>
        </span>
        ${text}
    </a>`;

export function appendMemes(memes) {
    render(memes, memesContainer.value);
}

function getDate(timestamp) {
    let date = timestamp.toDate();

    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    date = dd + '/' + mm + '/' + yyyy;
    return date;
}
