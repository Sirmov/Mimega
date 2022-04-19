import { html } from 'lit-html';
import logo from '../../assets/images/logo.png';

export const landingTemplate = () =>
    html`<section class="hero pb-5">
            <div class="hero-body">
                <h1 class="title is-1">Mimega</h1>
                <h2 class="subtitle is-3">The online meme platform</h2>
            </div>
        </section>
        <div class="columns is-centered is-vcentered is-multiline">
            <div class="column is-5">
                <h1 class="title">About the website</h1>
                <p class="is-size-5">
                    Mimega is a online platform for creating and sharing memes. You can like, comment and share
                    different memes with your friends. All of your favorite memes in one place 😀.
                </p>
                <p class="is-size-6 mt-4">
                    If you are curious and want to learn more about the project click
                    <a href="https://github.com/Sirmov/Mimega">here</a>.
                </p>
            </div>
            <div class="column is-3 pl-6 is-hidden-mobile"></div>
            <div class="column is-narrow is-hidden-mobile">
                <img src=${logo} alt="Mimega" width="200px" height="300px" />
            </div>
        </div>`;
