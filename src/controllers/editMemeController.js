import { readMeme, updateMeme } from '../services/memesService';
import { createSubmitHandler } from '../utils/decorators';
import { editFormTemplate, editMemeTemplate } from '../views/editMemeView';

const allowedData = ['title', 'imageUrl', 'author'];

// Declare event handlers in outer scope
let onEdit;

export function editMemeController(ctx, next) {
    onEdit = createSubmitHandler(ctx, editSubmit, allowedData);
    ctx.render(editMemeTemplate(renderForm(ctx)));
}

async function renderForm(ctx) {
    let meme = await readMeme(ctx.db, ctx.params.id);

    return editFormTemplate(onEdit, meme);
}

async function editSubmit(ctx, data, event) {
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
        ctx.render(editFormTemplate(onEdit, data, validation));
    } else {
        await updateMeme(ctx.db, data, ctx.params.id);
        event.target.reset();
        ctx.page.redirect('/memes');
    }
}
