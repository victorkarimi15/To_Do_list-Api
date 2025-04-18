const express = require('express');
const {postTask,getTask,deleteTask,getAllTasks} = require('../controller/taskController.js');
const User = require('../model/userModel.js');

const router = express.Router();

router.put('/', postTask);

router.get('/all_tasks', getAllTasks);

router.route('/:id')
    .get(getTask)
    .delete(deleteTask);

module.exports = router;