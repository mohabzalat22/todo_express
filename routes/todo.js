const express = require('express');
const router = express.Router();
const {read_all_tasks, read_task, create_task, update_task, delete_task} = require('../controllers/tasks')
const user = require('../controllers/user');
// CRUD operations
router
.get('/tasks', user.auth , read_all_tasks)
.get('/task/:id', read_task)
.post('/task', create_task)
.put('/task/:id', update_task)
.delete('/task/:id', delete_task);

// AUTH

router
.post('/register', user.register)
.post('/login', user.login);

router
.post('/refresh_token', (req, res)=>{
    const refresh_token = req.cookies['refresh_token'];
    if(!refresh_token){
        return res.status(401).send('Access Denied. No refresh token provided.');
    }
    try {
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
        const access_token = jwt.sign({user: decoded.user}, process.env.ACCESS_TOKEN_SECRET);
        res
        .header('authorization', access_token)
        .send(decoded.user);
    } catch (error) {
        return res.status(400).send('Invalid refresh token.');
    }
});

module.exports = router;