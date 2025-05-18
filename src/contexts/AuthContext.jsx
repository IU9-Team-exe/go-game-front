import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useCallback,
    useMemo,
    useState,
} from "react";
import {checkAuth} from "../services/API/authApi.js";

const STORAGE_KEY = "user";
const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

const getInitialState = () => {
    try {
        const cached = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return { user: cached || null };
    } catch {
        return { user: null };
    }
};

function authReducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case CLEAR_USER:
            return { user: null };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {}, getInitialState);
    const [isAuthLoading, setAuthLoading] = useState(!!state.user);

    const login = useCallback((userData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        dispatch({ type: SET_USER, payload: userData });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        dispatch({ type: CLEAR_USER });
    }, []);

    useEffect(() => {
        if (!state.user) return;

        let cancelled = false;

        (async () => {
            try {
                await checkAuth()
            } catch {
                if (!cancelled) logout();
            } finally {
                if (!cancelled) setAuthLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // вызываем только один раз — при монтировании

    const value = useMemo(
        () => ({ user: state.user, login, logout, isAuthLoading }),
        [state.user, login, logout, isAuthLoading]
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
