import React, { Fragment, useContext } from "react";
import { IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../FireBase/Firebase";
import { TodoContext } from "./TodoContext";
import { useRouter } from "next/router";

const TodoItem = (props) => {
  const { id, title, detail, complete, timestamp } = props;

  const { ShowAlert, setAddTodo } = useContext(TodoContext);

  const deleteTodo = async (e, id) => {
    e.stopPropagation();

    const connectToDB = doc(db, "todo", id);
    await deleteDoc(connectToDB);

    ShowAlert("error", `Your Todo is deleted`);
  };

  const router = useRouter();
  const seeMore = (id, e) => {
    e.stopPropagation();

    router.push(`/todos/${id}`);
  };
  return (
    <ListItem
      ///for edit
      onClick={() => setAddTodo({ id, title, detail, complete, timestamp })}
      //

      alignItems="flex-start"
      secondaryAction={
        <>
          <IconButton onClick={(e) => deleteTodo(e, id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={(e) => seeMore(id, e)}>
            <EditIcon />
          </IconButton>
        </>
      }
    >
      {/* <ListItemAvatar></ListItemAvatar> */}
      <ListItemText
        primary={title}
        secondary={
          <Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {moment(timestamp).format("MMM Do YY")}
            </Typography>
            {detail}
          </Fragment>
        }
      />
    </ListItem>
  );
};

export default TodoItem;
