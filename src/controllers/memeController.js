import { deleteCommentAction } from '../actions/deleteCommentAction';
import { deleteMemeAction } from '../actions/deleteMemeAction';
import { likeMemeAction } from '../actions/likeMemeAction';
import { unlikeMemeAction } from '../actions/unlikeMemeAction';
import { getUserUid } from '../services/authenticationService';
import { createComment, readAllComments } from '../services/commentsService';
import { readMeme } from '../services/memesService';
import { createEventHandler, createSubmitHandler } from '../utils/decorators';
import { commentsTemplate, memeCardTemplate, memeFooterTemplate, memeTemplate } from '../views/memeView';

const allowedData = ['comment'];
let onLikeDelete, onCommentDelete, onLike, onUnlike, onSubmit;

export function memeController(ctx, next) {
    onLikeDelete = createEventHandler(ctx, deleteMemeAction);
    onLike = createEventHandler(ctx, likeMemeAction);
    onUnlike = createEventHandler(ctx, unlikeMemeAction);
    onSubmit = createSubmitHandler(ctx, onCommentSubmit, allowedData);
    onCommentDelete = createEventHandler(ctx, deleteCommentAction);

    ctx.render(memeTemplate(renderMemeCard(ctx), renderComments(ctx)));
}

// Rendering functions

async function renderMemeCard(ctx) {
    let meme = await fetchMeme(ctx);
    return memeCardTemplate(meme, onLikeDelete, onLike, onUnlike);
}

async function renderComments(ctx, validation) {
    let comments = await fetchComments(ctx);
    return commentsTemplate(comments, onSubmit, onCommentDelete, validation);
}

export async function renderMemeFooter(ctx) {
    let meme = await fetchMeme(ctx);
    return memeFooterTemplate(meme, onLikeDelete, onLike, onUnlike);
}

// Comment submit event handler

async function onCommentSubmit(ctx, data, event) {
    let validation = {};
    allowedData.forEach((d) => (validation[d] = { isValid: true, message: '' }));

    // Comment validation

    if (data.comment.length < 5) {
        validation.comment.isValid = false;
        validation.comment.message = 'Comment should be at least 5 characters long.';
    } else if (data.comment.length > 150) {
        validation.comment.isValid = false;
        validation.comment.message = 'Comment should be less than 150 characters.';
    }

    if (Object.entries(validation).some(([k, v]) => v.isValid === false)) {
        ctx.render(memeTemplate(renderMemeCard(ctx), renderComments(ctx, validation)));
    } else {
        let comment = await createComment(ctx.db, ctx.auth, { ...data, memeId: ctx.params.id });
        event.target.reset();
    }
}

// Data fetching functions

async function fetchMeme(ctx) {
    const userUid = getUserUid(ctx.auth);
    let meme = await readMeme(ctx.db, ctx.params.id);
    meme.isLogged = Boolean(userUid);
    meme.isOwner = userUid === meme.ownerId;
    meme.isLiked = meme.whoLiked.some((x) => x === userUid);
    return meme;
}

async function fetchComments(ctx) {
    const userUid = getUserUid(ctx.auth);
    let comments = await readAllComments(ctx.db, ctx.params.id);
    comments.forEach((c) => (c.isOwner = c.ownerId === userUid));
    return comments;
}
