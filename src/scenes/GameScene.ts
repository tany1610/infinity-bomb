import Phaser from "phaser";
import { Header } from "../ui/Header";
import { BombPanel } from "../ui/BombPanel";
import { Shop } from "../ui/Shop";
import { Inventory } from "../ui/Inventory";
import { GameManager } from "../managers/GameManager";
import { Hint } from "../ui/Hint";

export class GameScene extends Phaser.Scene {
    private gameManager!: GameManager;

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image("snip_master", "assets/snip-master.png");
        this.load.image("circuit_peek", "assets/circuit-peek.png");
        this.load.image("fuse_kit", "assets/fuse-kit.png");
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
    }
}
