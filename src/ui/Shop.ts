import Phaser from "phaser";
import { GAME_CONFIG } from "../utils/constants";

interface ShopConfig {
    scene: Phaser.Scene;
}

export class Shop {
    private scene: Phaser.Scene;

    constructor({ scene }: ShopConfig) {
        this.scene = scene;

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
