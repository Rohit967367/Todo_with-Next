//www.todo.com

import {
  Alert,
  Avatar,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import Login from "../Componenet/Login";
import { TodoContext } from "../Componenet/TodoContext";
import TodoFrom from "../Componenet/TodoFrom";
import TodoList from "../Componenet/TodoList";
import { auth } from "../FireBase/Firebase";
import { useSession, signOut } from "next-auth/react";

function todo() {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  ///transfor from Todoform
  const [addTodo, setAddTodo] = useState({ title: "", detail: "" });

  const ShowAlert = (alertType, message) => {
    setAlertType(alertType);
    setMessage(message);
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { data: session } = useSession();

  const [names, setName] = useState([]);
  const [image, setImage] = useState("");
  useEffect(() => {
    if (session) {
      setName(session.user);
      setImage(session.user.image);
    }
  }, [session]);

  const logOutButton = () => {
    signOut();
  };

  if (!session) {
    return <Login />;
  } else {
    return (
      <TodoContext.Provider value={{ ShowAlert, addTodo, setAddTodo }}>
        <Container maxWidth="sm">
          <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={3}>
            <IconButton onClick={logOutButton}>
              <Avatar src={names.image || image}></Avatar>
            </IconButton>
            <Typography variant="h5">{names.name}</Typography>
          </Box>
          <TodoFrom />

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={alertType}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <TodoList />
        </Container>
      </TodoContext.Provider>
    );
  }
}

export default todo;
