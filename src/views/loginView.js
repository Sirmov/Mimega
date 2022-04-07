import { html } from 'lit-html';

export const loginTemplate = (loginSubmit, validation) =>
    html`<form @submit=${loginSubmit} class="container">
        <div class="field">
            <label class="label is-medium" for="username">Username</label>
            <div class="control has-icons-left">
                <input class="input" type="text" id="username" name="username" placeholder="peter16" />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-user"></i>
                </span>
            </div>
            <p class="help is-success">This username is available</p>
        </div>

        <div class="field">
            <label class="label is-medium" for="email">Email</label>
            <div class="control has-icons-left">
                <input class="input" type="email" id="email" name="email" placeholder="peter@gmail.com" />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-envelope"></i>
                </span>
            </div>
            <p class="help is-success">This username is available</p>
        </div>

        <div class="field">
            <label class="label is-medium" for="password">Password</label>
            <div class="control has-icons-left">
                <input class="input" type="password" id="password" name="password" placeholder="********" />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-lock"></i>
                </span>
            </div>
            <p class="help is-success">This username is available</p>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-primary" type="submit">Submit</button>
            </div>
        </div>
    </form>`;
