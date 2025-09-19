import type { GameManager } from "../../managers/GameManager";
import type { Item } from "../../models/items/Item";
import { UI_CONFIG } from "../../utils/constants";

interface ShopSlotConfig {
    index: number;
    item: Item;
    scene: Phaser.Scene;
    gameManager: GameManager;
    shopContainer: Phaser.GameObjects.Container;
}

export class ShopSlot {
    private item: Item;
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private sprite: Phaser.GameObjects.Sprite;
    private title: Phaser.GameObjects.Text;
    private description: Phaser.GameObjects.Text;

    constructor({ index, item, scene, gameManager, shopContainer }: ShopSlotConfig) {
        this.item = item;
        this.scene = scene;
        this.gameManager = gameManager;

        const config = UI_CONFIG.shop;
        const yOffset = config.itemsSpacing * index;

        this.sprite = this.scene.add
            .sprite(0, yOffset - 5, this.item.image)
            .setInteractive({ useHandCursor: true })
            .setOrigin(...config.itemsOrigin)
            .on("pointerdown", () => this.gameManager.buyItem(this.item));

        this.title = this.scene.add.text(
            this.sprite.x - 55,
            this.sprite.y - 60,
            `${this.item.name} - ${this.item.price} BC`,
            {
                ...config.text.titleStyle,
            }
        );

        this.description = this.scene.add.text(
            this.sprite.x - 55,
            this.sprite.y - 45,
            this.item.description,
            {
                ...config.text.descriptionStyle,
            }
        );

        shopContainer.add([this.sprite, this.title, this.description]);
    }

    public destroy() {
        this.sprite.destroy();
        this.title.destroy();
        this.description.destroy();
    }
}
