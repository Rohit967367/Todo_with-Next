import { createSlice } from "@reduxjs/toolkit";

const InfoTodo = createSlice({
  name: "userInfo",
  initialState: {
    name: null,
    image: null,
    email: null,
  },
  reducers: {
    userDetail(state, action) {
      (state.name = action.payload.name),
        (state.image = action.payload.image),
        (state.email = action.payload.email);
    },
    userDelete(state) {
      (state.email = ""), (state.image = ""), (state.email = "");
    },
  },
});

export const { userDetail, userDelete } = InfoTodo.actions;

export default InfoTodo.reducer;
