import { renderMemeFooter } from '../controllers/memeController';
import { createLike } from '../services/likesService';
import { updateMemeOnLike } from '../views/memeView';

export async function likeMemeAction(ctx, event) {
    const memeId = event.target.dataset.id;
    await createLike(ctx.db, ctx.auth, memeId);
    updateMemeOnLike(renderMemeFooter(ctx), true);
    event.target.remove();
}
