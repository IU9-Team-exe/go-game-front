import React from "react";
import { Routes, Route } from "react-router-dom"; // Removed BrowserRouter import
import Home from "../pages/Home/Home";
import Offline from "../pages/Offline/Offline.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import JoinGame from "../pages/JoinGame/JoinGame.jsx";
import Game from "../pages/Game/Game.jsx";
import AI from "../pages/AI/AI.jsx";
import CreateGame from "../pages/CreateGame/CreateGame.jsx";
import ArchivePage from "../pages/Archive/Archive.jsx";
import ArchiveGame from "../pages/ArchiveGame/ArchiveGame.jsx";
import AnalyzeGamePage from "../pages/AnalyzeGame/AnalyzeGame.jsx"; // Import the new page

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
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/archive/game/:gameId" element={<ArchiveGame />} />
            {/* Add route for analysis */}
            <Route path="/analyze/:gameId" element={<AnalyzeGamePage />} />
            {/* Fallback route */}
            <Route path="*" element={<div style={{textAlign: 'center', padding: '2rem', fontSize: '1.2rem'}}>Страница не найдена (404)</div>}/>
        </Routes>
    );
}