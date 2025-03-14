import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGameById } from "../../services/gameService";

const initialState = {
    currentGame: null,
    loading: false,
    error: null,
};

// Пример асинхронного thunk, который получает игру по ID
export const fetchGameById = createAsyncThunk(
    "game/fetchGameById",
    async (gameId, { rejectWithValue }) => {
        try {
            const response = await getGameById(gameId);
            return response.data; // Предполагаем, что сервер возвращает данные игры в response.data
        } catch (error) {
            // Если сервер вернёт ошибку, прокидываем её дальше
            return rejectWithValue(error.response?.data || "Ошибка при загрузке игры");
        }
    }
);

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        // Пример ручной установки игры
        setGame(state, action) {
            state.currentGame = action.payload;
        },
        // Сброс данных игры
        resetGame(state) {
            state.currentGame = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGameById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGame = action.payload;
            })
            .addCase(fetchGameById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Не удалось загрузить игру";
            });
    },
});

export const { setGame, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
