import { getUserUid } from '../services/authenticationService';
import { readMemesPage } from '../services/memesService';
import { appendMemes, memeCardsTemplate, memesGridTemplate, memesTemplate } from '../views/memesView';

// Declare event handlers in outer scope
let onScroll;

// Declare memes storage
let memesStorage = [];

const htmlElement = document.documentElement;
const thresholdOffset = 250;

export function memesController(ctx, next) {
    // Attach scroll event handler only once
    if (htmlElement.getAttribute('scrollListener') !== 'true') {
        onScroll = createScrollHandler(ctx);

        window.addEventListener('scroll', onScroll);
        htmlElement.setAttribute('scrollListener', 'true');
    }

    // Clear memes storage
    memesStorage = [];

    ctx.render(memesTemplate(renderMemes(ctx)));
}

// Rendering functions
async function renderMemes(ctx) {
    await fetchMemes(ctx, true);
    return memesGridTemplate(memesStorage);
}

async function fetchMemes(ctx, isFirstPage = false) {
    let isNotEmpty = false;

    const userUid = getUserUid(ctx.auth);
    let memes = await readMemesPage(ctx.db, userUid, isFirstPage);

    // Remove event listener if there are no memes left
    if (memes === false) {
        window.removeEventListener('scroll', onScroll);
        htmlElement.setAttribute('scrollListener', 'false');

        return isNotEmpty;
    }

    isNotEmpty = true;

    memes.forEach((meme) => {
        if (!memesStorage.some((m) => m.id === meme.id)) {
            memesStorage.push(meme);
        }
    });

    return isNotEmpty;
}

// Scroll handler
const createScrollHandler = (ctx) =>
    async function () {
        // Check wether scroll position exceeds threshold
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - thresholdOffset) {
            let isNotEmpty = await fetchMemes(ctx);

            if (isNotEmpty) {
                appendMemes(memesStorage);
            }
        }
    };
