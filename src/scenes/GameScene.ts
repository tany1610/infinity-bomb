import Phaser from "phaser";
import { Header } from "../ui/Header";
import { BombPanel } from "../ui/BombPanel";
import { Shop } from "../ui/Shop";
import { Inventory } from "../ui/Inventory";
import { GameManager } from "../managers/GameManager";

export class GameScene extends Phaser.Scene {
    private gameManager!: GameManager;

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image("snip_master", "assets/snip-master.png");
    }

    create() {
        this.gameManager = new GameManager();

        // --- Top Bar ---
        new Header({ scene: this, manager: this.gameManager });

        // --- Bomb Panel (center) ---
        new BombPanel({ scene: this });

        // --- Shop (right side) ---
        new Shop({ scene: this, manager: this.gameManager.shopManager });

        // --- Inventory (bottom) ---
        new Inventory({ scene: this });
    }
}
