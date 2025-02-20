import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/api";

const initialState: UsersState = {
  users: [],
  searchQuery: "",
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const data = await fetchUsers();
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      // state.users.push(action.payload);
      state.users = [...action.payload, ...state.users];
    });
  },
});

export const { addUser, updateUser, deleteUser, setSearchQuery } =
  usersSlice.actions;
export default usersSlice.reducer;
