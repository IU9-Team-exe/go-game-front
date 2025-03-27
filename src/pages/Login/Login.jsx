import React from "react";

import AuthForm from "../../components/AuthForm/AuthForm";

const Login = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { error, isLoading } = useSelector((state) => state.user);

    const handleLogin = () => {
        // dispatch(loginUser({ Username: data.login, Password: data.password }))
        //     .unwrap()
        //     .then(() => {
        //         navigate("/");
        //     })
        //     .catch((err) => {
        //         console.error("Ошибка при логине", err);
        //     });
    };

    return (
        <div>
            <AuthForm onSubmit={handleLogin} />
        </div>
    );
};

export default Login;
