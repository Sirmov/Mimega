import { html, nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { until } from 'lit-html/directives/until.js';

export const memesTemplate = (memesPromise) =>
    html`<ul class="container">
        ${until(memesPromise, nothing)}
    </ul>`;

export const memeCardsTemplate = (memes) =>
    html`${memes.length > 0
        ? html`${repeat(
              memes,
              (meme) => meme.id,
              (meme, index) => memeCardTemplate(meme)
          )}`
        : html`<h1>No memes sorry :(</h1>`}`;

const memeCardTemplate = (meme) =>
    html`<div class="card meme-card">
        <header class="card-header">
            <h1 class="card-header-title title">${meme.title}</h1>
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
                ? html`<a href="/edit-meme/${meme.id}" class="card-footer-item">Edit</a> <a href="javascript:void(0)" class="card-footer-item" @click=>Delete</a>`
                : nothing}
            <a href="#" class="card-footer-item">Save</a>
        </footer>
    </div>`;
