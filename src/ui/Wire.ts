import type { Wire as WireModel } from "../models/Wire";
import { EVENTS, UI_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";

interface WireConfig {
    scene: Phaser.Scene;
    wire: WireModel;
}

export class Wire {
    private scene: Phaser.Scene;
    private wire: WireModel;

    constructor({ scene, wire }: WireConfig) {
        this.scene = scene;
        this.wire = wire;

        const { width, height } = this.scene.scale;
        const wireConfig = UI_CONFIG.bombPanel.wire;

        this.scene.add
            .sprite(
                width * wireConfig.position.xRatio + wireConfig.offsetX,
                height * wireConfig.position.yRatio + wireConfig.offsetY,
                this.wire.texture
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => EventBus.emit(EVENTS.BOMB_PANEL.WIRE_POINTEROVER, this.wire))
            .on("pointerout", () => EventBus.emit(EVENTS.BOMB_PANEL.WIRE_POINTEROUT, this.wire));
    }
}
