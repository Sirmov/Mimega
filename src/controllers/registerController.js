import { register } from '../services/authenticationService';
import { createSubmitHandler } from '../utils/decorators';
import { registerTemplate } from '../views/registerView';

const allowedData = ['username', 'email', 'password', 'termsAndConditions'];
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
const numbersRegex = /\d/;
const specialCharactersRegex = /[^A-z\s\d][\\\^]?/;

// Declare event handlers in outer scope
let onRegister;

export function registerController(ctx, next) {
    // Decorate event handlers
    onRegister = createSubmitHandler(ctx, registerSubmit, allowedData);
    ctx.render(registerTemplate(onRegister));
}

async function registerSubmit(ctx, data, event) {
    let validation = {};
    allowedData.forEach((d) => (validation[d] = { isValid: true, message: '' }));

    // Username validation
    if (data.username.length < 6) {
        validation.username.isValid = false;
        validation.username.message = 'Username should be at least 6 characters long.';
    } else {
        validation.username.isValid = true;
        validation.username.message = 'Username is available.';
    }

    // Email validation
    if (!emailRegex.test(data.email)) {
        validation.email.isValid = false;
        validation.email.message = 'Email is incorrect.';
    } else {
        validation.email.isValid = true;
        validation.email.message = 'Email is correct.';
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
    if (validation.password.isValid === true) {
        validation.password.message = 'Password is valid.';
    }

    // Terms and conditions validation
    if (data.termsAndConditions) {
        validation.termsAndConditions.isValid = true;
    } else {
        validation.termsAndConditions.isValid = false;
        validation.termsAndConditions.message = 'You must accept the terms and conditions to register.';
    }

    if (Object.entries(validation).some(([k, v]) => v.isValid === false)) {
        ctx.render(registerTemplate(onRegister, validation));
    } else {
        await register(ctx.auth, data.email, data.password, data.username);
        event.target.reset();
        ctx.page.redirect('/login');
    }
}
