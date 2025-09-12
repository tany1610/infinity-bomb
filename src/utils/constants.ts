import "../style.scss";
import { getCssVar, getCssVarAsHex } from "./helpers";

const BOMB_PANEL_SIZE = 200;

export const FONT_FAMILY = "VT323";

export const MENU_CONFIG = {
    title: {
        text: "Infinity Bomb",
        fontSize: "32px",
        color: getCssVar("--text-color"),
        position: { xRatio: 0.5, yRatio: 0.1 },
    },
    button: {
        fontSize: "24px",
        color: getCssVar("--primary-text-light"),
        letterSpacing: 1,
        padding: { x: 20, y: 10 },
        position: { xRatio: 0.5, yRatio: 0.25 },
        spacing: 0.12,
        align: "center",
    },
};

export const WIRE_COLORS = {
    red: getCssVarAsHex("--red-wire"),
    blue: getCssVarAsHex("--blue-wire"),
    green: getCssVarAsHex("--green-wire"),
    yellow: getCssVarAsHex("--yellow-wire"),
    purple: getCssVarAsHex("--purple-wire"),
    black: getCssVarAsHex("--black-wire"),
};

export const GAME_CONFIG = {
    header: {
        position: { xRatio: 0.5, y: 30 },
        backgroundColor: getCssVarAsHex("--background-color"),
        height: 60,
        origin: 0.5,
        lives: {
            x: 50,
            y: 20,
            text: "Fuses:",
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
        coins: {
            x: 200,
            y: 20,
            text: "Coins:",
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
        skips: {
            x: 350,
            y: 20,
            text: "Skips:",
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
    },
    bombPanel: {
        size: BOMB_PANEL_SIZE,
        position: { xRatio: 0.5, yRatio: 0.5 },
        offsetX: -(BOMB_PANEL_SIZE / 2),
        offsetY: -50,
        backgroundColor: getCssVarAsHex("--background-color"),
        text: {
            label: "Bomb Panel",
            position: { xRatio: 0.5, yRatio: 0.5 },
            offsetX: -(BOMB_PANEL_SIZE / 2),
            offsetY: -120,
            origin: 0.5,
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
        wire: {
            position: { xRatio: 0.5, yRatio: 0.5 },
            offsetX: -(BOMB_PANEL_SIZE / 2),
            offsetY: -50,
            width: 100,
            height: 10,
            color: WIRE_COLORS.red,
        },
        buttons: {
            cut: {
                position: { xRatio: 0.5, yRatio: 0.5 },
                width: 80,
                height: 40,
                offsetX: -(BOMB_PANEL_SIZE / 2) - 50,
                offsetY: 100,
                backgroundColor: getCssVarAsHex("--background-color"),
                text: {
                    origin: 0.5,
                    label: "CUT",
                    style: {
                        fontSize: "20px",
                        color: getCssVar("--primary-text-light"),
                        fontFamily: FONT_FAMILY,
                    },
                },
            },
            skip: {
                position: { xRatio: 0.5, yRatio: 0.5 },
                width: 80,
                height: 40,
                offsetX: -(BOMB_PANEL_SIZE / 2) + 50,
                offsetY: 100,
                backgroundColor: getCssVarAsHex("--background-color"),
                text: {
                    origin: 0.5,
                    label: "SKIP",
                    style: {
                        fontSize: "20px",
                        color: getCssVar("--primary-text-light"),
                        fontFamily: FONT_FAMILY,
                    },
                },
            },
        },
    },
    shop: {
        position: { xRatio: 1, yRatio: 0.5 },
        offsetX: -120,
        width: 200,
        height: 300,
        backgroundColor: getCssVarAsHex("--background-color"),
        text: {
            origin: 0.5,
            label: "Blast Shop",
            offsetY: -123,
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
    },
    inventory: {
        height: 80,
        position: { xRatio: 0.5, yRatio: 1 },
        offsetY: -30,
        backgroundColor: getCssVarAsHex("--background-color"),
        slots: {
            count: 6,
            width: 40,
            height: 40,
            spacing: 50,
            offsetX: 120,
            offsetY: -30,
            backgroundColor: getCssVarAsHex("--primary-grey"),
        },
    },
};
