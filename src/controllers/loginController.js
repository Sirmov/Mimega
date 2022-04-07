import { loginTemplate } from '../views/loginView.js';

export function loginController(ctx, next) {
    ctx.render(loginTemplate());
}
