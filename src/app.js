// Application entry point

// Import middleware
import { renderMiddleware } from './middleware/renderMiddleware';

// Import page router
import page from 'page';

// Import view controllers
import { landingController } from './controllers/landingController';
import { loginController } from './controllers/loginController';

// Register routes
page(renderMiddleware);
page('/', landingController);
page('/login', loginController);

page.start();
