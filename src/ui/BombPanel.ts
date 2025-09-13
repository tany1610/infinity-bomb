import { GAME_CONFIG } from "../utils/constants";
import { CutButton } from "./buttons/CutButton";
import { SkipButton } from "./buttons/SkipButton";

interface BombPanelConfig {
    scene: Phaser.Scene;
}

export class BombPanel {
    private scene: Phaser.Scene;

    constructor({ scene }: BombPanelConfig) {
        this.scene = scene;

        const { width, height } = this.scene.scale;

        const config = GAME_CONFIG.bombPanel;
        const textConfig = config.text;
        const wireConfig = config.wire;

        this.scene.add.rectangle(
            width * config.position.xRatio + config.offsetX,
            height * config.position.yRatio + config.offsetY,
            config.size,
            config.size,
            config.backgroundColor
        );
        this.scene.add
            .text(
                width * textConfig.position.xRatio + textConfig.offsetX,
                height * textConfig.position.yRatio + textConfig.offsetY,
                textConfig.label,
                { ...textConfig.style }
            )
            .setOrigin(textConfig.origin);

        // Wire placeholder
        this.scene.add.rectangle(
            width * wireConfig.position.xRatio + wireConfig.offsetX,
            height * wireConfig.position.yRatio + wireConfig.offsetY,
            wireConfig.width,
            wireConfig.height,
            wireConfig.color
        );

        // --- Buttons ---
        const cutButton = new CutButton({ scene: this.scene });
        const skipButton = new SkipButton({ scene: this.scene });
    }
}
