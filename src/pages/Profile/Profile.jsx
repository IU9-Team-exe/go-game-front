import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { getUserByNickname, updateUserData } from "../../services/API/profileApi.js";

const Profile = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        if (!user) return;
        const fetchUserInfo = async () => {
            try {
                const response = await getUserByNickname(user.username || user);
                if (response.data?.Status === 200) {
                    setUserInfo(response.data.Body);
                }
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
            }
        };

        fetchUserInfo();
    }, [user]);

    const mutation = useMutation({
        mutationFn: ({ username, email }) =>
            updateUserData(username, email),
        onSuccess: () => {
            setSuccessMsg("Профиль успешно обновлён ✅");
        },
        onError: (err) => {
            console.error("Ошибка обновления профиля:", err);
        },
    });

    const handleSave = (formData, setError) => {
        setSuccessMsg("");
        mutation.mutate(
            { username: formData.username, email: formData.email },
            {
                onError: (err) => {
                    console.error("Ошибка обновления профиля:", err);
                    setError(
                        err.response?.data?.Body?.ErrorDescription ||
                        err.message ||
                        "Не удалось сохранить изменения."
                    );
                },
            }
        );
    };

    if (!user) {
        return (
            <div className="main-container">
                <p>Необходимо авторизоваться для просмотра профиля.</p>
            </div>
        );
    }

    return (
        <div className="main-container">
            {successMsg && (
                <p
                    style={{
                        textAlign: "center",
                        color: "var(--color-primary-dark)",
                        fontWeight: "bold",
                    }}
                >
                    {successMsg}
                </p>
            )}
            <ProfileForm
                initialData={userInfo}
                onSave={handleSave}
                isLoading={mutation.isLoading}
            />
        </div>
    );
};

export default Profile;