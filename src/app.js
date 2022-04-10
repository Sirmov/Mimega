// Application entry point

import '../styles/styles.scss';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web app configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCBYYAvAN3GjdfOLxj_8Vgksaxid7z7L8k',
    authDomain: 'mimega-b819a.firebaseapp.com',
    projectId: 'mimega-b819a',
    storageBucket: 'mimega-b819a.appspot.com',
    messagingSenderId: '915759993421',
    appId: '1:915759993421:web:70e7bf5f2f0417de130204'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => page.redirect(page.current));

// Import middleware
import { renderMiddleware } from './middleware/renderMiddleware';
import { dependenciesMiddleware } from './middleware/dependenciesMiddleware';

// Import page router
import page from 'page';

// Import view controllers
import { landingController } from './controllers/landingController';
import { loginController } from './controllers/loginController';
import { registerController } from './controllers/registerController';
import { memesController } from './controllers/memesController';
import { createMemeController } from './controllers/createMemeController';

// Register routes
page(dependenciesMiddleware({ app, auth, db }));
page(renderMiddleware);
page('/', landingController);
page('/login', loginController);
page('/sign-up', registerController);
page('/memes', memesController);
page('/create-meme', createMemeController);

page.start();
