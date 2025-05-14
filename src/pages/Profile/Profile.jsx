import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
    const navigate = useNavigate();
    const { login } = useAuth();



    return (
        <div className="main-container">
        </div>
    );
};

export default Profile;