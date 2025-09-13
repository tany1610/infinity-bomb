import type { GameManager } from "../../managers/GameManager";
import type { Item } from "../../models/items/Item";
import { GAME_CONFIG } from "../../utils/constants";

interface InventorySlotConfig {
    index: number;
    item: Item | null;
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class InventorySlot {
    private item: Item | null;
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private sprite!: Phaser.GameObjects.Sprite;

    constructor({ index, item = null, scene, gameManager }: InventorySlotConfig) {
        this.item = item;
        this.scene = scene;
        this.gameManager = gameManager;

        const { height } = this.scene.scale;
        const config = GAME_CONFIG.shop;
        const slotsConfig = GAME_CONFIG.inventory.slots;

        this.scene.add
            .rectangle(
                slotsConfig.offsetX + index * slotsConfig.spacing,
                height + slotsConfig.offsetY,
                slotsConfig.width,
                slotsConfig.height,
                slotsConfig.backgroundColor
            )
            .setInteractive({ useHandCursor: true });

        if (this.item) {
            this.sprite = this.scene.add
                .sprite(
                    slotsConfig.offsetX + index * slotsConfig.spacing,
                    height + slotsConfig.offsetY,
                    this.item.image
                )
                .setInteractive({ useHandCursor: true })
                .setOrigin(0.5);
        }
    }

    public destroy() {
        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}
