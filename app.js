require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require('express');
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const validateTodo = require("./middlewares/validator");
const validateTodoPatch = require("./middlewares/validator2");
const errorHandler = require("./middlewares/errorHandler");
const { number } = require('joi');
const app = express();
app.use(express.json()); //Parse JSON bodies


const corsOptions = {
 origin: ''
};

app.use(cors(corsOptions));
app.use(logRequest);

let todos = [
 { id: 1, task: 'Finish Week 4 slides', completed: false},
 { id: 2, task: 'Deploy API (today!)', completed: false},
];

app.get('/', (req, res) => {
 res.send('Todo API Ready!');
});

app.get('/todos', (req, res) => res.status(200).json(todos));

//POST new
app.post('/todos', validateTodo, (req, res, next) => {
 try {
  const {task} = req.body;
  if (!task || task.length <= 2) {
   return res.status(400).json({message: 'Task required'})
  };
  const newTodo = { id: todos.length + 1, task, completed: false};
  todos.push(newTodo);
  res.status(201).json(newTodo);
 } catch (error) {
  next(error);
 };
});

app.get('/todos/:id', (req, res, next) => {
 try {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
   throw new Error('Invalid ID');
  }
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
   return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
 } catch (error) {
  next(error);
 };
});

//PATCH Update
app.patch('/todos/:id', validateTodoPatch, (req, res, next) => {
 try {
  const id = parseInt(req.params.id);
  const todo = todo.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not Found'});
  Object.assign(todo, req.body);
  res.status(200).json(todo);
 } catch (error) {
  next();
 }
});

//DELETE 
app.delete('/todos', (req, res,next) => {
 try {
  const id = parseInt(req.params.id);
  const lenBefore = todos.length;
  todo = todos.filter((t) => t.id !== id);
  if (todos.length === lenBefore)
   return res.status(404).json({error: 'Not found'});
  res.status(204).send();
 } catch (error) {
  next();
 }
});

app.get('./todos/completed', (req, res, next) => {
 try{
  const completed = todos.filter((t) => t.completed);
  res.json(completed); //Custom Read!
 } catch (error) {
  next(error);
 }
});



//app.use(errorHandler);

app.listen(PORT, () => {
 console.log(`API is live on ${PORT}`)
});