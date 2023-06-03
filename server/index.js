const express = require('express');
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
let bodyParser = require('body-parser')
const {taskRouter} = require('./routes/taskRouter')
const port = 3080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use('/', taskRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
