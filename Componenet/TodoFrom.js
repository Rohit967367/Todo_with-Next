import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../FireBase/Firebase";
import { TodoContext } from "./TodoContext";

const TodoFrom = () => {
  const { ShowAlert, addTodo, setAddTodo } = useContext(TodoContext);

  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (!session) {
      return alert("Dear User, You are not login. Please Login!!");
    } else {
      setUserData(session.user);
    }
  }, [session]);

  // console.log(userData.email);

  const valueContainer = useRef();
  useEffect(() => {
    const checkIfClickOutside = (e) => {
      if (!valueContainer?.current?.contains(e.target)) {
        // console.log("outsider input area");
        setAddTodo({ title: "", detail: "" });
      }
      //  else {
      //   console.log("Insider input area");
      // }
    };
    // console.log("aouter sider function clicked");
    document.addEventListener("mousedown", checkIfClickOutside);

    return () => {
      // console.log("return side function clicked");
      setAddTodo({ title: "", detail: "" });

      document.addEventListener("mousedown", checkIfClickOutside);
    };
  }, []);

  const onSubmit = async () => {
    if (addTodo?.hasOwnProperty("timestamp")) {
      const updateOnCollection = doc(db, "todo", addTodo.id);
      const updatedTodo = { ...addTodo, timestamp: serverTimestamp() };
      updateDoc(updateOnCollection, updatedTodo);
      ShowAlert("info", `Your Todo is updated`);
      setAddTodo({ title: "", detail: "" });
    } else {
      const addOnCollection = collection(db, "todo");
      const addTo = await addDoc(addOnCollection, {
        ...addTodo,
        complete: false,
        email: userData.email,
        timestamp: serverTimestamp(),
      });
      ShowAlert("success", `Your Todo is Add`);
      setAddTodo({ title: "", detail: "" });
    }
  };

  return (
    <div ref={valueContainer}>
      {/* <pre>{JSON.stringify(addTodo)}</pre> */}
      <TextField
        label="Todo title"
        fullWidth
        margin="normal"
        onChange={(e) => setAddTodo({ ...addTodo, title: e.target.value })}
        value={addTodo.title}
      />
      <TextField
        label="Add Todo"
        fullWidth
        margin="normal"
        onChange={(e) => setAddTodo({ ...addTodo, detail: e.target.value })}
        value={addTodo.detail}
      />
      <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>
        {addTodo?.hasOwnProperty("timestamp") ? "Update Todo" : "Add New Todo"}
      </Button>
    </div>
  );
};

export default TodoFrom;
