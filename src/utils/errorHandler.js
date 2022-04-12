import { openModal } from '../components/modalComponent';

export function handleError(errorTitle, error) {
    let errorCode = error.code;
    let errorMessage = error.message;

    switch (errorCode) {
        case 'auth/email-already-exists':
            errorMessage = 'A user with this email already exists.';
            break;
        case 'auth/invalid-display-name':
            errorMessage = 'Username must be non-empty.';
            break;
        case 'auth/invalid-password':
            errorMessage = 'Password must be at least 6 characters.';
            break;
        case 'auth/user-not-found':
            errorMessage = 'A user with this email does not exist.';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Wrong email or password.';
            break;
        case 'auth/email-already-in-use':
            errorMessage = 'A user with this email already exists.';
            break;
        case 'PERMISSION_DENIED':
            errorMessage = "You don't have access to this operation.";
            break;
        case 'permission-denied':
            errorMessage = "You don't have access to this operation.";
            break;
        default:
            errorMessage = 'Oops something went wrong.';
            break;
    }

    openModal(errorTitle, errorMessage);
    throw error;
}
