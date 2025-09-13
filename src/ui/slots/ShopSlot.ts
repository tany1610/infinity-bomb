import Phaser from "phaser";
import { Item } from "../../models/items/Item";
import { GAME_CONFIG } from "../../utils/constants";
import { GameManager } from "../../managers/GameManager";

interface ShopSlotConfig {
    index: number;
    item: Item;
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class ShopSlot {
    private item: Item;
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private sprite: Phaser.GameObjects.Sprite;
    private title: Phaser.GameObjects.Text;
    private description: Phaser.GameObjects.Text;

    constructor({ index, item, scene, gameManager }: ShopSlotConfig) {
        this.item = item;
        this.scene = scene;
        this.gameManager = gameManager;

        const { width, height } = this.scene.scale;
        const config = GAME_CONFIG.shop;
        const spriteX = width * config.position.xRatio + 1.6 * config.offsetX;
        const spriteY = height * config.position.yRatio + config.offsetY;

        this.sprite = this.scene.add
            .sprite(spriteX, spriteY + config.itemsSpacing * index, this.item.image)
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5)
            .on("pointerdown", () => this.gameManager.buyItem(this.item.id));

        this.title = this.scene.add.text(
            spriteX + 20,
            spriteY + config.itemsSpacing * index - 20,
            this.item.name,
            {
                ...config.text.titleStyle,
            }
        );

        this.description = this.scene.add.text(
            spriteX + 20,
            spriteY + config.itemsSpacing * index - 5,
            this.item.effect,
            {
                ...config.text.descriptionStyle,
            }
        );
    }

    public destroy() {
        this.sprite.destroy();
        this.title.destroy();
        this.description.destroy();
    }
}
