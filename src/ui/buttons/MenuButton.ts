import { AudioManager } from "../../managers/AudioManager";
import { AUDIO_KEYS, FONT_FAMILY } from "../../utils/constants";

interface MenuButtonConfig {
    scene: Phaser.Scene;
    x: number;
    y: number;
    text: string;
    style: Phaser.Types.GameObjects.Text.TextStyle;
    texture: string;
    onClickHandler: () => void;
}

export class MenuButton {
    private buttonSprite: Phaser.GameObjects.Sprite;
    private textObject: Phaser.GameObjects.Text;
    private onClickHandler: () => void;

    private onClick() {
        this.onClickHandler();
        AudioManager.getInstance().playSfx(AUDIO_KEYS.CLICK);
    }

    constructor({ scene, x, y, text, style, texture, onClickHandler }: MenuButtonConfig) {
        this.onClickHandler = onClickHandler;

        this.buttonSprite = scene.add
            .sprite(x, y, texture)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        this.textObject = scene.add
            .text(x, y, text.toUpperCase(), {
                ...style,
                fontFamily: FONT_FAMILY,
            })
            .setOrigin(0.5)
            .setResolution(3);

        this.buttonSprite.on("pointerdown", () => this.onClick());
    }

    public setPosition(x: number, y: number) {
        this.buttonSprite.setPosition(x, y);
        this.textObject.setPosition(x, y);
    }

    public setVisible(visible: boolean) {
        this.buttonSprite.setVisible(visible);
        this.textObject.setVisible(visible);
    }
}
