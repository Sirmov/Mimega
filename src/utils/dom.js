import { html } from 'lit-html';
import '../../styles/dom.scss';

export const spinner = () => html`<div class="spinner">
    <span class="spinner-inner-1"></span>
    <span class="spinner-inner-2"></span>
    <span class="spinner-inner-3"></span>
</div>`;
