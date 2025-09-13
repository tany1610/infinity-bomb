import Phaser from "phaser";
import { MENU_CONFIG } from "../utils/constants";
import { Text } from "../ui/Text";
import { MenuButton } from "../ui/buttons/MenuButton";

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }

    preload() {
        this.load.image("button_start_normal", "assets/button-normal.png");
    }

    create() {
        const { width, height } = this.scale;

        new Text({
            scene: this,
            x: width * MENU_CONFIG.title.position.xRatio,
            y: height * MENU_CONFIG.title.position.yRatio,
            content: MENU_CONFIG.title.text,
            style: {
                fontSize: MENU_CONFIG.title.fontSize,
                color: MENU_CONFIG.title.color,
            },
        });

        new MenuButton({
            scene: this,
            x: width * MENU_CONFIG.button.position.xRatio,
            y: height * MENU_CONFIG.button.position.yRatio,
            text: "Start",
            style: MENU_CONFIG.button,
            texture: "button_start_normal",
            onClick: () => this.scene.start("GameScene"),
        });

        new MenuButton({
            scene: this,
            x: width * MENU_CONFIG.button.position.xRatio,
            y: height * (MENU_CONFIG.button.position.yRatio + MENU_CONFIG.button.spacing),
            text: "Quit",
            style: MENU_CONFIG.button,
            texture: "button_start_normal",
            onClick: () => window.close(),
        });
    }
}
