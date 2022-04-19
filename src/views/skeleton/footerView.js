import { html } from 'lit-html';

export const footerTemplate = () =>
    html`<div class="content has-text-centered">
        <p>
            <strong>Mimega</strong> by Nikola Sirmov. The source code is licensed
            <a href="https://github.com/Sirmov/Mimega/blob/main/LICENSE">MIT</a> &copy; 2022.
        </p>
        <p>
            ${linkTemplate('fa-brands fa-github', 'https://github.com/Sirmov', 'Github')}
            ${linkTemplate('fa-brands fa-linkedin', 'https://www.linkedin.com/in/sirmov/', 'Linkedin')}
            ${linkTemplate(
                'fa-brands fa-facebook',
                'https://www.facebook.com/people/Nikola-Sirmov/100000683407598/',
                'Facebook'
            )}
            ${linkTemplate('fa-brands fa-instagram', 'https://www.instagram.com/sirmov04/', 'Instagram')}
        </p>
    </div>`;

const linkTemplate = (icon, link, title) => html`<a href=${link} class="px-1"><i class="${icon} px-1"></i>${title}</a>`;
