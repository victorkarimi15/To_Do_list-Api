const User = require('../model/userModel.js');


const postTask = async (req,res,next) => {
    const task = req.body;

    if(!task) return res.status(400).json({'message': 'Task required!'});

    try{
        const currentUser = await User.findOne({_id:req.user.id});

        if(!currentUser) return res.status(404).json({'message': 'User not found'});

        const allTasks = [...currentUser.task,task];
        currentUser.task = allTasks;
        
        await currentUser.save();

        res.status(200).json({'message': 'Task added succesfully'});
    }catch (err) {

        console.log('Error adding task:', err);
        res.status(500).json({ 'message': 'Server error' });
    }
};


const deleteTask = async(req,res) => {
    if (!req.params.id) return res.sendStatus();

    const id = req.params.id.split('')[1];

    try{
        const currentUser = await User.findOne({_id:req.user.id});
        
        if(!currentUser) return res.staus(404).json({'message': 'User not found'});

        const task  = currentUser.task[id-1];

        await currentUser.updateOne({$pull: {'task': {'title': task.title}}});

        res.status(200).json({'message': 'Task deleted Successfully!'});
    }catch(err) {

        console.error();
        res.status(500).json({'message': 'Server error'})
    }
}
const getTask = async(req,res,next) => {
    if (!req.params.id) return res.sendStatus();

    const id = req.params.id.split('')[1];

    try{
        const currentUser = await User.findOne({_id:req.user.id});
        
        if(!currentUser) return res.staus(404).json({'message': 'User not found'});

        const task  = currentUser.task[id-1];

        res.status(200).json(task);
    }catch(err) {

        console.error();
        res.status(500).json({'message': 'Server error'})
    }
}

const getAllTasks = async(req,res) => {
    const userId = req.user.id;

    if(!userId) return res.status(404).json({'message': 'User not found'});
    
    try{
        const currentUser = await User.findOne({_id:userId});
        const tasks = currentUser.getAllTasks();

        res.status(200).send(tasks);
    } catch(err) { 

        console.error('Error fetching user tasks:', err);
        res.status(500).json({ 'message': 'server error'});
    }
};

module.exports = {postTask,getTask,deleteTask,getAllTasks};