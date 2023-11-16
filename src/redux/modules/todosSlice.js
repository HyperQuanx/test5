// /modules/todosSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    // 여기에 비동기 작업을 수행하고, 성공 시에는 payload를 반환하면 됩니다.
    await waitTwoSeconds(); // 2초 지연
    return payload;
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteTodo",
  async (id, thunkAPI) => {
    // 여기에 비동기 작업을 수행하고, 성공 시에는 id를 반환하면 됩니다.
    await waitTwoSeconds(); // 2초 지연
    return id;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
