import { configureStore } from "@reduxjs/toolkit";
import AlertTodo from "./AlertTodo";
import EditTodo from "./EditTodo";
import InfoTodo from "./InfoTodo";

const Store = configureStore({
  reducer: { edit: EditTodo, alert: AlertTodo, info: InfoTodo },
});

export default Store;
