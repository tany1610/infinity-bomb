import type { Wire as WireModel } from "../models/Wire";
import { EVENTS, UI_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";

interface WireConfig {
    scene: Phaser.Scene;
    wire: WireModel;
    container: Phaser.GameObjects.Container;
}

export class Wire {
    private scene: Phaser.Scene;
    private wire: WireModel;
    private sprite: Phaser.GameObjects.Sprite;
    private container: Phaser.GameObjects.Container;

    constructor({ scene, wire, container }: WireConfig) {
        this.scene = scene;
        this.wire = wire;
        this.container = container;

        const wireConfig = UI_CONFIG.bombPanel.wire;

        this.sprite = this.scene.add
            .sprite(wireConfig.position.x, wireConfig.position.y, this.wire.texture)
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => EventBus.emit(EVENTS.BOMB_PANEL.WIRE_POINTEROVER, this.wire))
            .on("pointerout", () => EventBus.emit(EVENTS.BOMB_PANEL.WIRE_POINTEROUT, this.wire));

        this.container.add(this.sprite);
    }

    public destroy() {
        this.sprite.destroy();
    }
}
