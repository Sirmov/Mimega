import { getUserUid } from '../services/authenticationService';
import { readAllMemes } from '../services/memesService';
import { memeCardsTemplate, memesTemplate } from '../views/memesView';

export function memesController(ctx, next) {
    ctx.render(memesTemplate(renderMemes(ctx)));
}

async function renderMemes(ctx) {
    let memes = await readAllMemes(ctx.db);
    const userUid = getUserUid(ctx.auth);
    memes.forEach((meme) => (meme.isOwner = userUid === meme.ownerId));
    return memeCardsTemplate(memes);
}
