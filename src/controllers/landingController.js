import { landingTemplate } from '../views/landingView';

export function landingController(ctx, next) {
    ctx.render(landingTemplate());
}
