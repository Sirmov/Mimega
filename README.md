<p align="center"><img src="https://github.com/Sirmov/Mimega/blob/main/assets/images/readme_banner.png"></p>
<h3 align="center">The social media for creating and sharing memes</h3>

## 📒 Description
Mimega is a project I decided to make after finishing the [JS Applications]() course at [Softuni](). It is a single page front end application about creating and sharing memes with your friends. The project is simple and its main purpose is to consolidate the skills acquired in the course. Some of which are: BOM, DOM manipulations, asynchronous programming, HTTP request, working with backend server, remote data, authentication, front end routing, templating, client side rendering, clean code practises, architecture and many more.

## 🌐Technologies
  
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?&style=flat&logo=html5&logoColor=white)&nbsp;
![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?&style=flat&logo=css3&logoColor=white)&nbsp;
![Bulma](https://img.shields.io/badge/Bulma-00D1B2?style=for-the-flat&logo=bulma&logoColor=white)&nbsp;
![Font Awesome](https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-flat&logo=fontawesome&logoColor=white)&nbsp;
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-flat&logo=sass&logoColor=white)&nbsp;\
![JavaScript](https://img.shields.io/badge/Javascript-a57f1c.svg?&style=flat&logo=javascript&logoColor=%23F7DF1E)&nbsp;
![Lit HTML](https://img.shields.io/badge/Lit%20Html-324FFF.svg?&style=flat&logo=lit&logoColor=%23F7DF1E)&nbsp;
![page.js](https://img.shields.io/badge/page.js-323330.svg?&style=flat&logo=javascript&logoColor=%23F7DF1E)&nbsp;
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-flat&logo=webpack&logoColor=white)&nbsp;
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-flat&logo=firebase&logoColor=white)&nbsp;

<!-- 
HTML5, CSS3, Bulma, Font Awesome, Sass, JavaScript, Lit Html, page.js, Webpack, Firebase
-->

## 🧱 Architecture
The application is devided into 4 main modules:
### 1. app.js
  The entry point of the application. It initializes the firebase backend - firebase auth and firestore database, imports dependecies and middlewares, initializes page router, registers routes and starts the application.
### 2. Views 
  Modules handling the html structure and templates, render logic, stylization and overall presentation.
### 3. Controllers 
  Modules implementing view logic, data validation, event handlers and abstract communication with the server via the services.
### 4. Services 
  Modules realizing the connection with the database and the different collections in it, ordering sorting and queries structure, CRUD operations, authentication.
  
  The project includes other modules aswell, but those are the building blocks of the application. There are utility modules, actions, components and middlewares.
  Actions are small reusable event handlers often performing CRUD operations. Components are reusable complete functional elements. Middlewares attach dependecies, usefull variables and functions to the context. They can also perform preloading. For a better understanding of the basic architecture refer to this diagram.
<p align="center"><img src="https://github.com/Sirmov/Mimega/blob/main/assets/images/architecture_diagram.png"></p>

## 🎿 Installing the project
You can install the project in three different ways.

### 1. Cloninig the repository
  - Open Git Bash.
  - Change the current working directory to the location where you want the cloned project.
  - Type ```git clone https://github.com/Sirmov/Mimega``` and press enter.

### 2. Downloading the repository
  - Go to the [root](https://github.com/Sirmov/Mimega) of the repository.
  - Click the  green code button.
  - Click download zip.
  <img width="50%" src="https://docs.github.com/assets/cb-20363/images/help/repository/code-button.png">
  
### 3. Using a [Git GUI client](https://git-scm.com/downloads/guis)

## ⌨️🖱️ Usage
You can visit the site [here](https://mimega-b819a.web.app) or run it on a local development server. To do that, firstly you have to [install](https://github.com/Sirmov/Mimega/blob/main/README.md#installing-the-project) the project. Note that you need to have [Node.js](https://nodejs.org/en/) installed on your machine. After that open the root directory of the project in your prefered terminal. Type ```npm install```. After you have successfully installed all of the dependecies type ```npm run start``` to start the local development server. To stop it simply close the terminal or press CTRL + C while in it.

## 📑 License
The project is licensed under the [MIT](https://github.com/Sirmov/Mimega/blob/main/LICENSE) license.
