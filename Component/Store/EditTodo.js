import { createSlice } from "@reduxjs/toolkit";

const EditTodo = createSlice({
  name: "editTodo",
  initialState: {
    title: "",
    detail: "",
    complete: false,
    email: "",
  },
  reducers: {
    EditData(state, action) {
      (state.complete = action.payload.complete),
        (state.title = action.payload.title),
        (state.email = action.payload.email),
        (state.detail = action.payload.detail);
    },
    Title(state, action) {
      state.title = action.payload;
    },
    Detail(state, action) {
      state.detail = action.payload;
    },
    Email(state, action) {
      state.email = action.payload;
    },
    Complete(state, action) {
      state.complete = action.payload;
    },

    EmptyTodo(state) {
      (state.title = ""), (state.detail = ""), (state.email = "");
    },
  },
});

export const { EditData, Title, Detail, Email, Complete, EmptyTodo } =
  EditTodo.actions;

export default EditTodo.reducer;
