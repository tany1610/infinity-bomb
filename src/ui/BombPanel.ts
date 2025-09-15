import { GAME_CONFIG } from "../utils/constants";
import type { GameManager } from "../managers/GameManager";
import { CutButton } from "./buttons/CutButton";
import { SkipButton } from "./buttons/SkipButton";
import { Wire } from "./Wire";

interface BombPanelConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class BombPanel {
    private scene: Phaser.Scene;
    private gameManager!: GameManager;

    constructor({ scene, gameManager }: BombPanelConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width, height } = this.scene.scale;

        const config = GAME_CONFIG.bombPanel;
        const textConfig = config.text;

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

        const wire = new Wire({ scene: this.scene, wire: this.gameManager.currentWire });

        // --- Buttons ---
        const cutButton = new CutButton({ scene: this.scene });
        const skipButton = new SkipButton({ scene: this.scene });
    }
}
