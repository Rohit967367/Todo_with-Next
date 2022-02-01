import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { TodoTextField } from "./TodoTextField";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Database/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { alertTodo } from "../Store/AlertTodo";
import Classes from "./Todo.module.css";

const TodoFrom = () => {
  const [todoValue, setTodoValue] = useState({ title: "", detail: "" });

  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.info);

  const onSubmit = async (e) => {
    e.preventDefault();

    const connectedFirebase = collection(db, "todo");
    await addDoc(connectedFirebase, {
      ...todoValue,
      complete: false,
      email: userdata.email,
      timestamp: serverTimestamp(),
    });

    dispatch(
      alertTodo({
        type: "success",
        message: `Your Todo ${todoValue.title} is added!`,
      })
    );
    setTodoValue({ title: "", detail: "" });
  };
  return (
    <div>
      <Container maxWidth={"md"}>
        <Box
          component="form"
          noValidate
          alignContent={"center"}
          justifyContent={"center"}
          sx={{
            display: "grid",
            gridTemplateColumns: "0.8fr 0fr",
            gap: 1,
          }}
        >
          <TodoTextField
            label="Todo Title"
            placeholder="Todo Title"
            variant="filled"
            style={{ marginTop: 11 }}
            onChange={(e) =>
              setTodoValue({ ...todoValue, title: e.target.value })
            }
            value={todoValue.title}
          />
          <br />
          <TodoTextField
            label="Todo"
            placeholder="Todo"
            variant="filled"
            multiline
            style={{ marginTop: 11 }}
            onChange={(e) =>
              setTodoValue({ ...todoValue, detail: e.target.value })
            }
            value={todoValue.detail}
          />
        </Box>
        <div className={Classes.button}>
          <Button variant="contained" onClick={onSubmit}>
            submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default TodoFrom;
