import { html, nothing, render } from 'lit-html';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { until } from 'lit-html/directives/until.js';
import { getDate, spinner } from '../utils/dom';

const cardFooter = createRef();
const likesRef = createRef();

export const memeTemplate = (memePromise) => html`<div class="columns">
    ${until(memePromise, spinner())}
    <div class="column is-half ">
        <div class="box">
            <h1 class="title is-size-3">Comments</h1>
            <p class="content is-size-5">Under development. 👾</p>
        </div>
    </div>
</div>`;

export const memeCardTemplate = (meme, onDelete, onLike, onUnlike) =>
    html` <div class="column is-half">
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
                    <p>
                        <span class="icon">
                            <i class="fa-solid fa-heart"></i>
                        </span>
                        <span ${ref(likesRef)} class="content mr-3">${meme.likes}</span>
                        <time>Last updated: ${getDate(meme.updatedAt)}</time>
                    </p>
                </div>
            </div>
            <footer ${ref(cardFooter)} class="card-footer">
                ${memeFooterTemplate(meme, onDelete, onLike, onUnlike)}
            </footer>
        </div>
    </div>`;

export function updateMemeOnLike(memePromise, isLike) {
    let likes = Number(likesRef.value.textContent);

    if (isLike) {
        likesRef.value.textContent = ++likes;
    } else {
        likesRef.value.textContent = --likes;
    }

    render(html`${until(memePromise, cardFooterItemTemplate({}, '', 'danger'))}`, cardFooter.value);
}

export const memeFooterTemplate = (meme, onDelete, onLike, onUnlike) =>
    html` ${meme.isOwner
        ? html`${cardFooterItemTemplate(
              meme,
              'Edit',
              'warning',
              'fa-solid fa-pen-to-square',
              null,
              `/edit-meme/${meme.id}`
          )}
          ${cardFooterItemTemplate(meme, 'Delete', 'danger', 'fa-solid fa-trash', onDelete)}`
        : meme.isLogged 
        ? meme.isLiked
        ? html`${cardFooterItemTemplate(meme, 'Unlike', 'danger', 'fa-solid fa-heart', onUnlike)}`
        : html`${cardFooterItemTemplate(meme, 'Like', 'danger', 'fa-solid fa-heart', onLike)}`
        : html`${cardFooterItemTemplate(meme, 'You have to be logged in to like memes.', 'link')}`}`;

const cardFooterItemTemplate = (meme, text, color, icon, eventHandler = null, link = 'javascript:void(0)') =>
    html`<a
        href=${link}
        class="card-footer-item has-background-${color} has-text-light"
        data-id=${meme.id}
        @click=${eventHandler}
    >
        <span class="icon">
            <i class=${icon} style="color: #ffffff"></i>
        </span>
        ${text}
    </a>`;
