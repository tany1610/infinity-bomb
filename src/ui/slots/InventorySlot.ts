import type { GameManager } from "../../managers/GameManager";
import type { Item } from "../../models/Item";
import { EVENTS, GLITCH_COLORS, UI_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

interface InventorySlotConfig {
    index: number;
    item: Item | null;
    scene: Phaser.Scene;
    gameManager: GameManager;
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

    constructor({ index, item = null, scene, gameManager }: InventorySlotConfig) {
        this.item = item;
        this.scene = scene;
        this.gameManager = gameManager;

        const { height } = this.scene.scale;
        const slotsConfig = UI_CONFIG.inventory.slots;

        this.scene.add.rectangle(
            slotsConfig.offsetX + index * slotsConfig.spacing,
            height + slotsConfig.offsetY,
            slotsConfig.width,
            slotsConfig.height,
            slotsConfig.backgroundColor
        );

        if (this.item) {
            this.sprite = this.scene.add
                .sprite(
                    slotsConfig.offsetX + index * slotsConfig.spacing,
                    height + slotsConfig.offsetY,
                    this.item.image
                )
                .setInteractive({ useHandCursor: true })
                .setOrigin(0.5)
                .on("pointerover", () =>
                    EventBus.emit(EVENTS.INVENTORY.ITEM_POINTEROVER, this.item)
                )
                .on("pointerout", () => EventBus.emit(EVENTS.INVENTORY.ITEM_POINTEROUT, this.item))
                .on("pointerdown", this.applyItem);
            if (this.item.isCorrupted) {
                this.applyGlitchEffect();
            }
        }
    }

    public destroy(): void {
        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}
