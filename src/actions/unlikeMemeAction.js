import { renderMemeFooter } from '../controllers/memeController';
import { deleteUserLike } from '../services/likesService';
import { updateMemeOnLike } from '../views/memeView';

export async function unlikeMemeAction(ctx, event) {
    const memeId = event.target.dataset.id;
    await deleteUserLike(ctx.db, ctx.auth, memeId);
    updateMemeOnLike(renderMemeFooter(ctx), false);
    event.target.remove();
}
