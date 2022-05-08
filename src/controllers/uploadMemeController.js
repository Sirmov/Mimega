import { createMeme } from '../services/memesService.js';
import { uploadMemeTemplate as uploadMemeTemplate } from '../views/uploadMemeView.js';
import { createSubmitHandler } from '../utils/decorators';

const allowedData = ['title', 'imageUrl', 'author'];

// Declare event handlers in outer scope
let onUpload;

export function uploadMemeController(ctx, next) {
    // Decorate event handlers
    onUpload = createSubmitHandler(ctx, uploadSubmit, allowedData);
    ctx.render(uploadMemeTemplate(onUpload));
}

async function uploadSubmit(ctx, data, event) {
    let validation = {};
    allowedData.forEach((d) => (validation[d] = { isValid: true, message: '' }));

    // Title validation
    if (data.title.length < 5) {
        validation.title.isValid = false;
        validation.title.message = 'Title should be at least 5 characters long.';
    } else {
        validation.title.isValid = true;
        validation.title.message = 'Title is available.';
    }

    // Image url validation
    if (data.imageUrl.length < 5) {
        validation.imageUrl.isValid = false;
        validation.imageUrl.message = 'Image url should be at least 5 characters long.';
    } else {
        validation.imageUrl.isValid = true;
        validation.imageUrl.message = 'Image url looks good.';
    }

    // Author validation
    if (data.author.length < 5) {
        validation.author.isValid = false;
        validation.author.message = 'Author should be at least 5 characters long.';
    } else {
        validation.author.isValid = true;
        validation.author.message = 'Author is alright.';
    }

    if (Object.entries(validation).some(([k, v]) => v.isValid === false)) {
        ctx.render(uploadMemeTemplate(onUpload, validation));
    } else {
        let meme = await createMeme(ctx.db, ctx.auth, data);
        event.target.reset();
        ctx.page.redirect(`/memes/${meme.id}`);
    }
}
