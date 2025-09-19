import "../style.scss";
import { getCssVar, getCssVarAsHex } from "./helpers";

const BOMB_PANEL_SIZE = 200;

export const FONT_FAMILY = "VT323";

export const WIRES = {
    red: "red_wire",
    blue: "blue_wire",
    green: "green_wire",
    yellow: "yellow_wire",
    purple: "purple_wire",
    black: "black_wire",
    orange: "orange_wire",
    white: "white_wire",
};

export const ITEMS_CONFIG = {
    snipMaster: {
        key: 1,
        title: "Snip Master",
        effect: "Guarantees a safe cut on the current wire",
        price: 30,
        image: "snip_master",
    },
    circuitPeek: {
        key: 2,
        title: "Circuit Peek",
        effect: "Reveals the explosion chance of the current wire",
        price: 20,
        image: "circuit_peek",
    },
    fuseKit: {
        key: 3,
        title: "Fuse Kit",
        effect: "Restores one lost fuse (max 3 fuses)",
        price: 40,
        image: "fuse_kit",
    },
    defuserDrone: {
        key: 4,
        title: "Defuser Drone",
        effect: "Don't trust yourself? This drone will cut the wire for you",
        price: 10,
        image: "defuser_drone",
    },
    greedySnip: {
        key: 5,
        title: "Greedy Snip",
        effect: "Halves the chance of the current wire exploding. If it still does, you lose 2 fuses",
        price: 30,
        image: "greedy_snip",
    },
    payday: {
        key: 6,
        title: "Payday",
        effect: "This round rewards double coins (if you survive that is)",
        price: 40,
        image: "payday",
    },
    wireSwap: {
        key: 7,
        title: "Wire Swap",
        effect: "Don't like your odds? Get a new wire",
        price: 60,
        image: "wire_swap",
    },
};

export const EVENTS = {
    GAME: {
        LOST_LIFE: "game:lostLife",
        NEXT_ROUND: "game:nextRound",
        GAME_OVER: "game:gameOver",
        SKIP: "game:skip",
    },
    SHOP: {
        ITEM_BOUGHT: "shop:itemBought",
    },
    BOMB_PANEL: {
        WIRE_POINTEROVER: "bombPanel:wireMouseOver",
        WIRE_POINTEROUT: "bombPanel:wireMouseOut",
    },
    INVENTORY: {
        ITEM_USED: "inventory:itemUsed",
        ITEM_POINTEROVER: "inventory:itemMouseOver",
        ITEM_POINTEROUT: "inventory:itemMouseOut",
    },
    UNLOCKABLE_EVENTS: {
        BLACK_MARKET_UNLOCKED: "unlockableEvents:blackMarketUnlocked",
    },
};

export const EVENT_MANAGER_EVENTS_KEYS = {
    BLACK_MARKET: "black_market",
};

export const EVENT_MAMAGER_CONFIG = {
    EVENTS: {
        [EVENT_MANAGER_EVENTS_KEYS.BLACK_MARKET]: {
            _id: EVENT_MANAGER_EVENTS_KEYS.BLACK_MARKET,
            name: "Black Market",
            description:
                "Grants access to the black market. The black market offers cheaper items, but they might not work properly",
            unlockRound: 3,
            duration: Infinity,
        },
    },
};

export const GAME_CONFIG = {
    startingCoins: 100,
    startinglives: 3,
    startingShopItems: 3,
    startingSkips: 3,
};

