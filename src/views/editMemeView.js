import { html, nothing } from 'lit-html';
import { until } from 'lit-html/directives/until.js';
import { cancelAction } from '../actions/cancelAction';
import { spinner } from '../utils/dom';

export const editMemeTemplate = (formPromise) => html`${until(formPromise, spinner())}`;

export const editFormTemplate = (editSubmit, meme, validation) =>
    html`<div class="columns is-centered">
        <div class="column is-8">
            <form @submit=${editSubmit} class="container">
                <h1 class="title is-2 mb-6">Edit meme</h1>
                <div class="field">
                    <label class="label is-medium" for="title">Title</label>
                    <div class="control has-icons-left">
                        <input
                            class="input ${validation ? (validation.title.isValid ? 'is-success' : 'is-danger') : ''}"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Oh… The classic meme"
                            .value=${meme.title}
                        />
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                    </div>
                    <p class="help ${validation ? (validation.title.isValid ? 'is-success' : 'is-danger') : ''}">
                        ${validation ? validation.title.message : nothing}
                    </p>
                </div>

                <div class="field">
                    <label class="label is-medium" for="imageUrl">Image url</label>
                    <div class="control has-icons-left">
                        <input
                            class="input ${validation
                                ? validation.imageUrl.isValid
                                    ? 'is-success'
                                    : 'is-danger'
                                : ''}"
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="www.memeges.com/coolmeme.png"
                            .value=${meme.imageUrl}
                        />
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-key"></i>
                        </span>
                    </div>
                    <p class="help ${validation ? (validation.imageUrl.isValid ? 'is-success' : 'is-danger') : ''}">
                        ${validation ? validation.imageUrl.message : nothing}
                    </p>
                </div>

                <div class="field">
                    <label class="label is-medium" for="author">Author</label>
                    <div class="control has-icons-left">
                        <input
                            class="input ${validation ? (validation.author.isValid ? 'is-success' : 'is-danger') : ''}"
                            type="text"
                            id="author"
                            name="author"
                            placeholder="Peter P."
                            .value=${meme.author}
                        />
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-pencil"></i>
                        </span>
                    </div>
                    <p class="help ${validation ? (validation.author.isValid ? 'is-success' : 'is-danger') : ''}">
                        ${validation ? validation.author.message : nothing}
                    </p>
                </div>

                <div class="field pt-3">
                    <div class="control">
                        <button class="button is-primary mr-5" type="submit">Upload meme</button>
                        <button class="button has-background-grey-lighter" @click=${cancelAction}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`;
