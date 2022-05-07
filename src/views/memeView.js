import { html, nothing, render } from 'lit-html';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { until } from 'lit-html/directives/until.js';
import { getDate, spinner } from '../utils/dom';

const cardFooter = createRef();
const likesRef = createRef();
const commentsRef = createRef();

export const memeTemplate = (memePromise, commentsPromise) =>
    html`<div class="columns">${until(memePromise, spinner())} ${until(commentsPromise, spinner())}</div>`;

export const memeCardTemplate = (meme, onDelete, onLike, onUnlike) =>
    html`<div class="column is-half">
        <section class="card meme-card">
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
        </section>
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

export const commentsTemplate = (comments, onSubmit, onDelete, validation) =>
    html`<div class="column is-half">
        <section class="box">
            <h1 class="title is-size-3">Comments</h1>
            <div class="container comments mb-5" ${ref(commentsRef)}>
                ${repeat(
                    comments,
                    (comment) => comment.id,
                    (comment, index) => commentTemplate(comment, onDelete)
                )}
            </div>
            <div class="container comments-form">${commentFormTemplate(onSubmit, validation)}</div>
        </section>
    </div>`;

export const commentFormTemplate = (onSubmit, validation) =>
    html`<form @submit=${onSubmit} class="container">
        <label class="label is-medium" for="comment">Post a comment</label>
        <div class="field is-grouped">
            <div class="control has-icons-left is-expanded">
                <input
                    class="input ${validation ? (validation.comment.isValid ? 'is-success' : 'is-danger') : ''}"
                    type="text"
                    id="comment"
                    name="comment"
                    placeholder="Cool meme broski!"
                />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-comment"></i>
                </span>
            </div>
            <div class="control">
                <button class="button is-primary mr-5" type="submit">Submit comment</button>
            </div>
        </div>
        <p class="help ${validation ? (validation.comment.isValid ? 'is-success' : 'is-danger') : ''}">
            ${validation ? validation.comment.message : nothing}
        </p>
    </form>`;

const commentTemplate = (comment, onDelete) =>
    html`<div class="box">
        <div class="content">
            <p><strong>${comment.author}</strong></p>
            <p>${comment.comment}</p>
        </div>
        <nav class="level is-mobile">
            ${comment.isOwner
                ? html`<div class="level-left">
                      <a class="level-item" href="edit-comment/${comment.id}">
                          <span class="icon is-small">
                              <i class="fas fa-pen-to-square"></i>
                          </span>
                      </a>
                      <a class="level-item" @click=${onDelete}>
                          <span class="icon is-small">
                              <i class="fas fa-xmark"></i>
                          </span>
                      </a>
                  </div>`
                : html``}

            <div class="level-right">
                <p>Last updated: ${getDate(comment.updatedAt)}</p>
            </div>
        </nav>
    </div>`;

const cardFooterItemTemplate = (meme, text, color, icon, eventHandler = null) =>
    html`<a class="card-footer-item has-background-${color} has-text-light" data-id=${meme.id} @click=${eventHandler}>
        <span class="icon">
            <i class=${icon} style="color: #ffffff"></i>
        </span>
        ${text}
    </a>`;
