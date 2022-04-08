// Attach render function to context

import { render } from 'lit-html';

// Import layout skeleton
import { layoutTemplate } from '../views/skeleton/layoutView';
import { navigationTemplate } from '../views/skeleton/navigationView';
import { footerTemplate } from '../views/skeleton/footerView';
import { getUserDisplayName } from '../services/authenticationService';

// Render layout on initial load
const rootElement = document.body;
render(layoutTemplate(), rootElement);

// Select container elements
const navigationContainer = rootElement.querySelector('header');
const contentContainer = rootElement.querySelector('main');
const footerContainer = rootElement.querySelector('footer');

function ctxRender(ctx) {
    return function (templateResult) {
        render(navigationTemplate(getUserDisplayName(ctx.auth)), navigationContainer);
        render(footerTemplate(), footerContainer);
        return render(templateResult, contentContainer);
    };
}

export function renderMiddleware(ctx, next) {
    ctx.render = ctxRender(ctx);

    next();
}
