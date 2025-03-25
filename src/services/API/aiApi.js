export const callAiMove = async (sgf, moves) => {
    const payload = {
        board_size: 19,
        moves,
    };

    const response = await fetch(" http://localhost:8083/select-move/katago_gtp_bot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Ошибка вызова API ИИ");
    }
    const data = await response.json();
    return data;
};
