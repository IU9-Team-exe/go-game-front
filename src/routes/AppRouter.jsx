import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Offline from "../pages/Offline/Offline.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/offline" element={<Offline/>}/>
            <Route path="*" element={<div>Страница не найдена</div>}/>
        </Routes>
    );
}
