import { html, nothing } from 'lit-html';

export const registerTemplate = (registerSubmit, validation) =>
    html` <form @submit=${registerSubmit} class="container">
        <h1 class="title is-2 mb-5">Sign up</h1>
        <div class="field">
            <label class="label is-medium" for="username">Username</label>
            <div class="control has-icons-left">
                <input
                    class="input ${validation ? (validation.username.isValid ? 'is-success' : 'is-danger') : ''}"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="peter16"
                />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-user"></i>
                </span>
            </div>
            <p class="help ${validation ? (validation.username.isValid ? 'is-success' : 'is-danger') : ''}">
                ${validation ? validation.username.message : nothing}
            </p>
        </div>

        <div class="field">
            <label class="label is-medium" for="email">Email</label>
            <div class="control has-icons-left">
                <input
                    class="input ${validation ? (validation.email.isValid ? 'is-success' : 'is-danger') : ''}"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="peter@gmail.com"
                />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-envelope"></i>
                </span>
            </div>
            <p class="help ${validation ? (validation.email.isValid ? 'is-success' : 'is-danger') : ''}">
                ${validation ? validation.email.message : nothing}
            </p>
        </div>

        <div class="field">
            <label class="label is-medium" for="password">Password</label>
            <div class="control has-icons-left">
                <input
                    class="input ${validation ? (validation.password.isValid ? 'is-success' : 'is-danger') : ''}"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-lock"></i>
                </span>
            </div>
            <p class="help ${validation ? (validation.password.isValid ? 'is-success' : 'is-danger') : ''}">
                ${validation ? validation.password.message : nothing}
            </p>
        </div>

        <div class="field">
            <p class="content">Already have an account? Log in <a href="/login">here</a>.</p>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-primary" type="submit">Sign up</button>
            </div>
        </div>
    </form>`;
