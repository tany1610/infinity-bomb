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

        const button = this.scene.add
            .sprite(
                -bombPanelConfig.size / 2 + cutButtonConfig.width / 2,
                cutButtonConfig.height + 100,
                "cut_button",
                0
            )
            .setInteractive({ useHandCursor: true });

        button.on("pointerover", () => {
            button.setFrame(1);
        });

        button.on("pointerout", () => {
            button.setFrame(0);
        });

        button.on("pointerdown", () => {
            button.setFrame(2);
            this.gameManager.cutWire();
        });

        button.on("pointerup", () => {
            button.setFrame(1);
        });

        this.container.add([button]);
    }
}
