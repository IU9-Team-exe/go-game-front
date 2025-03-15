import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, registerRequest } from "../../services/API/authApi";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await loginRequest(email, password);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Ошибка при авторизации");
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async ({ email, nickname, password }, { rejectWithValue }) => {
        try {
            const data = await registerRequest(email, nickname, password);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Ошибка при регистрации");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Логин
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Регистрация
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
