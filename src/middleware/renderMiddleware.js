// Attach render function to context

import { render } from 'lit-html';
import { getUserDisplayName } from '../services/authenticationService';
import { createEventHandler } from '../utils/decorators';
import { logoutAction } from '../actions/logoutAction';

// Import layout skeleton
import { layoutTemplate } from '../views/skeleton/layoutView';
import { navigationTemplate } from '../views/skeleton/navigationView';
import { footerTemplate } from '../views/skeleton/footerView';


// Render layout on initial load
const rootElement = document.body;
render(layoutTemplate(), rootElement);

// Select container elements
const navigationContainer = rootElement.querySelector('header');
const contentContainer = rootElement.querySelector('main');
const footerContainer = rootElement.querySelector('footer');

function ctxRender(ctx) {
    return async function (templateResult) {
        render(navigationTemplate(getUserDisplayName(ctx.auth), createEventHandler(ctx, logoutAction)), navigationContainer);
        render(footerTemplate(), footerContainer);
        return await render(templateResult, contentContainer);
    };
}

export function renderMiddleware(ctx, next) {
    ctx.render = ctxRender(ctx);

    next();
}