export const MAIN_MENU_CONFIG = {
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

export const GAME_OVER_MENU_CONFIG = {
    title: {
        text: "Game Over",
        fontSize: "32px",
        color: getCssVar("--text-color"),
        position: { xRatio: 0.5, yRatio: 0.1 },
    },
    scoreText: {
        text: "Score: ",
        fontSize: "20px",
        color: getCssVar("--text-color"),
        position: { xRatio: 0.5, yRatio: 0.2 },
    },
    button: {
        text: "Main Menu",
        fontSize: "24px",
        color: getCssVar("--primary-text-light"),
        letterSpacing: 1,
        padding: { x: 20, y: 10 },
        position: { xRatio: 0.5, yRatio: 0.3 },
        spacing: 0.12,
        align: "center",
    },
};

export const UI_CONFIG = {
    header: {
        position: { xRatio: 0.5, y: 30 },
        backgroundColor: getCssVarAsHex("--background-color-primary"),
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
            x: 140,
            y: 20,
            text: "BlastCoins:",
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
        skips: {
            x: 280,
            y: 20,
            text: "Skips:",
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
        round: {
            x: 400,
            y: 20,
            text: "Round:",
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
        backgroundColor: getCssVarAsHex("--background-color-primary"),
        text: {
            label: "Bomb Panel",
            position: { xRatio: 0.5, yRatio: 0.5 },
            offsetX: -(BOMB_PANEL_SIZE / 2),
            offsetY: -134,
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
            color: WIRES.red,
        },
        buttons: {
            cut: {
                position: { xRatio: 0.5, yRatio: 0.5 },
                width: 80,
                height: 40,
                offsetX: -(BOMB_PANEL_SIZE / 2) - 50,
                offsetY: 100,
                backgroundColor: getCssVarAsHex("--background-color-primary"),
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
                backgroundColor: getCssVarAsHex("--background-color-primary"),
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
        position: { x: 380, y: 200 },
        width: 200,
        height: 200,
        backgroundColor: getCssVarAsHex("--background-color-primary"),
        itemsSpacing: 55,
        itemsOrigin: [2, 1.3],
        text: {
            label: "Blast Shop",
            origin: [0.5, 5],
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
            titleStyle: {
                fontSize: "14px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
            descriptionStyle: {
                fontSize: "12px",
                color: getCssVar("--text-white"),
                fontFamily: FONT_FAMILY,
                wordWrap: {
                    width: 150,
                    useAdvancedWrap: true,
                },
            },
        },
        blackMarket: {
            height: 70,
            backgroundColor: getCssVarAsHex("--background-color-secondary"),
        },
    },
    inventory: {
        height: 80,
        position: { xRatio: 0.5, yRatio: 1 },
        offsetY: -30,
        backgroundColor: getCssVarAsHex("--background-color-primary"),
        slots: {
            count: 6,
            width: 50,
            height: 50,
            spacing: 60,
            offsetX: 120,
            offsetY: -30,
            backgroundColor: getCssVarAsHex("--primary-grey"),
        },
    },
    hint: {
        height: 70,
        backgroundColor: getCssVarAsHex("--primary-grey"),
        title: {
            offestY: -18,
            origin: 0.5,
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
        },
        description: {
            offestY: 9,
            origin: 0.5,
            style: {
                fontSize: "16px",
                color: getCssVar("--text-white"),
                fontFamily: FONT_FAMILY,
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true,
                },
                align: "center",
            },
        },
    },
    eventDialog: {
        background: getCssVarAsHex("--game-background"),
        infoContainer: {
            text: {
                offsetY: -20,
                origin: 0.5,
                titleStyle: {
                    fontSize: "24px",
                    color: getCssVar("--primary-text-light"),
                    fontFamily: FONT_FAMILY,
                    align: "center",
                },
                descriptionStyle: {
                    fontSize: "18px",
                    color: getCssVar("--text-white"),
                    fontFamily: FONT_FAMILY,
                    align: "center",
                    wordWrap: {
                        width: 500,
                        useAdvancedWrap: true,
                    },
                },
            },
            height: 100,
            background: getCssVarAsHex("--background-color-primary"),
        },
        alpha: 0.6,
    },
};

export const AUDIO_KEYS = {
    GAME_MUSIC: "gameMusic",
    GAME_OVER: "gameOver",
    CLICK: "click",
    COIN: "coin",
    SUCCESS: "success",
    EXPLOSION: "explosion",
};

export const AUDIO = {
    [AUDIO_KEYS.GAME_MUSIC]: "assets/audio/gameMusic.mp3",
    [AUDIO_KEYS.GAME_OVER]: "assets/audio/gameOver.mp3",
    [AUDIO_KEYS.CLICK]: "assets/audio/click.wav",
    [AUDIO_KEYS.COIN]: "assets/audio/coin.wav",
    [AUDIO_KEYS.SUCCESS]: "assets/audio/success.ogg",
    [AUDIO_KEYS.EXPLOSION]: "assets/audio/explosion.wav",
};

export const AUDIO_CONFIG = {
    musicConfig: {
        loop: true,
        volume: 0.5,
    },
    soundConfig: {
        loop: false,
        volume: 1,
    },
};
