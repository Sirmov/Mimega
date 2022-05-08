import { deleteComment } from '../services/commentsService';

export async function deleteCommentAction(ctx, event) {
    const currentTarget = event.currentTarget;
    let choice = confirm('Are you sure you want to delete this comment?');

    if (choice) {
        await deleteComment(ctx.db, currentTarget.dataset.id);
        currentTarget.parentElement.parentElement.parentElement.parentElement.remove();
    }
}
