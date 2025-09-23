import "../style.scss";
import { getCssVar, getCssVarAsHex } from "./helpers";

const BOMB_PANEL_SIZE = 150;
const HEADER_HEIGHT = 60;
const BLACK_MARKET_HEIGHT = 110;

export const SHOP_WIDTH = 250;
export const SHOP_HEIGHT = 300;
export const INVENTORY_HEIHGT = 80;
export const GAME_WIDTH = 550;
export const GAME_HEIGHT = 550;

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
        effect: "Guarantees a safe cut on the current wire (no coin reward)",
        price: 30,
        image: "snip_master",
    },
    circuitPeek: {
        key: 2,
        title: "Circuit Peek",
        effect: "Pemanently reveals the explosion chance of the current wire color",
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
        effect: "Explode chance is halved this round. If it still explodes, lose 2 fuses",
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
    snipMasterCorrupted: {
        key: 8,
        title: "Snip Master (Corrupted)",
        effect: "Safe cut (no coin reward) +1 Skip. [Corruption]: 30% chance to lose half your coins on the end of the round",
        corruptionChance: 30,
        price: 20,
        image: "snip_master",
    },
    circuitPeekCorrupted: {
        key: 9,
        title: "Circuit Peek (Corrupted)",
        effect: "Reveals the explosion chance of the current wire color +1 Skip. [Corruption]: 20% chance to show wrong chance this round",
        corruptionChance: 20,
        price: 10,
        image: "circuit_peek",
    },
    fuseKitCorrupted: {
        key: 10,
        title: "Fuse Kit (Corrupted)",
        effect: "Restores 2 fuses. [Corruption]: 30% chance to blow 1 instead",
        corruptionChance: 30,
        price: 20,
        image: "fuse_kit",
    },
    defuserDroneCorrupted: {
        key: 11,
        title: "Defuser Drone (Corrupted)",
        effect: "Cuts 2 wires. [Corruption]: 2nd cut is pure luck",
        corruptionChance: 100,
        price: 10,
        image: "defuser_drone",
    },
    greedySnipCorrupted: {
        key: 12,
        title: "Greedy Snip (Corrupted)",
        effect: "Triple reward. [Corruption]: Lose 2 fuses if it blows",
        corruptionChance: 100,
        price: 20,
        image: "greedy_snip",
    },
    paydayCorrupted: {
        key: 13,
        title: "Payday (Corrupted)",
        effect: "Triple reward. [Corruption]: 30% chance to lose all coins",
        corruptionChance: 30,
        price: 30,
        image: "payday",
    },
    wireSwapCorrupted: {
        key: 14,
        title: "Wire Swap (Corrupted)",
        effect: "Switch chances with safer wire. [Corruption]: 30% chance to shuffle all wires",
        corruptionChance: 30,
        price: 40,
        image: "wire_swap",
    },
};

export const EVENTS = {
    GAME: {
        LOST_LIFE: "game:lostLife",
        NEXT_ROUND: "game:nextRound",
        GAME_OVER: "game:gameOver",
        SKIP: "game:skip",
        RESHUFFLED_WIRES: "game:resguffledWires",
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

export const EVENT_MANAGER_CONFIG = {
    EVENTS: {
        [EVENT_MANAGER_EVENTS_KEYS.BLACK_MARKET]: {
            _id: EVENT_MANAGER_EVENTS_KEYS.BLACK_MARKET,
            name: "Black Market",
            description:
                "Grants access to the black market. The items are better and cheaper, but they might not work properly",
            unlockRound: 5,
            duration: Infinity,
        },
    },
};

export const GAME_CONFIG = {
    startingCoins: 100,
    startinglives: 3,
    startingShopItems: 4,
    startingSkips: 3,
    debugMode: false,
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
        height: HEADER_HEIGHT,
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
        position: {
            x: GAME_WIDTH / 2 - BOMB_PANEL_SIZE,
            y: GAME_HEIGHT / 2 - SHOP_HEIGHT / 6,
        },
        backgroundColor: getCssVarAsHex("--background-color-primary"),
        wire: {
            position: { x: 2, y: -25 },
            color: WIRES.red,
        },
    },
    shop: {
        position: {
            x: GAME_WIDTH / 2 + BOMB_PANEL_SIZE - 50,
            y: GAME_HEIGHT / 2 - BOMB_PANEL_SIZE / 4,
        },
        width: SHOP_WIDTH,
        height: SHOP_HEIGHT,
        backgroundColor: getCssVarAsHex("--background-color-primary"),
        itemsSpacing: 60,
        itemsOrigin: [2.3, 1.8],
        text: {
            label: "Blast Shop",
            origin: [0.5, 0.5 + (SHOP_HEIGHT / 100) * 2.2],
            style: {
                fontSize: "20px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
            titleStyle: {
                fontSize: "16px",
                color: getCssVar("--primary-text-light"),
                fontFamily: FONT_FAMILY,
            },
            descriptionStyle: {
                fontSize: "14px",
                color: getCssVar("--text-white"),
                fontFamily: FONT_FAMILY,
                wordWrap: {
                    width: 180,
                    useAdvancedWrap: true,
                },
            },
        },
        blackMarket: {
            text: {
                label: "Black Market",
                style: {
                    fontSize: "20px",
                    color: getCssVar("--primary-text-light"),
                    fontFamily: FONT_FAMILY,
                },
                origin: [0.4, 0.5 + (BLACK_MARKET_HEIGHT / 100) * 1.8],
            },
            height: BLACK_MARKET_HEIGHT,
            backgroundColor: getCssVarAsHex("--background-color-secondary"),
        },
    },
    inventory: {
        height: INVENTORY_HEIHGT,
        position: { x: 0, y: GAME_HEIGHT - INVENTORY_HEIHGT },
        offsetY: -30,
        backgroundColor: getCssVarAsHex("--background-color-primary"),
        slots: {
            count: 6,
            width: 50,
            height: 50,
            spacing: 60,
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

export const GLITCH_COLORS = [0x66cc66, 0x66cccc, 0xcc6666, 0xaa88cc, 0x888888];
