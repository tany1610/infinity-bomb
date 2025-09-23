import Phaser from "phaser";
import { Header } from "../ui/Header";
import { BombPanel } from "../ui/BombPanel";
import { Shop } from "../ui/Shop";
import { Inventory } from "../ui/Inventory";
import { GameManager } from "../managers/GameManager";
import { Hint } from "../ui/Hint";
import { EventBus } from "../utils/EventBus";
import { EVENTS } from "../utils/constants";
import { EventDialog } from "../ui/EventDialog";
import type { GameEvent } from "../models/events/GameEvent";

export class GameScene extends Phaser.Scene {
    private gameManager!: GameManager;
    private eventDialog!: EventDialog;

    private endGameHandler() {
        this.gameManager.destroy();
        this.scene.stop("GameScene");
        this.scene.start("GameOverScene");
    }

    private attatchUnlockedEventsListeners() {
        const unlockableEvents = Object.values(EVENTS.UNLOCKABLE_EVENTS);
        for (const event of unlockableEvents) {
            EventBus.on(event, (event: GameEvent) => this.eventDialog.show(event));
        }
    }

    private createAnimations() {
        // Lid Animation
        this.anims.create({
            key: "lid_close",
            frames: this.anims.generateFrameNumbers("lid", { start: 0, end: 15 }),
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: "lid_open",
            frames: this.anims.generateFrameNumbers("lid", { start: 15, end: 24 }),
            frameRate: 12,
            repeat: 0,
        });
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

        // Bomb panel
        this.load.image("bomb_panel", "assets/bomb-panel.png");

        // Cut button
        this.load.spritesheet("cut_button", "assets/cut-button.png", {
            frameWidth: 45,
            frameHeight: 18,
        });

        // Skip button
        this.load.spritesheet("skip_button", "assets/skip-button.png", {
            frameWidth: 45,
            frameHeight: 18,
        });

        // Lid
        this.load.spritesheet("lid", "assets/lid-animation.png", {
            frameWidth: 100,
            frameHeight: 50,
        });
    }

    create() {
        this.gameManager = new GameManager();

        // --- Event Dialog - triggered on unlocking an event ---
        this.eventDialog = new EventDialog({ scene: this });

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

        this.attatchUnlockedEventsListeners();
        this.createAnimations();

        EventBus.on(EVENTS.GAME.GAME_OVER, () => this.endGameHandler());
    }
}
