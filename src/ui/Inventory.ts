import Phaser from "phaser";
import { GAME_CONFIG } from "../utils/constants";

interface InventoryConfig {
    scene: Phaser.Scene;
}

export class Inventory {
    private scene: Phaser.Scene;

    constructor({ scene }: InventoryConfig) {
        this.scene = scene;

        const { width, height } = this.scene.scale;
        const config = GAME_CONFIG.inventory;
        const slotsConfig = GAME_CONFIG.inventory.slots;

        this.scene.add.rectangle(
            width * config.position.xRatio,
            height * config.position.yRatio + config.offsetY,
            width,
            config.height,
            config.backgroundColor
        );

        for (let i = 0; i < slotsConfig.count; i++) {
            this.scene.add
                .rectangle(
                    slotsConfig.offsetX + i * slotsConfig.spacing,
                    height + slotsConfig.offsetY,
                    slotsConfig.width,
                    slotsConfig.height,
                    slotsConfig.backgroundColor
                )
                .setInteractive({ useHandCursor: true });
        }
    }
}
