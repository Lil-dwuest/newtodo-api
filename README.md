PROJECT NAME: Todo API

1. Project Overview
   A RESTful API built with Node.js and Express.js for managing todo records. It aims at helping individuals manage tasks effectively. It is designed for everybody who wants to keep tracks of their daily tasks

2. Features
   • View all registered Todo
   • Add a new Todo
   • View an individual Todo record
   • Update a Todo's information
   • Delete a Todo record

3. Technologies Used
   • Node.js
   • Express.js
   • JavaScript

4. Project Structure
   todo-api-simple/
   ├── routes/
   ├── middleware/
   ├── .env
   ├── .gitignore
   ├── package.json
   ├── app.js
   └── README.md

5. Installation and Setup
   Clone the repository:
   git clone (https://github.com/Lil-dwuest/newtodo-api)

Navigate into the project:
cd todo-api-simple

Install dependencies:
npm install

6. Running the Application
   Start the development server:
   npm run dev
   Or use the production start command:
   npm start

7. API Documentation

Method Endpoint Purpose
GET /todos Get all todos
GET /todos/:id Get a particular todo
POST /todos Add a todo
PATCH /todos/:id Update a todo
DELETE /todos/:id Delete a todo

8. Request and Response Examples
   Create a Resource

POST `/api/resource`

Request body:
{
"task": "do washing plates"
"completed": "false"
}

Example successful response:
(
newTodo
)

9. Deployment

Live URL: https://newtodo-api-nelson.onrender.com/

GitHub: https://github.com/Lil-dwuest/newtodo-api
