const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require('express');
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const validateTodo = require("./middlewares/validator");
const validateTodoPatch = require("./middlewares/validator2");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./database/db");
const todoSchema = require("./models/todo.model");
const { number } = require('joi');
const Todo = require('./models/todo.model');
connectDB();
const app = express();
app.use(express.json()); //Parse JSON bodies


const corsOptions = {
 origin: ''
};

app.use(cors(corsOptions));
app.use(logRequest);


app.get('/', (req, res) => {
 res.send('Todo API Ready!');
});

app.get('/todos', async (req, res, next) => {
 const todos = await Todo.find({});
 res.status(200).json(todos);
});

app.get('/todos/active', (req, res, next) => {
 const activeTodos = todos.filter((t) => t.completed === false);

 res.status(200).json(activeTodos);
});

app.get('./todos/completed', async (req, res, next) => {
 try{
  const completed = await todos.filter((t) => t.completed);
  res.json(completed); //Custom Read!
 } catch (error) {
  next(error);
 }
});

app.get('/todos/:id', async (req, res, next) => {
 try {
  
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
   return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
 } catch (error) {
  next(error);
 };
});

//POST new
app.post('/todos', validateTodo, async (req, res, next) => {
 const { task, completed } = req.body
 const newTodo = new Todo ({
  //id: Todo.length + 1, ...req.body,
  task,
  completed: false,
 });
 
 await newTodo.save();
 try {
  res.status(201).json(newTodo);
 } catch (error) {
  next(error);
 }; 
});
 /*try {
  const {task, completed} = newTodo(req.body;
  if (!task || task.length <= 2) {
   return res.status(400).json({message: 'Task required'})
  };
  const newTodo = { id: todos.length + 1, task, completed: false};
  todos.push(newTodo);
  res.status(201).json(newTodo);
 } catch (error) {
  next(error);
 };
});*/



//PATCH Update
app.patch('/todos/:id', validateTodoPatch, async (req, res, next) => {
 try {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
   new: true
 });
  if (!todo) {
   return res.status(404).json({ message: 'Todo not found' });
  }
  res.status(200).json(todo);
 } catch (error) {
  next();
 }
});

//DELETE 
app.delete('/todos', async (req, res,next) => {
 try {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
   return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json({message: `Todo ${req.params.id} deleted`});
 } catch (error) {
  next();
 }
});





app.use(errorHandler);

app.listen(PORT, () => {
 console.log(`API is live on ${PORT}`)
});