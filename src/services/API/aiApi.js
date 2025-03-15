export const callAiMove = async (sgf, move) => {
    const response = await fetch("/api/ai/move", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sgf, move }),
    });

    if (!response.ok) {
        throw new Error("Ошибка вызова API ИИ");
    }
    const data = await response.json();
    return data;
};
