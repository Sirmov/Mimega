import { html } from 'lit-html';

export const navigationTemplate = (displayName, onLogout) =>
    html`<nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <p class="title is-4"><strong>Mimega</strong></p>
            </div>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/">Home</a>
                <a class="navbar-item" href="/memes">Memes</a>
            </div>

            <div class="navbar-end">
                ${displayName
                    ? html`<div class="navbar-item">
                              <p class="content">Hello, ${displayName}</p>
                          </div>
                          <div class="navbar-item">
                              <a class="button is-primary" href="/create-meme">Create meme</a>
                          </div>
                          <div class="navbar-item">
                              <a class="button is-light" href="javascript:void(0)" @click=${onLogout}>Logout</a>
                          </div>`
                    : html`<div class="navbar-item">
                          <div class="buttons">
                              <a class="button is-primary" href="/sign-up"><strong>Sign up</strong></a>
                              <a class="button is-light" href="/login">Log in</a>
                          </div>
                      </div>`}
            </div>
        </div>
    </nav>`;
