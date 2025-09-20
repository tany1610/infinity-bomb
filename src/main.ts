import "./style.scss";
import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { GAME_HEIGHT, GAME_WIDTH } from "./utils/constants";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    transparent: true,
    scene: [MainMenuScene, GameScene, GameOverScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
};

new Phaser.Game(config);
