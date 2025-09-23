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
    private lid: Phaser.GameObjects.Sprite;
    private wire: Wire;

    private redrawWire() {
        this.lid.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            (anim: Phaser.Animations.Animation) => {
                if (anim.key === "lid_close") {
                    this.wire.destroy();
                    this.wire = new Wire({
                        scene: this.scene,
                        wire: this.gameManager.currentWire,
                        container: this.container,
                    });
                }
            }
        );
    }

    constructor({ scene, gameManager }: BombPanelConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const config = UI_CONFIG.bombPanel;

        this.container = this.scene.add.container(config.position.x, config.position.y);

        const panelContainer = this.scene.add.sprite(0, 0, "bomb_panel");

        this.lid = this.scene.add.sprite(this.container.x + 2, this.container.y - 24, "lid", 0);

        this.container.add([panelContainer]);

        this.wire = new Wire({
            scene: this.scene,
            wire: this.gameManager.currentWire,
            container: this.container,
        });

        new CutButton({
            scene: this.scene,
            gameManager: this.gameManager,
            container: this.container,
            lid: this.lid,
        });
        new SkipButton({
            scene: this.scene,
            gameManager: this.gameManager,
            container: this.container,
            lid: this.lid,
        });

        EventBus.on(EVENTS.GAME.NEXT_ROUND, this.redrawWire, this);
        EventBus.on(EVENTS.GAME.RESHUFFLED_WIRES, this.redrawWire, this);
    }
}
