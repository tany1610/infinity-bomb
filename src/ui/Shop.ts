import type { GameManager } from "../managers/GameManager";
import { EVENTS, GAME_CONFIG, UI_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import { ShopSlot } from "./slots/ShopSlot";

interface ShopConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class Shop {
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private blackMarketContainer: Phaser.GameObjects.Container;
    private gameManager: GameManager;
    private shopSlots: ShopSlot[] = [];
    private blackMarketItem!: ShopSlot;

    private initShopItems() {
        this.shopSlots.forEach((slot) => slot.destroy());
        this.shopSlots = [];

        const shopItems = this.gameManager.shopItems;

        for (let index = 0; index < shopItems.length; index++) {
            const item = shopItems[index];
            this.shopSlots.push(
                new ShopSlot({
                    index,
                    item,
                    scene: this.scene,
                    gameManager: this.gameManager,
                    shopContainer: this.container,
                })
            );
        }
    }

    private initBlackMarketItem() {
        const blackMarketItem = this.gameManager.blackMarketItem;

        if (this.blackMarketItem) {
            this.blackMarketItem.destroy();
        }

        if (blackMarketItem) {
            this.blackMarketItem = new ShopSlot({
                index: GAME_CONFIG.startingShopItems + 0.7,
                item: blackMarketItem,
                scene: this.scene,
                gameManager: this.gameManager,
                shopContainer: this.blackMarketContainer,
            });
        }
    }

    private hideContainer(container: Phaser.GameObjects.Container) {
        container.setVisible(false);
    }

    private showContainer(container: Phaser.GameObjects.Container) {
        container.setVisible(true);
    }

    constructor({ scene, gameManager }: ShopConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const config = UI_CONFIG.shop;
        const shopX = config.position.x;
        const shopY = config.position.y;

        this.container = this.scene.add.container(shopX, shopY);

        const textConfig = config.text;
        const blackMarketTextConfig = config.blackMarket.text;

        const shop = this.scene.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            config.backgroundColor
        );

        const shopText = this.scene.add
            .text(0, 0, textConfig.label, {
                ...textConfig.style,
            })
            .setOrigin(...textConfig.origin);

        this.blackMarketContainer = this.scene.add.container(0, 0);

        const blackMarket = this.scene.add.rectangle(
            0,
            shop.height - config.blackMarket.height + 20,
            config.width,
            config.blackMarket.height,
            config.blackMarket.backgroundColor
        );

        const blackMarketText = this.scene.add
            .text(blackMarket.x, blackMarket.y, blackMarketTextConfig.label, {
                ...blackMarketTextConfig.style,
            })
            .setOrigin(...blackMarketTextConfig.origin);

        this.blackMarketContainer.add(blackMarket);
        this.blackMarketContainer.add(blackMarketText);

        this.hideContainer(this.blackMarketContainer);

        this.container.add(this.blackMarketContainer);
        this.container.add(shop);
        this.container.add(shopText);

        this.initShopItems();
        this.initBlackMarketItem();

        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.initShopItems, this);
        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.initBlackMarketItem, this);
        EventBus.on(EVENTS.GAME.NEXT_ROUND, this.initBlackMarketItem, this);
        EventBus.on(EVENTS.UNLOCKABLE_EVENTS.BLACK_MARKET_UNLOCKED, () =>
            this.showContainer(this.blackMarketContainer)
        );
    }
}
