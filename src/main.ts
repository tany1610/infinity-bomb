import { GameScene } from "./scenes/GameScene";
import { MainMenuScene } from "./scenes/MainMenuScene";
import "./style.scss";
import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: 500,
  height: 500,
  scene: [MainMenuScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

new Phaser.Game(config);
