import type { GameManager } from "../../managers/GameManager";
import type { Item } from "../../models/Item";
import { GLITCH_COLORS, UI_CONFIG } from "../../utils/constants";

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

    private applyGlitchEffect() {
        this.scene.time.addEvent({
            delay: Phaser.Math.Between(1000, 2000),
            loop: true,
            callback: () => {
                const color = Phaser.Utils.Array.GetRandom(GLITCH_COLORS);
                this.sprite.setTint(color);

                this.scene.tweens.add({
                    targets: this.sprite,
                    x: this.sprite.x + Phaser.Math.Between(-5, 5),
                    alpha: { from: 1, to: 0.5 },
                    yoyo: true,
                    duration: 80,
                    repeat: 1,
                    onComplete: () => {
                        this.sprite.setX(Math.round(this.sprite.x));
                        this.sprite.setY(Math.round(this.sprite.y));
                        this.sprite.clearTint();
                    },
                });
            },
        });
    }

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

        if (this.item.isCorrupted) {
            this.applyGlitchEffect();
        }

        shopContainer.add([this.sprite, this.title, this.description]);
    }

    public destroy() {
        this.sprite.destroy();
        this.title.destroy();
        this.description.destroy();
    }
}
