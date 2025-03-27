import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register = () => {
    // const dispatch = useDispatch();
    // const { error, isLoading } = useSelector((state) => state.user);

    const handleRegister = () => {
        // data: { email, nickname, password }
        // dispatch(registerUser(data));
    };

    return (
        <div>
            <RegisterForm onSubmit={handleRegister}/>
        </div>
    );
};

export default Register;
