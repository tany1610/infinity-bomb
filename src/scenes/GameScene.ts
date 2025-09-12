import Phaser from "phaser";
import { Header } from "../ui/Header";
import { BombPanel } from "../ui/BombPanel";
import { Shop } from "../ui/Shop";

export class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        const { width, height } = this.scale;

        // --- Top Bar ---
        new Header({ scene: this });

        // --- Bomb Panel (center) ---
        new BombPanel({ scene: this });

        // --- Shop (right side) ---
        new Shop({ scene: this });

        // --- Inventory (bottom) ---
        this.add.rectangle(width / 2, height - 40, width, 80, 0x222222);
        this.add
            .text(width / 2, height - 70, "Inventory:", {
                fontSize: "16px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        // Inventory slots (placeholders)
        for (let i = 0; i < 6; i++) {
            this.add.rectangle(100 + i * 60, height - 30, 50, 50, 0x444444);
        }
    }
}
