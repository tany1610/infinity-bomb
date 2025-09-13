import Phaser from "phaser";
import { GAME_CONFIG } from "../../utils/constants";

interface SkipButtonConfig {
    scene: Phaser.Scene;
}

export class SkipButton {
    private scene: Phaser.Scene;

    constructor({ scene }: SkipButtonConfig) {
        this.scene = scene;

        const { width, height } = this.scene.scale;

        const skipButtonConfig = GAME_CONFIG.bombPanel.buttons.skip;

        this.scene.add
            .rectangle(
                width * skipButtonConfig.position.xRatio + skipButtonConfig.offsetX,
                height * skipButtonConfig.position.yRatio + skipButtonConfig.offsetY,
                skipButtonConfig.width,
                skipButtonConfig.height,
                skipButtonConfig.backgroundColor
            )
            .setInteractive({ useHandCursor: true });
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
