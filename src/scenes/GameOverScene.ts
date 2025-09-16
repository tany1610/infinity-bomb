import Phaser from "phaser";
import { GAME_OVER_MENU_CONFIG } from "../utils/constants";
import { Text } from "../ui/Text";
import { MenuButton } from "../ui/buttons/MenuButton";

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" });
    }

    preload() {
        this.load.image("button_start_normal", "assets/button-normal.png");
    }

    create() {
        const { width, height } = this.scale;
        const score = localStorage.getItem("score");
        const scoreText = `${GAME_OVER_MENU_CONFIG.scoreText.text} ${score}`;

        new Text({
            scene: this,
            x: width * GAME_OVER_MENU_CONFIG.title.position.xRatio,
            y: height * GAME_OVER_MENU_CONFIG.title.position.yRatio,
            content: GAME_OVER_MENU_CONFIG.title.text,
            style: {
                fontSize: GAME_OVER_MENU_CONFIG.title.fontSize,
                color: GAME_OVER_MENU_CONFIG.title.color,
            },
        });

        new Text({
            scene: this,
            x: width * GAME_OVER_MENU_CONFIG.scoreText.position.xRatio,
            y: height * GAME_OVER_MENU_CONFIG.scoreText.position.yRatio,
            content: scoreText,
            style: {
                fontSize: GAME_OVER_MENU_CONFIG.scoreText.fontSize,
                color: GAME_OVER_MENU_CONFIG.scoreText.color,
            },
        });

        new MenuButton({
            scene: this,
            x: width * GAME_OVER_MENU_CONFIG.button.position.xRatio,
            y: height * GAME_OVER_MENU_CONFIG.button.position.yRatio,
            text: GAME_OVER_MENU_CONFIG.button.text,
            style: GAME_OVER_MENU_CONFIG.button,
            texture: "button_start_normal",
            onClickHandler: () => this.scene.start("MainMenuScene"),
        });
    }
}
