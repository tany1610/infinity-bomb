import Phaser from "phaser";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import type { ShopManager } from "../managers/ShopManager";
import { EventBus } from "../utils/EventBus";

interface ShopConfig {
    scene: Phaser.Scene;
    manager: ShopManager;
}

export class Shop {
    private scene: Phaser.Scene;
    private manager: ShopManager;
    private itemSprites: Phaser.GameObjects.Sprite[] = [];

    private initItemSprites() {
        this.itemSprites.forEach((sprite) => sprite.destroy());
        this.itemSprites = [];

        const shopItems = this.manager.availableItems;

        for (let i = 0; i < shopItems.length; i++) {
            const item = shopItems[i];
            const sprite = this.scene.add
                .sprite(320, 170 + 50 * i, item.image)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true })
                .on("pointerdown", () => this.manager.buyItem(item.id));

            this.itemSprites.push(sprite);
        }
    }

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

        this.initItemSprites();

        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.initItemSprites, this);
    }
}
