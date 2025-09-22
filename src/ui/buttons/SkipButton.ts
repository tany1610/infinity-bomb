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

        const buttonContainer = this.scene.add
            .rectangle(
                bombPanelConfig.size / 2 - skipButtonConfig.width / 2,
                skipButtonConfig.height + 100,
                skipButtonConfig.width,
                skipButtonConfig.height,
                skipButtonConfig.backgroundColor
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.gameManager.applySkip());
        const text = this.scene.add
            .text(buttonContainer.x, buttonContainer.y, skipButtonConfig.text.label, {
                ...skipButtonConfig.text.style,
            })
            .setOrigin(0.5);

        this.container.add([buttonContainer, text]);
    }
}
