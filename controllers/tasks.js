const model = require('../models/TodoModel');
model.connect();

const create_task = async(req, res) => {
    try {
        const data = await model.create(req.body);
        res.send(data);
    } catch (error) {
        res.send("failed to create.");
    }
}

const read_all_tasks = async(req, res) => {
    try {
        const data = await model.readAll();
        res.send(data);
    } catch (error) {
        res.send("failed to read all.");
    }
}

const read_task = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await model.read_by_id(id);
        res.send(data);
    } catch (error) {
        res.send("failed to read one.");
    }
}

const update_task = async(req, res) => {
    try {        
        const id = req.params.id;
        const data = await model.update(id, req.body.todo);
        res.send(data);
    } catch (error) {
        res.send("failed to update.");
    }
}

const delete_task = async(req, res) => {
    try {        
        const id = req.params.id;
        const data = await model.remove(id);
        res.send(data);
    } catch (error) {
        
        res.send("failed to delete.");
    }
}

module.exports = {
    create_task,
    read_all_tasks,
    read_task,
    update_task,
    delete_task
}