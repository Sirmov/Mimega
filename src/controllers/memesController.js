import { deleteMemeAction } from '../actions/deleteMemeAction';
import { getUserUid } from '../services/authenticationService';
import { readMemesPage } from '../services/memesService';
import { createEventHandler } from '../utils/decorators';
import { appendMemes, memeCardsTemplate, memesGridTemplate, memesTemplate } from '../views/memesView';

// Declare event handlers in outer scope
let onDelete, onScroll;

const pageOffset = 250;

export function memesController(ctx, next) {
    // Decorate event handlers
    onDelete = createEventHandler(ctx, deleteMemeAction);
    onScroll = createScrollHandler(ctx);
    window.addEventListener('scroll', onScroll);

    ctx.render(memesTemplate(renderMemes(ctx)));
}

async function renderMemes(ctx) {
    let memes = await fetchMemes(ctx, true);
    return memesGridTemplate(memes, onDelete);
}

async function fetchMemes(ctx, isFirstPage = false) {
    let memes = await readMemesPage(ctx.db, isFirstPage);

    // Remove event listener if there are no memes left
    if (memes === false) {
        window.removeEventListener('scroll', onScroll);
        return memes;
    }

    // Attach a is owner property to all memes
    const userUid = getUserUid(ctx.auth);
    memes.forEach((meme) => (meme.isOwner = userUid === meme.ownerId));
    return memes;
}

const createScrollHandler = (ctx) =>
    async function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - pageOffset) {
            let memes = await fetchMemes(ctx);
            if (memes !== false) {
                appendMemes(memeCardsTemplate(memes, onDelete));
            }
        }
    };
