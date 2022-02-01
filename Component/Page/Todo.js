import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoAlert from "../Add/TodoAlert";
import TodoFrom from "./TodoFrom";
import TodoHead from "./TodoHead";
import TodoList from "./TodoList";

const Todo = () => {
  const [open, setOpen] = useState(false);

  const todoData = useSelector((state) => state.alert);

  useEffect(() => {
    if (todoData.message !== "") {
      setOpen(true);
    }
  }, [todoData]);
  return (
    <div>
      {open && (
        <TodoAlert
          open={open}
          msg={todoData.message}
          type={todoData.type}
          setOpen={setOpen}
        />
      )}
      <TodoHead />
      <TodoFrom />
      <TodoList />
    </div>
  );
};

export default Todo;
