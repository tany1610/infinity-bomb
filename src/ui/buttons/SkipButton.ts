import type { GameManager } from "../../managers/GameManager";

interface SkipButtonConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
    container: Phaser.GameObjects.Container;
    lid: Phaser.GameObjects.Sprite;
}

export class SkipButton {
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private container: Phaser.GameObjects.Container;

    constructor({ scene, gameManager, container, lid }: SkipButtonConfig) {
        this.scene = scene;
        this.gameManager = gameManager;
        this.container = container;

        const button = this.scene.add
            .sprite(25, 30, "skip_button", 0)
            .setInteractive({ useHandCursor: true });

        button.on("pointerover", () => {
            button.setFrame(1);
        });

        button.on("pointerout", () => {
            button.setFrame(0);
        });

        button.on("pointerdown", () => {
            button.setFrame(2);
            this.gameManager.applySkip();
            lid.play("lid_close");
            lid.on("animationcomplete", (animation: Phaser.Animations.Animation) => {
                if (animation.key === "lid_close") {
                    lid.play("lid_open");
                }
            });
        });

        button.on("pointerup", () => {
            button.setFrame(1);
        });

        this.container.add([button]);
    }
}
