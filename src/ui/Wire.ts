import type { Wire as WireModel } from "../models/Wire";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
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
        const wireConfig = GAME_CONFIG.bombPanel.wire;

        this.scene.add
            .rectangle(
                width * wireConfig.position.xRatio + wireConfig.offsetX,
                height * wireConfig.position.yRatio + wireConfig.offsetY,
                wireConfig.width,
                wireConfig.height,
                this.wire.color
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => EventBus.emit(EVENTS.BOMB_PANEL.WIRE_POINTEROVER, this.wire))
            .on("pointerout", () => EventBus.emit(EVENTS.BOMB_PANEL.WIRE_POINTEROUT, this.wire));
    }
}
