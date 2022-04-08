import { logout } from '../services/authenticationService';

export async function logoutAction(ctx, event) {
    await logout(ctx.auth);
    ctx.page.redirect('/login');
}
