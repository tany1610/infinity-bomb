import type { GameManager } from "../../managers/GameManager";
import { UI_CONFIG } from "../../utils/constants";

interface SkipButtonConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
    container: Phaser.GameObjects.Container;
}

export class SkipButton {
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private container: Phaser.GameObjects.Container;

    constructor({ scene, gameManager, container }: SkipButtonConfig) {
        this.scene = scene;
        this.gameManager = gameManager;
        this.container = container;

        const bombPanelConfig = UI_CONFIG.bombPanel;
        const skipButtonConfig = bombPanelConfig.buttons.skip;

        const button = this.scene.add
            .sprite(
                bombPanelConfig.size / 2 - skipButtonConfig.width / 2,
                skipButtonConfig.height + 100,
                "skip_button",
                0
            )
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
        });

        button.on("pointerup", () => {
            button.setFrame(1);
        });

        this.container.add([button]);
    }
}
