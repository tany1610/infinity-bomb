import Phaser from "phaser";
import { GAME_CONFIG } from "../utils/constants";
import type { ShopManager } from "../managers/ShopManager";

interface ShopConfig {
    scene: Phaser.Scene;
    manager: ShopManager;
}

export class Shop {
    private scene: Phaser.Scene;
    private manager: ShopManager;

    constructor({ scene, manager }: ShopConfig) {
        this.scene = scene;
        this.manager = manager;

        const { width, height } = this.scene.scale;
        const config = GAME_CONFIG.shop;
        const textConfig = config.text;

        const shopX = width * config.position.xRatio + config.offsetX;
        const shopY = height * config.position.yRatio;

        this.scene.add.rectangle(shopX, shopY, config.width, config.height, config.backgroundColor);
        this.scene.add
            .text(shopX, shopY + textConfig.offsetY, textConfig.label, { ...textConfig.style })
            .setOrigin(textConfig.origin);
    }
}
