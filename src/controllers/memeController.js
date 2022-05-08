import { deleteCommentAction } from '../actions/deleteCommentAction';
import { deleteMemeAction } from '../actions/deleteMemeAction';
import { likeMemeAction } from '../actions/likeMemeAction';
import { unlikeMemeAction } from '../actions/unlikeMemeAction';
import { openModal } from '../components/modalComponent';
import { getUserUid, isLogged } from '../services/authenticationService';
import { createComment, readAllComments, readComment } from '../services/commentsService';
import { readMeme } from '../services/memesService';
import { createEventHandler, createSubmitHandler } from '../utils/decorators';
import {
    reRenderComments,
    commentsTemplate,
    memeCardTemplate,
    memeFooterTemplate,
    memeTemplate,
    reRenderCommentFormMessage
} from '../views/memeView';

const allowedData = ['comment'];

// Declare event handlers in outer scope
let onLikeDelete, onCommentDelete, onLike, onUnlike, onSubmit, onShare;

export function memeController(ctx, next) {
    // Decorate event handlers
    onLikeDelete = createEventHandler(ctx, deleteMemeAction);
    onLike = createEventHandler(ctx, likeMemeAction);
    onUnlike = createEventHandler(ctx, unlikeMemeAction);
    onSubmit = createSubmitHandler(ctx, onCommentSubmit, allowedData);
    onCommentDelete = createEventHandler(ctx, deleteCommentAction);
    onShare = createEventHandler(ctx, shareClick);

    ctx.render(memeTemplate(renderMemeCard(ctx), renderComments(ctx)));
}

// Rendering functions
async function renderMemeCard(ctx) {
    let meme = await fetchMeme(ctx);
    return memeCardTemplate(meme, onLikeDelete, onLike, onUnlike, onShare);
}

async function renderComments(ctx) {
    let comments = await fetchComments(ctx);
    return commentsTemplate(comments, isLogged(ctx.auth), onSubmit, onCommentDelete);
}

export async function renderMemeFooter(ctx) {
    let meme = await fetchMeme(ctx);
    return memeFooterTemplate(meme, onLikeDelete, onLike, onUnlike, onShare);
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
        updateCommentFormMessage(validation.comment.message);
    } else {
        await createComment(ctx.db, ctx.auth, { ...data, memeId: ctx.params.id });
        event.target.reset();
        updateCommentFormMessage('');
        updateComments(ctx);
    }
}

// Data updating functions
async function updateComments(ctx) {
    const comments = await fetchComments(ctx);
    reRenderComments(comments, onCommentDelete);
}

function updateCommentFormMessage(message) {
    reRenderCommentFormMessage(message);
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

// Share event handler
function shareClick(ctx, event) {
    const memeId = event.currentTarget.dataset.id;
    navigator.clipboard.writeText(`https://mimega-b819a.web.app/${memeId}`);
    openModal('Successes!', 'Successfully copied meme link!');
}
