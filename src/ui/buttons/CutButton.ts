import type { GameManager } from "../../managers/GameManager";
import { UI_CONFIG } from "../../utils/constants";

interface CutButtonConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
    container: Phaser.GameObjects.Container;
}

export class CutButton {
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private container: Phaser.GameObjects.Container;

    constructor({ scene, gameManager, container }: CutButtonConfig) {
        this.scene = scene;
        this.gameManager = gameManager;
        this.container = container;

        const bombPanelConfig = UI_CONFIG.bombPanel;
        const cutButtonConfig = bombPanelConfig.buttons.cut;

        const buttonContainer = this.scene.add
            .rectangle(
                -bombPanelConfig.size / 2 + cutButtonConfig.width / 2,
                cutButtonConfig.height + 100,
                cutButtonConfig.width,
                cutButtonConfig.height,
                cutButtonConfig.backgroundColor
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.gameManager.cutWire());
        const text = this.scene.add
            .text(buttonContainer.x, buttonContainer.y, cutButtonConfig.text.label, {
                ...cutButtonConfig.text.style,
            })
            .setOrigin(0.5);

        this.container.add([buttonContainer, text]);
    }
}
