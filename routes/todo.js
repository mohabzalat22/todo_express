const express = require('express');
const router = express.Router();
const {read_all_tasks, read_task, create_task, update_task, delete_task} = require('../controllers/tasks')

// CRUD operations
router
.get('/tasks', read_all_tasks)
.get('/task/:id', read_task)
.post('/task', create_task)
.put('/task/:id', update_task)
.delete('/task/:id', delete_task);


module.exports = router;