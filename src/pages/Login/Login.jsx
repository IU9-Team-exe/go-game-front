import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { loginUser } from "../../store/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.user);

    const handleLogin = (data) => {
        // data: { email, password }
        dispatch(loginUser(data));
    };

    return (
        <div>
            <AuthForm onSubmit={handleLogin} error={error} isLoading={isLoading} />
        </div>
    );
};

export default Login;
