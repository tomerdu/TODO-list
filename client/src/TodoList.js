// TodoList.js
import React, { useState } from "react";
import axios from "axios";
import "./TodoList.css";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";

const TodoList = ({ todos, addTodo, getTodo }) => {
    axios.defaults.withCredentials = true;
    const baseURL = "http://localhost:3080";

  const [newTitle, setNewTitle] = useState([]);

    const handleDone = (id) => {
        axios
            .put(
                `${baseURL}/todos`,
                {
                    todo: { id },
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                    },
                }
            )
            .then((response) => {
                if (response.data) {
                    getTodo();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        data-testid="todoListing-title"
      >
        TODO list
      </Typography>
      {todos.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          data-testid="todoListing-notodosAvailable"
        >
          No todos available.
        </Typography>
      ) : (
        <List data-testid={"todoListing-list"}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              className={todo.done ? "done" : "todo"}
            >
              <ListItemText
                primary={todo.title}
                secondary={todo.author}
                data-testid={`todoListing-todo-${todo.id}`}
              />
              <ToggleButtonGroup
                color="primary"
                value={todo.done ? "done" : "todo"}
                exclusive
                onChange={() =>
                    handleDone(todo.id)
                }
              >
                <ToggleButton value="done">Done</ToggleButton>
                <ToggleButton value="todo">Todo</ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
          ))}
        </List>
      )}
      <Grid item xs={12}>
        <Typography variant="h6" data-testid={`todoList-addTodo-title`}>
          Add todo
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
          data-testid={`todoList-addTodo-title`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => addTodo(newTitle)}
          data-testid={`todoList-addTodo-submitBtn`}
        >
          Submit TODO
        </Button>
      </Grid>
    </Container>
  );
};

export default TodoList;
