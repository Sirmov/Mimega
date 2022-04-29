import { termsAndConditionsTemplate } from '../views/termsAndConditionsView';

export function termsAndConditionsController(ctx, next) {
    ctx.render(termsAndConditionsTemplate());
}
