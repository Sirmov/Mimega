import { html, nothing, render } from 'lit-html';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { until } from 'lit-html/directives/until.js';
import { getDate, spinner } from '../utils/dom';

// Element references

const cardFooter = createRef();
const likesRef = createRef();
const commentsRef = createRef();
const commentFormMessageRef = createRef();

// Main view template

export const memeTemplate = (memePromise, commentsPromise) =>
    html`<div class="columns">${until(memePromise, spinner())} ${until(commentsPromise, spinner())}</div>`;

// Meme templates and logic

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

const cardFooterItemTemplate = (meme, text, color, icon, eventHandler = null, link = nothing) =>
    html`<a
        class="card-footer-item has-background-${color} has-text-light"
        href=${link}
        data-id=${meme.id}
        @click=${eventHandler}
    >
        <span class="icon">
            <i class=${icon} style="color: #ffffff"></i>
        </span>
        ${text}
    </a>`;

export function updateMemeOnLike(memePromise, isLike) {
    let likes = Number(likesRef.value.textContent);

    if (isLike) {
        likesRef.value.textContent = ++likes;
    } else {
        likesRef.value.textContent = --likes;
    }

    render(html`${until(memePromise, cardFooterItemTemplate({}, '', 'danger'))}`, cardFooter.value);
}

// Comments templates and logic

export const commentsTemplate = (comments, onSubmit, onDelete) =>
    html`<div class="column is-half">
        <section class="box">
            <h1 class="title is-size-3">Comments</h1>
            <div class="container comments mb-5" ${ref(commentsRef)}>${commentCardsTemplate(comments, onDelete)}</div>
            <div class="container comments-form">${commentFormTemplate(onSubmit)}</div>
        </section>
    </div>`;

export const commentCardsTemplate = (comments, onDelete) =>
    html`${comments.length > 0
        ? repeat(
              comments,
              (comment) => comment.id,
              (comment, index) => commentTemplate(comment, onDelete)
          )
        : html`<p class="is-size-4">Be the first one to comment ;)</p>`}`;

export const commentFormTemplate = (onSubmit) =>
    html`<form @submit=${onSubmit} class="container">
        <label class="label is-medium" for="comment">Post a comment</label>
        <div class="field is-grouped">
            <div class="control has-icons-left is-expanded">
                <input class="input" type="text" id="comment" name="comment" placeholder="Cool meme broski!" />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-comment"></i>
                </span>
            </div>
            <div class="control is-hidden-touch">
                <button class="button is-primary mr-5" type="submit">Submit comment</button>
            </div>
        </div>
        <div class="field is-hidden-desktop">
            <div class="control">
                <button class="button is-primary mr-5" type="submit">Submit comment</button>
            </div>
        </div>
        <p class="help" ${ref(commentFormMessageRef)}></p>
    </form>`;

const commentTemplate = (comment, onDelete) =>
    html`<div class="box">
        <div class="level is-mobile mb-1">
            <div class="level-left">
                <p><strong>${comment.author}</strong></p>
            </div>
            <div class="level-right ">
                ${comment.isOwner
                    ? html`<div class="level-left">
                          <a class="level-item" @click=${onDelete} data-id=${comment.id}>
                              <span class="icon is-small">
                                  <i class="fas fa-xmark"></i>
                              </span>
                          </a>
                      </div>`
                    : html``}
            </div>
        </div>
        <p class="mb-1">${comment.comment}</p>
        <p>Posted: ${getDate(comment.updatedAt)}</p>
    </div>`;

export function reRenderComments(comments, onDelete) {
    render(commentCardsTemplate(comments, onDelete), commentsRef.value);
}

export function reRenderCommentFormMessage(message) {
    commentFormMessageRef.value.classList.add('is-danger');
    commentFormMessageRef.value.textContent = message;
}
