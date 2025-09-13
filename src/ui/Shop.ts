import Phaser from "phaser";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import type { GameManager } from "../managers/GameManager";
import { ShopSlot } from "./slots/ShopSlot";

interface ShopConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class Shop {
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private shopSlots: ShopSlot[] = [];

    private initShopItems() {
        this.shopSlots.forEach((slot) => slot.destroy());
        this.shopSlots = [];

        const shopItems = this.gameManager.shopItems;

        for (let index = 0; index < shopItems.length; index++) {
            const item = shopItems[index];
            this.shopSlots.push(
                new ShopSlot({ index, item, scene: this.scene, gameManager: this.gameManager })
            );
        }
    }

    constructor({ scene, gameManager }: ShopConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width, height } = this.scene.scale;
        const config = GAME_CONFIG.shop;
        const textConfig = config.text;

        const shopX = width * config.position.xRatio + config.offsetX;
        const shopY = height * config.position.yRatio;

        this.scene.add.rectangle(shopX, shopY, config.width, config.height, config.backgroundColor);
        this.scene.add
            .text(shopX, shopY + textConfig.offsetY, textConfig.label, { ...textConfig.style })
            .setOrigin(textConfig.origin);

        this.initShopItems();

        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.initShopItems, this);
    }
}
