import type { Item } from "../models/items/Item";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";

interface HintConfig {
    scene: Phaser.Scene;
}

export class Hint {
    private scene: Phaser.Scene;
    private background: Phaser.GameObjects.Rectangle;
    private title: Phaser.GameObjects.Text;
    private description: Phaser.GameObjects.Text;

    private show(item: Item) {
        this.background.setVisible(true);
        this.title.setText(item.name).setVisible(true);
        this.description.setText(item.effect).setVisible(true);
    }

    private hide() {
        this.background.setVisible(false);
        this.title.setVisible(false);
        this.description.setVisible(false);
    }

    constructor({ scene }: HintConfig) {
        this.scene = scene;

        const { width, height } = this.scene.scale;
        const inventoryConfig = GAME_CONFIG.inventory;
        const hintConfig = GAME_CONFIG.hint;

        this.background = this.scene.add.rectangle(
            width * inventoryConfig.position.xRatio,
            height * inventoryConfig.position.yRatio + inventoryConfig.offsetY - hintConfig.height,
            width,
            hintConfig.height,
            hintConfig.backgroundColor
        );

        this.title = this.scene.add
            .text(this.background.x, this.background.y + hintConfig.title.offestY, "", {
                ...hintConfig.title.style,
            })
            .setOrigin(hintConfig.title.origin);

        this.description = this.scene.add
            .text(this.background.x, this.background.y + hintConfig.description.offestY, "", {
                ...hintConfig.description.style,
            })
            .setOrigin(hintConfig.description.origin);

        this.hide();

        EventBus.on(EVENTS.INVENTORY.ITEM_POINTOVER, this.show, this);
        EventBus.on(EVENTS.INVENTORY.ITEM_POINTOUT, this.hide, this);
    }
}
