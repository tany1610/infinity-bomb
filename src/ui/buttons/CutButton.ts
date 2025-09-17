import type { GameManager } from "../../managers/GameManager";
import { UI_CONFIG } from "../../utils/constants";

interface CutButtonConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class CutButton {
    private scene: Phaser.Scene;
    private gameManager: GameManager;

    constructor({ scene, gameManager }: CutButtonConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width, height } = this.scene.scale;

        const cutButtonConfig = UI_CONFIG.bombPanel.buttons.cut;

        this.scene.add
            .rectangle(
                width * cutButtonConfig.position.xRatio + cutButtonConfig.offsetX,
                height * cutButtonConfig.position.yRatio + cutButtonConfig.offsetY,
                cutButtonConfig.width,
                cutButtonConfig.height,
                cutButtonConfig.backgroundColor
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.gameManager.cutWire());
        this.scene.add
            .text(
                width * cutButtonConfig.position.xRatio + cutButtonConfig.offsetX,
                height * cutButtonConfig.position.yRatio + cutButtonConfig.offsetY,
                cutButtonConfig.text.label,
                { ...cutButtonConfig.text.style }
            )
            .setOrigin(cutButtonConfig.text.origin);
    }
}
