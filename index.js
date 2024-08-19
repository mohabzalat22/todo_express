const express = require('express');
const cookieParser = require('cookie-parser');

const router = require('./routes/todo');
const app = express();
const port = 8000; 

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

