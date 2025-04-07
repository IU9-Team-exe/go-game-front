import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Offline from "../pages/Offline/Offline.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import JoinGame from "../pages/JoinGame/JoinGame.jsx";
import Game from "../pages/Game/Game.jsx";
import AI from "../pages/AI/AI.jsx";
import CreateGame from "../pages/CreateGame/CreateGame.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/offline" element={<Offline/>}/>
            <Route path="/join" element={<JoinGame />} />
            <Route path="/create" element={<CreateGame />} />
            <Route path="/game/:gameKey" element={<Game />} />
            <Route path="/ai" element={<AI />} />
            <Route path="*" element={<div>Страница не найдена</div>}/>
        </Routes>
    );
}
