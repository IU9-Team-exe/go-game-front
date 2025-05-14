import React, {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {useMutation} from "@tanstack/react-query";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import {getUserByNickname} from "../../services/API/profileApi.js";


const updateProfile = () =>
    console.log("123");

const Profile = () => {
    const {user} = useAuth();
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
        mutationFn: updateProfile,
        onSuccess: () => {
            setSuccessMsg("Профиль успешно обновлён ✅");
        },
    });

    const handleSave = (formData, setError) => {
        setSuccessMsg("");
        mutation.mutate(
            {
                email: formData.email,
                password: formData.PasswordHash
            },
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
            <ProfileForm
                initialData={userInfo}
                onSave={handleSave}
                isLoading={mutation.isLoading}
            />
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
        </div>
    );
};

export default Profile;