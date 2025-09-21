import { EVENTS, GAME_WIDTH, UI_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import type { IHovarable } from "../utils/interfaces";

interface HintConfig {
    scene: Phaser.Scene;
}

export class Hint {
    private scene: Phaser.Scene;
    private background: Phaser.GameObjects.Rectangle;
    private title: Phaser.GameObjects.Text;
    private description: Phaser.GameObjects.Text;
    private container: Phaser.GameObjects.Container;

    private show(item: IHovarable) {
        this.background.setVisible(true);
        this.title.setText(item.name).setVisible(true);
        this.description.setText(item.description).setVisible(true);
    }

    private hide() {
        this.background.setVisible(false);
        this.title.setVisible(false);
        this.description.setVisible(false);
    }

    constructor({ scene }: HintConfig) {
        this.scene = scene;

        const { width } = this.scene.scale;
        const inventoryConfig = UI_CONFIG.inventory;
        const hintConfig = UI_CONFIG.hint;

        this.container = this.scene.add.container(
            inventoryConfig.position.x + GAME_WIDTH / 2,
            inventoryConfig.position.y - inventoryConfig.height / 2
        );

        this.background = this.scene.add.rectangle(
            0,
            0,
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

        this.container.add(this.background);
        this.container.add(this.title);
        this.container.add(this.description);

        this.hide();

        EventBus.on(EVENTS.BOMB_PANEL.WIRE_POINTEROVER, this.show, this);
        EventBus.on(EVENTS.BOMB_PANEL.WIRE_POINTEROUT, this.hide, this);
        EventBus.on(EVENTS.INVENTORY.ITEM_POINTEROVER, this.show, this);
        EventBus.on(EVENTS.INVENTORY.ITEM_POINTEROUT, this.hide, this);
        EventBus.on(EVENTS.INVENTORY.ITEM_USED, this.hide, this);
    }
}
