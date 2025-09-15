import { EVENTS, UI_CONFIG } from "../utils/constants";
import type { GameManager } from "../managers/GameManager";
import { CutButton } from "./buttons/CutButton";
import { SkipButton } from "./buttons/SkipButton";
import { Wire } from "./Wire";
import { EventBus } from "../utils/EventBus";

interface BombPanelConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class BombPanel {
    private scene: Phaser.Scene;
    private gameManager!: GameManager;
    private wire: Wire;

    private redrawWire() {
        this.wire = new Wire({ scene: this.scene, wire: this.gameManager.currentWire });
    }

    constructor({ scene, gameManager }: BombPanelConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width, height } = this.scene.scale;

        const config = UI_CONFIG.bombPanel;
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

        this.wire = new Wire({ scene: this.scene, wire: this.gameManager.currentWire });

        // --- Buttons ---
        const cutButton = new CutButton({ scene: this.scene, gameManager: this.gameManager });
        const skipButton = new SkipButton({ scene: this.scene });

        EventBus.on(EVENTS.GAME.NEXT_ROUND, this.redrawWire, this);
    }
}
