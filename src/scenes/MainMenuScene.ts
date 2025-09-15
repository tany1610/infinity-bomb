import Phaser from "phaser";
import { MAIN_MENU_CONFIG } from "../utils/constants";
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
            x: width * MAIN_MENU_CONFIG.title.position.xRatio,
            y: height * MAIN_MENU_CONFIG.title.position.yRatio,
            content: MAIN_MENU_CONFIG.title.text,
            style: {
                fontSize: MAIN_MENU_CONFIG.title.fontSize,
                color: MAIN_MENU_CONFIG.title.color,
            },
        });

        new MenuButton({
            scene: this,
            x: width * MAIN_MENU_CONFIG.button.position.xRatio,
            y: height * MAIN_MENU_CONFIG.button.position.yRatio,
            text: "Start",
            style: MAIN_MENU_CONFIG.button,
            texture: "button_start_normal",
            onClick: () => this.scene.start("GameScene"),
        });

        new MenuButton({
            scene: this,
            x: width * MAIN_MENU_CONFIG.button.position.xRatio,
            y: height * (MAIN_MENU_CONFIG.button.position.yRatio + MAIN_MENU_CONFIG.button.spacing),
            text: "Quit",
            style: MAIN_MENU_CONFIG.button,
            texture: "button_start_normal",
            onClick: () => window.close(),
        });
    }
}
