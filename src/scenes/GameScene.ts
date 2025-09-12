import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const { width, height } = this.scale;

    // --- Top Bar ---
    this.add.rectangle(width / 2, 30, width, 60, 0x222222).setOrigin(0.5);
    this.add.text(50, 20, "Lives: 3", { fontSize: "16px", color: "#ffffff" });
    this.add.text(200, 20, "Coins: 50", { fontSize: "16px", color: "#ffff00" });
    this.add.text(350, 20, "Skips: 3", { fontSize: "16px", color: "#00ffff" });

    // --- Bomb Panel (center) ---
    const panelSize = 200;
    this.add.rectangle(
      width / 2 - 200 / 2,
      height / 2 - 50,
      panelSize,
      panelSize,
      0x333333
    );
    this.add
      .text(width / 2 - 200 / 2, height / 2 - 120, "Bomb Panel", {
        fontSize: "14px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Wire placeholder
    this.add.rectangle(width / 2 - 200 / 2, height / 2 - 50, 100, 10, 0xff0000);

    // --- Buttons ---
    const cutButton = this.add
      .rectangle(width / 2 - 200 / 2 - 50, height / 2 + 100, 80, 40, 0x444444)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(width / 2 - 200 / 2 - 50, height / 2 + 100, "CUT", {
        fontSize: "18px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const skipButton = this.add
      .rectangle(width / 2 - 200 / 2 + 50, height / 2 + 100, 80, 40, 0x444444)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(width / 2 - 200 / 2 + 50, height / 2 + 100, "SKIP", {
        fontSize: "18px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // --- Shop (right side) ---
    const shopX = width - 120;
    const shopY = height / 2;
    this.add.rectangle(shopX, shopY, 200, 300, 0x222222);
    this.add
      .text(shopX, shopY - 150, "Blast Shop", {
        fontSize: "16px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Shop items (placeholders)
    this.add.text(shopX - 80, shopY - 120, "Reveal Wire - 20", {
      fontSize: "14px",
      color: "#ffcc00",
    });
    this.add.text(shopX - 80, shopY - 90, "Extra Life - 50", {
      fontSize: "14px",
      color: "#ffcc00",
    });
    this.add.text(shopX - 80, shopY - 60, "Skip+1 - 30", {
      fontSize: "14px",
      color: "#ffcc00",
    });

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
