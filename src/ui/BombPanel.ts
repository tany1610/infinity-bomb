import Phaser from "phaser";
import { GAME_CONFIG } from "../utils/constants";

interface BombPanelConfig {
    scene: Phaser.Scene;
}

export class BombPanel {
    private scene: Phaser.Scene;

    constructor({ scene }: BombPanelConfig) {
        this.scene = scene;

        const { width, height } = this.scene.scale;

        const config = GAME_CONFIG.bombPanel;
        const labelConfig = config.label;
        const wireConfig = config.wire;
        const cutButtonConfig = config.buttons.cut;
        const skipButtonConfig = config.buttons.skip;

        this.scene.add.rectangle(
            width * config.position.xRatio + config.offsetX,
            height * config.position.yRatio + config.offsetY,
            config.size,
            config.size,
            config.backgroundColor
        );
        this.scene.add
            .text(
                width * labelConfig.position.xRatio + labelConfig.offsetX,
                height * labelConfig.position.yRatio + labelConfig.offsetY,
                labelConfig.text,
                { ...labelConfig.style }
            )
            .setOrigin(labelConfig.origin);

        // Wire placeholder
        this.scene.add.rectangle(
            width * wireConfig.position.xRatio + wireConfig.offsetX,
            height * wireConfig.position.yRatio + wireConfig.offsetY,
            wireConfig.width,
            wireConfig.height,
            wireConfig.color
        );

        // --- Buttons ---
        const cutButton = this.scene.add
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

        const skipButton = this.scene.add
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
