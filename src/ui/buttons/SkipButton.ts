import type { GameManager } from "../../managers/GameManager";
import { UI_CONFIG } from "../../utils/constants";

interface SkipButtonConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class SkipButton {
    private scene: Phaser.Scene;
    private gameManager: GameManager;

    constructor({ scene, gameManager }: SkipButtonConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width, height } = this.scene.scale;

        const skipButtonConfig = UI_CONFIG.bombPanel.buttons.skip;

        this.scene.add
            .rectangle(
                width * skipButtonConfig.position.xRatio + skipButtonConfig.offsetX,
                height * skipButtonConfig.position.yRatio + skipButtonConfig.offsetY,
                skipButtonConfig.width,
                skipButtonConfig.height,
                skipButtonConfig.backgroundColor
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.gameManager.applySkip());
        this.scene.add
            .text(
                width * skipButtonConfig.position.xRatio + skipButtonConfig.offsetX,
                height * skipButtonConfig.position.yRatio + skipButtonConfig.offsetY,
                skipButtonConfig.text.label,
                { ...skipButtonConfig.text.style }
            )
            .setOrigin(skipButtonConfig.text.origin);
    }
}
