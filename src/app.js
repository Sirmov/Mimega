// Application entry point

// Import middleware
import { renderMiddleware } from './middleware/renderMiddleware';

// Import page router
import page from 'page';

// Import view controllers
import { landingController } from './controllers/landingController';

// Register routes
page(renderMiddleware);
page('/', landingController);

page.start();
