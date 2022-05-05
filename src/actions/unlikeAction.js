import { deleteUserLike } from '../services/likesService';

export async function unlikeMemeAction(ctx, event) {
    const memeId = event.target.dataset.id;
    await deleteUserLike(ctx.db, ctx.auth, memeId);
}
