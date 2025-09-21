import type { GameManager } from "../../managers/GameManager";
import type { Item } from "../../models/Item";
import {
    EVENTS,
    GAME_HEIGHT,
    GAME_WIDTH,
    GLITCH_COLORS,
    INVENTORY_HEIHGT,
    UI_CONFIG,
} from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

interface InventorySlotConfig {
    index: number;
    item: Item | null;
    scene: Phaser.Scene;
    gameManager: GameManager;
    inventoryContainer: Phaser.GameObjects.Container;
}

export class InventorySlot {
    private item: Item | null;
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private sprite!: Phaser.GameObjects.Sprite;

    private applyItem = () => {
        if (this.item) {
            this.item.apply(this.gameManager);
        }
    };

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

    constructor({
        index,
        item = null,
        scene,
        gameManager,
        inventoryContainer,
    }: InventorySlotConfig) {
        this.item = item;
        this.scene = scene;
        this.gameManager = gameManager;

        const slotsConfig = UI_CONFIG.inventory.slots;
        const slotOffset = (slotsConfig.count / 2) * slotsConfig.width;

        const itemContainer = this.scene.add.rectangle(
            GAME_WIDTH / 2 - slotOffset + index * slotsConfig.spacing,
            slotsConfig.height / 2 + slotsConfig.height / 3,
            slotsConfig.width,
            slotsConfig.height,
            slotsConfig.backgroundColor
        );

        if (this.item) {
            this.sprite = this.scene.add
                .sprite(itemContainer.x, itemContainer.y, this.item.image)
                .setInteractive({ useHandCursor: true })
                .on("pointerover", () =>
                    EventBus.emit(EVENTS.INVENTORY.ITEM_POINTEROVER, this.item)
                )
                .on("pointerout", () => EventBus.emit(EVENTS.INVENTORY.ITEM_POINTEROUT, this.item))
                .on("pointerdown", this.applyItem);
            if (this.item.isCorrupted) {
                this.applyGlitchEffect();
            }
        }

        inventoryContainer.add(itemContainer);

        if (this.sprite) {
            inventoryContainer.add(this.sprite);
        }
    }

    public destroy(): void {
        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}
