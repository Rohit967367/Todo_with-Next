import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Database/Firebase";
import TodoEdit from "./TodoEdit";
import { useDispatch } from "react-redux";
import { alertTodo } from "../Store/AlertTodo";

const TodoItem = (props) => {
  const { id, timestamp, title, detail, complete } = props;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const deleteItem = async (e, id) => {
    e.stopPropagation();

    const connectedFirebase = doc(db, "todo", id);

    await deleteDoc(connectedFirebase);

    dispatch(
      alertTodo({ type: "error", message: `You Todo ${title} is deleted!` })
    );
  };
  return (
    <Fragment>
      <TodoEdit open={open} handleClose={handleClose} data={props} />
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ minWidth: 270 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {moment(timestamp).format("D MM Y")}
              </Typography>
              <Typography variant="body2">{detail}</Typography>
              <Typography
                style={{ color: complete ? "green" : "red", fontSize: "10px" }}
              >
                {complete ? "COMPLETED" : "INCOMPLETE"}
              </Typography>
            </CardContent>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid>
                <CardActions onClick={(e) => deleteItem(e, id)}>
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </CardActions>
              </Grid>
              <Grid>
                <CardActions onClick={handleClickOpen}>
                  <Button variant="contained" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default TodoItem;
