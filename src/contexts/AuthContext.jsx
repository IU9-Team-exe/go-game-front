import React, {createContext, useReducer, useContext, useEffect, useMemo} from "react";

const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

const getInitialState = () => {
    const storedUser = localStorage.getItem("user");
    return {user: storedUser ? JSON.parse(storedUser) : null};
};

function authReducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload};
        case CLEAR_USER:
            return {user: null};
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {}, getInitialState);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("user");
        }
    }, [state.user]);

    const login = (userData) => dispatch({type: SET_USER, payload: userData});
    const logout = () => dispatch({type: CLEAR_USER});

    const value = useMemo(
        () => ({user: state.user, login, logout}),
        [state.user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
