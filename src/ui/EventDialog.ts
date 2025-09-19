import type { GameEvent } from "../models/events/GameEvent";
import { UI_CONFIG } from "../utils/constants";

interface EventDialogConfig {
    scene: Phaser.Scene;
}

export class EventDialog {
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private infoBackground: Phaser.GameObjects.Rectangle;
    private background: Phaser.GameObjects.Rectangle;
    private title: Phaser.GameObjects.Text;
    private description: Phaser.GameObjects.Text;

    constructor({ scene }: EventDialogConfig) {
        this.scene = scene;

        const { width, height } = scene.scale;

        const config = UI_CONFIG.eventDialog;

        this.container = scene.add.container(width / 2, height / 2);
        this.container.setDepth(9999);
        this.container.setVisible(false);

        this.background = scene.add.rectangle(0, 0, width, height, config.background, config.alpha);
        this.background.setOrigin(0.5);
        this.background
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.hide());
        this.infoBackground = scene.add.rectangle(
            0,
            0,
            width,
            config.infoContainer.height,
            config.infoContainer.background
        );
        this.title = scene.add
            .text(0, config.infoContainer.text.offsetY, "", {
                ...config.infoContainer.text.titleStyle,
            })
            .setOrigin(config.infoContainer.text.origin);
        this.description = scene.add
            .text(0, this.title.y - config.infoContainer.text.offsetY * 2, "", {
                ...config.infoContainer.text.descriptionStyle,
            })
            .setOrigin(config.infoContainer.text.origin);

        this.container.add([this.background, this.infoBackground, this.title, this.description]);
    }

    public show(event: GameEvent): void {
        this.title.setText(`Unlocked: ${event.name}`);
        this.description.setText(event.description);
        this.container.setVisible(true);

        this.scene.tweens.add({
            targets: this.container,
            scale: { from: 0, to: 1 },
            ease: "Back.Out",
            duration: 300,
        });
    }

    public hide(): void {
        this.scene.tweens.add({
            targets: this.container,
            alpha: { from: 1, to: 0 },
            scale: { from: 1, to: 0.8 },
            ease: "Back.In",
            duration: 200,
            onComplete: () => {
                this.container.setVisible(false);
                this.container.setAlpha(1);
                this.container.setScale(1);
            },
        });
    }
}
