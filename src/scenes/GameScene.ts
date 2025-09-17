import Phaser from "phaser";
import { Header } from "../ui/Header";
import { BombPanel } from "../ui/BombPanel";
import { Shop } from "../ui/Shop";
import { Inventory } from "../ui/Inventory";
import { GameManager } from "../managers/GameManager";
import { Hint } from "../ui/Hint";
import { EventBus } from "../utils/EventBus";
import { AUDIO_KEYS, EVENTS } from "../utils/constants";
import { AudioManager } from "../managers/AudioManager";

export class GameScene extends Phaser.Scene {
    private gameManager!: GameManager;

    private endGameHandler() {
        this.gameManager.destroy();
        AudioManager.getInstance().stopMusic();
        AudioManager.getInstance().playSfx(AUDIO_KEYS.GAME_OVER);
        this.scene.stop("GameScene");
        this.scene.start("GameOverScene");
    }

    constructor() {
        super("GameScene");
    }

    preload() {
        // Items
        this.load.image("snip_master", "assets/items/snip-master.png");
        this.load.image("circuit_peek", "assets/items/circuit-peek.png");
        this.load.image("fuse_kit", "assets/items/fuse-kit.png");
        this.load.image("defuser_drone", "assets/items/defuser-drone.png");
        this.load.image("greedy_snip", "assets/items/greedy-snip.png");
        this.load.image("payday", "assets/items/payday.png");
        this.load.image("wire_swap", "assets/items/wire-swap.png");

        // Wires
        this.load.image("red_wire", "assets/wires/red-wire.png");
        this.load.image("blue_wire", "assets/wires/blue-wire.png");
        this.load.image("green_wire", "assets/wires/green-wire.png");
        this.load.image("yellow_wire", "assets/wires/yellow-wire.png");
        this.load.image("purple_wire", "assets/wires/purple-wire.png");
        this.load.image("black_wire", "assets/wires/black-wire.png");
        this.load.image("orange_wire", "assets/wires/orange-wire.png");
        this.load.image("white_wire", "assets/wires/white-wire.png");
    }

    create() {
        this.gameManager = new GameManager();

        // --- Top Bar ---
        new Header({ scene: this, gameManager: this.gameManager });

        // --- Bomb Panel (center) ---
        new BombPanel({ scene: this, gameManager: this.gameManager });

        // --- Shop (right side) ---
        new Shop({ scene: this, gameManager: this.gameManager });

        // --- Hint (show hovered item details) ---
        new Hint({ scene: this });

        // --- Inventory (bottom) ---
        new Inventory({ scene: this, gameManager: this.gameManager });

        EventBus.on(EVENTS.GAME.GAME_OVER, () => this.endGameHandler());
    }
}
