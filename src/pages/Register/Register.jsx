import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { registerUser } from "../../store/slices/userSlice";

const Register = () => {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.user);

    const handleRegister = (data) => {
        // data: { email, nickname, password }
        dispatch(registerUser(data));
    };

    return (
        <div>
            <RegisterForm onSubmit={handleRegister} error={error} isLoading={isLoading} />
        </div>
    );
};

export default Register;
