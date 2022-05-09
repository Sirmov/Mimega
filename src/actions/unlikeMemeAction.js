import { renderMemeFooter } from '../controllers/memeController';
import { deleteUserLike } from '../services/likesService';
import { updateMemeOnLike } from '../views/memeView';

export async function unlikeMemeAction(ctx, event) {
    const memeFooterChildren = [...event.currentTarget.parentElement.children];
    const memeId = event.target.dataset.id;
    await deleteUserLike(ctx.db, ctx.auth, memeId);
    updateMemeOnLike(renderMemeFooter(ctx), false);
    memeFooterChildren.forEach((e) => e.remove());
}
