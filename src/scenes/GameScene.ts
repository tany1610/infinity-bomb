import Phaser from "phaser";
import { Header } from "../ui/Header";
import { BombPanel } from "../ui/BombPanel";
import { Shop } from "../ui/Shop";
import { Inventory } from "../ui/Inventory";

export class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        // --- Top Bar ---
        new Header({ scene: this });

        // --- Bomb Panel (center) ---
        new BombPanel({ scene: this });

        // --- Shop (right side) ---
        new Shop({ scene: this });

        // --- Inventory (bottom) ---
        new Inventory({ scene: this });
    }
}
