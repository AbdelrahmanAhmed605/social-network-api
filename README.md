# social-network-api
NoSQL database with API requests for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

# Social Network API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The primary goal of this project is to develop the backend for a sample social network. The project involves creating a NoSQL database with API requests for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. To construct the NoSQL database, MongoDB was utilized along with the Mongoose npm package as a tool for implementation. The Mongoose DB contains schemas and models that represent components of our social network. Schemas were created for the network's Users, Thoughts, and Reactions, with each schema defining the relevant fields and their properties. To establish our associations, we create subdocuments within the schemas that reference other models. Finally, the project creates API routes to support CRUD (create, read, update, and delete) operations on the Mongoose database. During this project, Abdelrahman learnt the following skills:
- Creating NoSQL Mongoose schemas and their models
- Creating Subdocuments within a schema to reference other models through their id attribute
- Creating Subdocuments within a schema to reference other schemas to define the subdocuments properties
- Creating Middleware functions that run before or after certain events occur, such as validating, saving, or removing a document.
- Creating virtuals (computed additional properties defined on a schema) to provide a convenient way to manipulate and format data before it is sent to the client.
- Utilized various MongoDB update operators such as $pull, $addToSet, and $set in conjunction with Mongoose to implement CRUD (Create, Read, Update, Delete) operations on my database."

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Installation

As the project does not use publishing softwares like Heroku and is only availabe in the command line, the user will have to install the project packages (express, mongoose). To install these packages, the user must navigate to the main directory of the project where the package.json file is contained and run the command `npm i` or `npm install` in the terminal. Once that is completed, the user must run the command `npm start` or `node server` to start the application.

## Usage

For a walkthrough of how to use the application, refer to the following demonstration: https://drive.google.com/file/d/10htpw5hzzb9v6kEbSiTBVtyR9mRi2w1E/view

To use the application, the user must follow the installation instructions and create the necessary database. Once the packages are installed and the database is created, the user can run the application by entering `npm start` in the terminal. To perform CRUD operations, the user can use an API client or REST API client, such as Insomnia or Postman. The user can access the following routes to manipulate the database:

GET requests:

http://localhost:3001/api/users/ to view all users in the database <br/>
http://localhost:3001/api/thoughts/ to view all thoughts in the database <br/>
http://localhost:3001/api/users/:userId to view a single user with the specificed userId <br/>
http://localhost:3001/api/thoughts/:thoughtId a single thought with the specificed thoughtId <br/>


Note: replace :id with the id of the selected data entry (ex. http://localhost:3001/api/categories/6 to view the category with an id of 6) 
  
POST requests:

http://localhost:3001/api/users/ to create a new user in the database <br/>
http://localhost:3001/api/users/:userId/friends/:friendId to add a friend with the specified friends Id to a user with the speicified userId <br/>
http://localhost:3001/api/thoughts/ to create a new thought in the database <br/>
http://localhost:3001/api/thoughts/:thoughtId/reactions to add a reaction to a thought with the specified thoughtId

PUT requests:

http://localhost:3001/api/users/:userId to update a user with the selected userId in the database <br/>
http://localhost:3001/api/thoughts/:thoughtId to update a thought with the selected thoughtId in the database

DELETE requests:

http://localhost:3001/api/users/:userId to delete a user with the selected userId in the database <br/>
http://localhost:3001/api/users/:userId/friends/:friendId to delete a specified friend from a specified user's friend list <br/>
http://localhost:3001/api/thoughts/:thoughtId to delete a thought with the selected thoughtId in the database <br/>
http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId to delete a specific reaction from a selected thought in the database 


The required formatting of the body for POST and PUT requests are as shown below:

  
User: <br/>
{ <br/>
  "category_name" : "`<insert user's username>`" <br/>
  "email": "`<insert user's email>`" <br/>
} <br/>
  
  
Thought: <br/>
{ <br/>
  "thoughtText": "`<insert product name>`", <br/>
  "username": `<insert username of user that the thought will belong to>`, <br/>
  "userId": `<insert userId of user that the thought will belong to>`, <br/>
  } <br/>
  
Reaction: <br/>
{ <br/>
    "reactionBody": "`<insert body/text of the reaction>`", <br/>
    "username": "`<inssert username of user that is creating the reaction>`" <br/>
} 


## License

This project is licensed under the MIT License. To see the license permissions for commercial and non-commercial use, modification, and distribution of the software, please see the full text of the license, available at https://opensource.org/licenses/MIT.

## How to Contribute

N/A

## Tests

N/A

## Questions

If you have any questions regarding this application, feel free to reach me at abdelrahman.ahmed605@hotmail.com with the subject title "Questions for Social Network API"
You can also find me on github here: https://github.com/AbdelrahmanAhmed605


