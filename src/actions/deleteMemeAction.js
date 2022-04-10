import { deleteMeme } from '../services/memesService';

export async function deleteMemeAction(ctx, event) {
    let choice = confirm('Are you sure you want to delete this meme?');

    if (choice) {
        await deleteMeme(ctx.db, event.target.dataset.id);
        ctx.page.redirect('/memes');
    }
}
