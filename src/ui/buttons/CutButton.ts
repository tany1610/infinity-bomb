import { GAME_CONFIG } from "../../utils/constants";

interface CutButtonConfig {
    scene: Phaser.Scene;
}

export class CutButton {
    private scene: Phaser.Scene;

    constructor({ scene }: CutButtonConfig) {
        this.scene = scene;

        const { width, height } = this.scene.scale;

        const cutButtonConfig = GAME_CONFIG.bombPanel.buttons.cut;

        this.scene.add
            .rectangle(
                width * cutButtonConfig.position.xRatio + cutButtonConfig.offsetX,
                height * cutButtonConfig.position.yRatio + cutButtonConfig.offsetY,
                cutButtonConfig.width,
                cutButtonConfig.height,
                cutButtonConfig.backgroundColor
            )
            .setInteractive({ useHandCursor: true });
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
