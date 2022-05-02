import { createLike } from '../services/likesService';

export async function likeMemeAction(ctx, event) {
    const memeId = event.target.dataset.id;
    await createLike(ctx.db, ctx.auth, memeId);
}
