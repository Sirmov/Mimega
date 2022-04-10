import { html, nothing } from 'lit-html';

export const uploadMemeTemplate = (createSubmit, validation) =>
    html`<form @submit=${createSubmit} class="container">
        <h1 class="title is-2 mb-6">Upload meme</h1>
        <div class="field">
            <label class="label is-medium" for="title">Title</label>
            <div class="control has-icons-left">
                <input
                    class="input ${validation ? (validation.title.isValid ? 'is-success' : 'is-danger') : ''}"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Oh… The classic meme"
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
                    class="input ${validation ? (validation.imageUrl.isValid ? 'is-success' : 'is-danger') : ''}"
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="www.memeges.com/coolmeme.png"
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
                />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-pencil"></i>
                </span>
            </div>
            <p class="help ${validation ? (validation.author.isValid ? 'is-success' : 'is-danger') : ''}">
                ${validation ? validation.author.message : nothing}
            </p>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-primary" type="submit">Upload meme</button>
            </div>
        </div>
    </form>`;
