import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../Redux/Action.js";
import {
  Box,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task.trim()) {
      const isDuplicate = todos.some(
        (todo) => todo.task.toLowerCase() === task.toLowerCase()
      );
      if (isDuplicate) {
        alert("Task already exists!");
        return;
      }
      dispatch(addTodo(task));
      setTask("");
    }
  };

  const handleEditTodo = (id, updatedTask) => {
    dispatch(toggleTodo({ id, task: updatedTask }));
    setEditTask(null);
  };

  const handleDeleteConfirmation = (id) => {
    setShowDialog(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(deleteTodo(deleteId));
    setShowDialog(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setDeleteId(null);
  };

  const handleMarkAsDone = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        mx: "auto",
        p: 3,
        mt: 5,
        boxShadow: 4,
        borderRadius: 2,
        bgcolor: "#1e1e1e",
        color: "#ffffff",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        ToDo App
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          sx={{
            bgcolor: "#2c2c2c",
            input: { color: "#ffffff" },
            borderRadius: 1,
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddTodo}
          sx={{
            bgcolor: "#1976d2",
            color: "#ffffff",
            "&:hover": { bgcolor: "#115293" },
          }}
        >
          Add
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Pending Tasks
      </Typography>
      <List>
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                mb: 1,
                p: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: "#2c2c2c",
              }}
              secondaryAction={
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleMarkAsDone(todo.id)}
                      sx={{
                        bgcolor: "#4caf50",
                        color: "#ffffff",
                        "&:hover": { bgcolor: "#388e3c" },
                      }}
                    >
                      Done
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="primary"
                      onClick={() => setEditTask(todo.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteConfirmation(todo.id)}
                      sx={{ color: "#f44336" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              }
            >
              {editTask === todo.id ? (
                <TextField
                  defaultValue={todo.task}
                  size="small"
                  fullWidth
                  onBlur={(e) =>
                    handleEditTodo(todo.id, e.target.value.trim() || todo.task)
                  }
                  sx={{
                    input: { color: "#ffffff" },
                    bgcolor: "#424242",
                  }}
                />
              ) : (
                <Typography>{todo.task}</Typography>
              )}
            </ListItem>
          ))}
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Completed Tasks
      </Typography>
      <List>
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                mb: 1,
                p: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: "#1b5e20",
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteConfirmation(todo.id)}
                  sx={{ color: "#f44336" }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "#bdbdbd",
                  flexGrow: 1,
                }}
              >
                {todo.task}
              </Typography>
              <CheckCircleIcon sx={{ color: "#4caf50" }} />
            </ListItem>
          ))}
      </List>

      <Dialog open={showDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} sx={{ color: "#ffffff" }}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              bgcolor: "#f44336",
              color: "#ffffff",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoApp;
