import { html, nothing } from 'lit-html';

export const loginTemplate = (loginSubmit, validation) =>
    html`<form @submit=${loginSubmit} class="container">
        <div class="field">
            <label class="label is-medium" for="email">Email</label>
            <div class="control has-icons-left">
                <input
                    class="input ${validation ? (!validation.email.isValid ? 'is-danger' : '') : ''}"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="peter@gmail.com"
                />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-envelope"></i>
                </span>
            </div>
            <p class="help ${validation ? (!validation.email.isValid ? 'is-danger' : '') : ''}">
                ${validation ? validation.email.message : nothing}
            </p>
        </div>

        <div class="field">
            <label class="label is-medium" for="password">Password</label>
            <div class="control has-icons-left">
                <input
                    class="input ${validation ? (!validation.password.isValid ? 'is-danger' : '') : ''}"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-lock"></i>
                </span>
            </div>
            <p class="help ${validation ? (!validation.password.isValid ? 'is-danger' : '') : ''}">
                ${validation ? validation.password.message : nothing}
            </p>
        </div>

        <div class="field">
            <p class="content">Dont't have an account? Sign up <a href="/sign-up">here</a>.</p>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-primary" type="submit">Log in</button>
            </div>
        </div>
    </form>`;
