import { getUserUid } from '../services/authenticationService';
import { readMemesPage } from '../services/memesService';
import { appendMemes, memeCardsTemplate, memesGridTemplate, memesTemplate } from '../views/memesView';

// Declare event handlers in outer scope
let onScroll;

const htmlElement = document.documentElement;
const thresholdOffset = 250;

export function memesController(ctx, next) {
    // Attach scroll event handler only once
    if (htmlElement.getAttribute('scrollListener') !== 'true') {
        onScroll = createScrollHandler(ctx);

        window.addEventListener('scroll', onScroll);
        htmlElement.setAttribute('scrollListener', 'true');
    }

    ctx.render(memesTemplate(renderMemes(ctx)));
}

// Rendering functions
async function renderMemes(ctx) {
    let memes = await fetchMemes(ctx, true);
    return memesGridTemplate(memes);
}

async function fetchMemes(ctx, isFirstPage = false) {
    let memes = await readMemesPage(ctx.db, isFirstPage);

    // Remove event listener if there are no memes left
    if (memes === false) {
        window.removeEventListener('scroll', onScroll);
        htmlElement.setAttribute('scrollListener', 'false');

        return false;
    }

    // Attach a is owner and is liked property to all memes
    const userUid = getUserUid(ctx.auth);
    memes.forEach((meme) => {
        meme.isOwner = userUid === meme.ownerId;
        // This can cause performance issues when likes become bigger
        // The solution is to keep user liked memes and compare it to the current meme id
        meme.isLiked = meme.whoLiked.some((x) => x === userUid);
    });
    return memes;
}

// Scroll handler
const createScrollHandler = (ctx) =>
    async function () {
        // Check wether scroll position exceeds threshold
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - thresholdOffset) {
            let memes = await fetchMemes(ctx);

            if (memes !== false) {
                appendMemes(memeCardsTemplate(memes));
            }
        }
    };
