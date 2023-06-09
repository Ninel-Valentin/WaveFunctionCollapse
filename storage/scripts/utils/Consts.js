export default class Consts {
    static tileBorderlessSize = 96; // 64 + 32
    static tileSize = 98; // + border(1|1)

    static direction = {
        N: "N",
        E: "E",
        S: "S",
        W: "W"
    };

    static hexToTile = {
        "grass": [
            "#4f772c",
            "#90a955"
        ],
        "sand": [
            "#be8b38",
            "#f2bf6b"
        ],
        "water": [
            "#639bff",
            "#84acf3"
        ]
    };
};