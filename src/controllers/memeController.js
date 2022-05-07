import { deleteMemeAction } from '../actions/deleteMemeAction';
import { likeMemeAction } from '../actions/likeMemeAction';
import { unlikeMemeAction } from '../actions/unlikeMemeAction';
import { getUserUid } from '../services/authenticationService';
import { readMeme } from '../services/memesService';
import { createEventHandler } from '../utils/decorators';
import { memeCardTemplate, memeFooterTemplate, memeTemplate } from '../views/memeView';

let onDelete, onLike, onUnlike;

export function memeController(ctx, next) {
    onDelete = createEventHandler(ctx, deleteMemeAction);
    onLike = createEventHandler(ctx, likeMemeAction);
    onUnlike = createEventHandler(ctx, unlikeMemeAction);

    ctx.render(memeTemplate(renderMemeCard(ctx)));
}

async function renderMemeCard(ctx) {
    let meme = await fetchMeme(ctx);
    return memeCardTemplate(meme, onDelete, onLike, onUnlike);
}

export async function renderMemeFooter(ctx) {
    let meme = await fetchMeme(ctx);
    return memeFooterTemplate(meme, onDelete, onLike, onUnlike);
}

async function fetchMeme(ctx) {
    const userUid = getUserUid(ctx.auth);
    let meme = await readMeme(ctx.db, ctx.params.id);
    meme.isLogged = Boolean(userUid);
    meme.isOwner = userUid === meme.ownerId;
    meme.isLiked = meme.whoLiked.some((x) => x === userUid);
    return meme;
}
