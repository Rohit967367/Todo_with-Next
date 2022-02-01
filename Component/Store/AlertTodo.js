import { createSlice } from "@reduxjs/toolkit";

const AlertTodo = createSlice({
  name: "alertTodo",
  initialState: {
    type: "",
    message: "",
  },
  reducers: {
    alertTodo(state, action) {
      (state.type = action.payload.type),
        (state.message = action.payload.message);
    },
    closeAlert(state) {
      (state.type = ""), (state.message = "");
    },
  },
});

export const { alertTodo, closeAlert } = AlertTodo.actions;
export default AlertTodo.reducer;
