import { getUserUid } from '../services/authenticationService';
import { readMemesPage } from '../services/memesService';
import { isRendered } from '../utils/dom';
import { appendMemes, memesContainerTemplate, memesTemplate } from '../views/memesView';

// Declare event handlers in outer scope
let onScroll;

// Declare memes storage
let memesStorage = [];

// Declare constants
const htmlElement = document.documentElement;
const thresholdOffset = 250;

export async function memesController(ctx, next) {
    // Attach scroll event handler only once
    if (htmlElement.getAttribute('scrollListener') !== 'true') {
        onScroll = createScrollHandler(ctx);

        window.addEventListener('scroll', onScroll);
        htmlElement.setAttribute('scrollListener', 'true');
    }

    // Clear memes storage
    memesStorage = [];

    // Fetch meme page, render meme container and append memes
    ctx.render(memesTemplate(renderMemes(ctx)));
    isRendered('#meme-container', () => appendMemes(memesStorage));
}

// Rendering functions
async function renderMemes(ctx) {
    await fetchMemePage(ctx, true);
    return memesContainerTemplate();
}

async function fetchMemePage(ctx, isFirstPage = false) {
    // Fetch memes
    let memes = await readMemesPage(ctx.db, getUserUid(ctx.auth), isFirstPage);

    if (memes) {
        // Add distinct memes to storage
        memes.forEach((meme) => {
            if (!memesStorage.some((m) => m.id === meme.id)) {
                memesStorage.push(meme);
            }
        });

        return true;
    } else {
        // Remove event listener if there are no memes left
        window.removeEventListener('scroll', onScroll);
        htmlElement.setAttribute('scrollListener', 'false');

        return false;
    }
}

// Scroll handler
const createScrollHandler = (ctx) =>
    async function () {
        // Check wether scroll position exceeds threshold
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - thresholdOffset) {
            let isNotEmpty = await fetchMemePage(ctx);

            if (isNotEmpty) {
                appendMemes(memesStorage);
            }
        }
    };
