import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice"; // если у вас есть gameSlice

const store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer,
        // другие слайсы
    },
});

export default store;
