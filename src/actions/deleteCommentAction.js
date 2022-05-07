import { deleteComment } from '../services/commentsService';

export async function deleteCommentAction(ctx, event) {
    let choice = confirm('Are you sure you want to delete this comment?');

    if (choice) {
        await deleteComment(ctx.db, event.target.dataset.id);
        event.target.parentElement.parentElement.parentElement.remove();
    }
}
