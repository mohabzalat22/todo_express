const express = require('express');
const router = require('./routes/todo');
const app = express();
const port = 8000; 

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

