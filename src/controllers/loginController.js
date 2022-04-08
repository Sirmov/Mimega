import { loginTemplate } from '../views/loginView';
import { createSubmitHandler } from '../utils/decorators';
import { login } from '../services/authenticationService';

const allowedData = ['email', 'password'];
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
const numbersRegex = /\d/;
const specialCharactersRegex = /[^A-z\s\d][\\\^]?/;

export function loginController(ctx, next) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, loginSubmit, allowedData)));
}

async function loginSubmit(ctx, data, event) {
    let validation = {};
    allowedData.forEach((d) => (validation[d] = { isValid: true, message: '' }));

    // Email validation
    if (!emailRegex.test(data.email)) {
        validation.email.isValid = false;
        validation.email.message = 'Email is incorrect.';
    }

    // Password validation
    if (data.password.length < 8) {
        validation.password.isValid = false;
        validation.password.message = 'Password should be at least 8 characters long. ';
    }
    if (!numbersRegex.test(data.password)) {
        validation.password.isValid = false;
        validation.password.message += 'Password should contain numbers. ';
    }
    if (!specialCharactersRegex.test(data.password)) {
        validation.password.isValid = false;
        validation.password.message += 'Password should contain special characters.';
    }

    if (Object.entries(validation).some(([k, v]) => v.isValid === false)) {
        ctx.render(loginTemplate(createSubmitHandler(ctx, loginSubmit, allowedData), validation));
    } else {
        await login(ctx.auth, data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/');
    }
}
