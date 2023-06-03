const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
const taskRouter = new express.Router();
const task_controller = require("../controllers/taskController");


const {baseUrl} = require("../../constants");


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

taskRouter.use(express.json());
taskRouter.options('http://localhost:3000', cors(corsOptions));
taskRouter.get("/", cors(corsOptions), task_controller.welcome);
taskRouter.get("/user", cors(corsOptions), task_controller.user_ID);
taskRouter.get("/todos", cors(corsOptions), task_controller.returnTodos);
taskRouter.post('/todos', cors(corsOptions), task_controller.addTodo);
taskRouter.put('/todos', cors(corsOptions), task_controller.changeStatus);

module.exports = {taskRouter};
