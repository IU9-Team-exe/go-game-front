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
import {getUserByNickname} from "../services/API/profileApi.js";

const STORAGE_KEY = "user";
const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

const getInitialState = () => {
    try {
        const cached = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return {user: cached || null};
    } catch {
        return {user: null};
    }
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
    const [isAuthLoading, setAuthLoading] = useState(!!state.user);

    const login = useCallback(async (userData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        dispatch({ type: SET_USER, payload: userData });

        try {
            await checkAuth();

            const resp = await getUserByNickname(userData.username);
            if (resp.data?.Status === 200) {
                const b = resp.data.Body;
                const fullUser = {
                    id: b.id,
                    username: b.Username,
                    email: b.email,
                    createdAt: b.created_at,
                    updatedAt: b.updated_at,
                    isGhost: b.is_ghost,
                    rating: b.rating,
                    coins: b.coins,
                    statistic: b.statistic,
                    passwordHash: b.PasswordHash,
                    passwordSalt: b.PasswordSalt,
                    doneTasksIds: b.done_tasks_ids,
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
                dispatch({ type: SET_USER, payload: fullUser });
            }
        } catch (err) {
            console.error("Ошибка при получении профиля:", err);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        dispatch({type: CLEAR_USER});
    }, []);

    useEffect(() => {
        if (!state.user) {
            setAuthLoading(false);
            return;
        }

        let cancelled = false;

        (async () => {
            try {
                await checkAuth()
                const resp = await getUserByNickname(state.user.username);
                if (resp.data?.Status === 200) {
                    const b = resp.data.Body;
                    const fullUser = {
                        id: b.id,
                        username: b.Username,
                        email: b.email,
                        createdAt: b.created_at,
                        updatedAt: b.updated_at,
                        isGhost: b.is_ghost,
                        rating: b.rating,
                        coins: b.coins,
                        statistic: b.statistic,
                        passwordHash: b.PasswordHash,
                        passwordSalt: b.PasswordSalt,
                        doneTasksIds: b.done_tasks_ids,
                    };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
                    dispatch({type: SET_USER, payload: fullUser});
                }
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
    }, []);

    const value = useMemo(
        () => ({user: state.user, login, logout, isAuthLoading}),
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
