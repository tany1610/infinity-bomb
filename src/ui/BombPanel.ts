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
    private container: Phaser.GameObjects.Container;
    private wire: Wire;

    private redrawWire() {
        this.wire.destroy();
        this.wire = new Wire({
            scene: this.scene,
            wire: this.gameManager.currentWire,
            container: this.container,
        });
    }

    constructor({ scene, gameManager }: BombPanelConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const config = UI_CONFIG.bombPanel;
        const textConfig = config.text;

        this.container = this.scene.add.container(config.position.x, config.position.y);

        const panelContainer = this.scene.add.rectangle(
            0,
            0,
            config.size,
            config.size,
            config.backgroundColor
        );
        const text = this.scene.add
            .text(textConfig.offsetX, textConfig.offsetY, textConfig.label, {
                ...textConfig.style,
            })
            .setOrigin(0.5);

        this.container.add([panelContainer, text]);

        this.wire = new Wire({
            scene: this.scene,
            wire: this.gameManager.currentWire,
            container: this.container,
        });

        new CutButton({
            scene: this.scene,
            gameManager: this.gameManager,
            container: this.container,
        });
        new SkipButton({
            scene: this.scene,
            gameManager: this.gameManager,
            container: this.container,
        });

        EventBus.on(EVENTS.GAME.NEXT_ROUND, this.redrawWire, this);
        EventBus.on(EVENTS.GAME.RESHUFFLED_WIRES, this.redrawWire, this);
    }
}
