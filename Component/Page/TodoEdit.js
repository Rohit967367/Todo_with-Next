import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Database/Firebase";
import { alertTodo } from "../Store/AlertTodo";
import { EditData, Title, Detail, Complete } from "../Store/EditTodo";

const TodoEdit = (props) => {
  const { open, handleClose, data } = props;
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.edit);

  useEffect(() => {
    if (open) {
      dispatch(EditData(data));
    }
  }, [open]);

  const updatedData = {
    title: todo.title,
    detail: todo.detail,
    timestamp: serverTimestamp(),
    complete: todo.complete,
    id: data.id,
  };

  const onUpdate = (e) => {
    e.preventDefault();

    const updateFirebaseId = doc(db, "todo", data.id);

    updateDoc(updateFirebaseId, updatedData);

    dispatch(
      alertTodo({
        type: "info",
        message: `Your Todo ${todo.title} is updated!`,
      })
    );

    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title Todo"
            placeholder="Title Todo"
            type="text"
            fullWidth
            variant="standard"
            value={todo.title}
            onChange={(e) => dispatch(Title(e.target.value))}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Todo"
            placeholder="Todo"
            type="text"
            fullWidth
            variant="standard"
            value={todo.detail}
            onChange={(e) => dispatch(Detail(e.target.value))}
            multiline
          />
          <DialogActions>
            <Checkbox
              checked={todo.complete}
              value={todo.complete}
              onChange={(e) => dispatch(Complete(e.target.checked))}
              color={todo.complete ? "success" : "error"}
            />
            <label style={{ color: todo.complete ? "green" : "red" }}>
              {todo.complete ? "COMPLETE" : "INCOMPLETE"}
            </label>
          </DialogActions>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoEdit;
