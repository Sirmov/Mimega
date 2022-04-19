import { html, nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { until } from 'lit-html/directives/until.js';
import { spinner } from '../utils/dom';

export const memesTemplate = (memesPromise) => html`${until(memesPromise, spinner())}`;

export const memeCardsTemplate = (memes, onDelete) =>
    html`<div class="columns is-multiline is-variable is-6">
        ${memes.length > 0
            ? html`${repeat(
                memes,
                (meme) => meme.id,
                (meme, index) => memeCardTemplate(meme, onDelete)
            )}
        </div>`
            : html`<h1>No memes sorry :(</h1>`}`;

const memeCardTemplate = (meme, onDelete) =>
    html`<div class="column is-half">
        <div class="card meme-card">
            <header class="card-header">
                <h1 class="card-header-title title is-size-5-desktop is-size-6-mobile">${meme.title}</h1>
            </header>
            <div class="card-image">
                <figure class="image is-5by4">
                    <img src=${meme.imageUrl} alt="Meme image" />
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <p class="title is-6">${meme.author}</p>
                    <time>${meme.updatedAt.toDate().toLocaleDateString()}</time>
                </div>
            </div>
            <footer class="card-footer">
                ${meme.isOwner
                    ? html`${cardFooterItemTemplate(
                              'Edit',
                              'warning',
                              'fa-solid fa-pen-to-square',
                              `/edit-meme/${meme.id}`
                          )}

                          <a
                              href="javascript:void(0)"
                              class="card-footer-item has-background-danger has-text-light"
                              @click=${onDelete}
                              data-id=${meme.id}
                          >
                              <span class="icon">
                                  <i class="fa-solid fa-trash"></i>
                              </span>
                              Delete
                          </a>`
                    : cardFooterItemTemplate('Like', 'danger', 'fa-solid fa-heart')}
                ${cardFooterItemTemplate('Comment', 'info', 'fa-solid fa-message')}
            </footer>
        </div>
    </div>`;

const cardFooterItemTemplate = (text, color, icon, link = 'javascript:void(0)') =>
    html`<a href=${link} class="card-footer-item has-background-${color} has-text-light">
        <span class="icon">
            <i class=${icon}></i>
        </span>
        ${text}
    </a>`;
