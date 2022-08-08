import { html, render, nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { until } from 'lit-html/directives/until.js';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { getDate, spinner } from '../utils/dom';

// Element references
const memesContainer = createRef();

export const memesTemplate = (memesPromise) => html`${until(memesPromise, spinner())}`;

export const memesContainerTemplate = () =>
    html`<div id="meme-container" class="columns is-vcentered is-multiline is-variable is-6" ${ref(memesContainer)}></div>`;

export const memeCardsTemplate = (memes) =>
    html`${memes.length > 0
        ? html`${repeat(
              memes,
              (meme) => meme.id,
              (meme, index) => memeCardTemplate(meme)
          )}`
        : html`<h1>No memes sorry :(</h1>`}`;

const memeCardTemplate = (meme) =>
    html`<div class="column is-one-third-widescreen is-half-tablet">
        <a href="/memes/${meme.id}">
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
                            <span class="content mr-3">${meme.likes}</span>
                            <time>Last updated: ${getDate(meme.updatedAt)}</time>
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </div>`;

export function appendMemes(memes) {
    render(memeCardsTemplate(memes), memesContainer.value);
}
