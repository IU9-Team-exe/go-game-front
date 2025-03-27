export const convertCoords = (x, y, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = letters[x] || "";
    const number = boardSize - y;
    return letter + number;
};

export const parseCoords = (moveStr, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = moveStr[0];
    const num = parseInt(moveStr.slice(1), 10);
    const x = letters.indexOf(letter);
    const y = boardSize - num;
    return { x, y };
};

export const extractMoves = (sgf, boardSize) => {
    const moves = [];
    const regex = /;([BW])\[([a-z]{2})\]/gi;
    let match;
    while ((match = regex.exec(sgf)) !== null) {
        const colorChar = match[1];
        const coord = match[2];
        const x = coord.charCodeAt(0) - "a".charCodeAt(0);
        const y = coord.charCodeAt(1) - "a".charCodeAt(0);
        const coordinates = convertCoords(x, y, boardSize);
        const color = colorChar.toLowerCase();
        moves.push({ color, coordinates });
    }
    return moves;
};
