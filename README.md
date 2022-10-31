<h1>food-ordering-api</h1>
<hr><p>Backend of food ordering platform</p>
<h2>Table of Content</h2>
<hr>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#technologies-used">Technologies Used</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#folder-structure">Folder Structure</a></li>
    <li><a href="#project-status">Project Status</a></li>
    <li><a href="#improvements">Improvements</a></li>
    <li><a href="#features-that-can-be-added">Features that can be added</a></li>
    <li><a href="#acknowledgement">Acknowledgement</a></li>
  </ol>
</details>
<h2>Technologies Used</h2>
<hr><ul>
<li>NodeJS</li>
</ul><ul>
<li>JavaScript</li>
</ul><ul>
<li>Express</li>
</ul><ul>
<li>Sequelize</li>
</ul><h2>Features</h2>
<hr><ul>
<li>Create user/Validate log in</li>
</ul><ul>
<li>Update user infomation and credit</li>
</ul><ul>
<li>Retrieve influencers</li>
</ul><ul>
<li>Create history</li>
</ul><ul>
<li>Retrive credit</li>
</ul><ul>
<li>Retrive history as user and influencer</li>
</ul><h2>Setup</h2>
<hr><p>Clone down this repository. You will need node and npm installed globally on your machine.</p><h5>Prerequisites</h5><ul>
<li>Node Package Manager (NPM)</li>
</ul><ul>
<li>NodeJS</li>
</ul><h5>Installation</h5><ul>
<li>
<ol>
<li>Clone the repo:</li>
</ol>
</li>
</ul><p><code>https://github.com/sfdevshop/food-ordering-app.git</code></p><ul>
<li>
<ol start="2">
<li>install npm packages:</li>
</ol>
</li>
</ul><p><code>npm install</code></p><ul>
<li>
<ol start="3">
<li>Create database:</li>
</ol>
</li>
</ul><p><code>createdb food-ordering-api</code></p><ul>
<li>
<ol start="4">
<li>Run Sequelize migrations:</li>
</ol>
</li>
</ul><p><code>sequelize-cli db:migrate</code></p><ul>
<li>
<ol start="5">
<li>Run command:</li>
</ol>
</li>
</ul><p><code>npm start</code></p><ul>
</ul><h5>Start with Docker</h5><ul>
<li>
<ol>
<li>Pull image from Docker Hub:</li>
</ol>
</li>
</ul><p><code>docker pull williammengyf/food-ordering-api</code></p><ul>
<li>
<ol start="2">
<li>Run the Docker image:</li>
</ol>
</li>
</ul><p><code>docker run -p 8000:8000 williammengyf/food-ordering-api</code></p>

## Usage
<hr>
User sign up: POST /api/users

User log in: POST /api/users/login

Get influencers*: GET /api/users/influencers

Update profile*: PUT /api/users/profile/:userId

Update credit*: PUT /api/users/credit/:userId

Get credit*: GET /api/users/credit/:userId

Delete user: DELETE /api/users/delete/:userId

Create history*: POST /api/histories/users/:userId

Get purchase history of user*: GET /api/histories/users/:userId

Get earning history of influencer*: GET /api/histories/influencers/:influencerId

Delete history: DELETE /api/histories/delete/:historyId

*: Jwt should be include in the request.

## Folder Structure
<hr>

 ```
 .
├── bin
│   ├── www                           // Entry of the application
├── middleware
│   ├── auth.js                       // Authentication based on jwt
├── server
│   ├── _test_                        // Unit tests
│   │   ├── createHistory.test.js
│   │   ├── editProfile.test.js
│   │   ├── listInfluencers.test.js
│   │   ├── retrieveCredit.test.js
│   │   ├── login.test.js
│   │   ├── retrieveHistory.test.js
│   │   ├── signUp.test.js
│   │   ├── updateCredit.test.js
│   ├── config                         // Configuration of the database
│   │   ├── config.json
│   ├── controllers                    // API methods of the models
│   │   ├── histories.js
│   │   ├── index.js
│   │   ├── users.js
│   ├── migrations                     // The migration files of Sequelize
│   │   ├── 20220704215617-create-user.js
│   │   ├── 20220803033029-create-user.js
│   ├── models                         // Models created by Sequelize
│   │   ├── history.js
│   │   ├── index.js
│   │   ├── user.js
│   ├── routes                         // Routes of API methods
│   │   ├── index.js
├── .gitignore
├── .dockerignore
├── Dockerfile
├── app.js                             // Configuration of our app
├── package.json
├── package-lock.json 
└── README.md
 ```
 
<h2>Project Status</h2>
<hr><p>This project is still in progress</p>
<h2>Features that can be added</h2>
<hr><ul>
<li>Set influencer categories</li>
</ul><ul>
<li>Post and get messages</li>
</ul><h2>Acknowledgement</h2>
<hr><ul>
<li>This project was inspired by our sponsor</li>
</ul><ul>
<li>Many thanks to SF dev shop and our sponsor Jose Alvarado</li>
</ul>
