import Phaser from "phaser";
import { FONT_FAMILY } from "../utils/constants";

interface MenuButtonConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  style: Phaser.Types.GameObjects.Text.TextStyle;
  normalTexture: string;
  hoverTexture: string;
  onClick: () => void;
}

export class MenuButton {
  private buttonSprite: Phaser.GameObjects.Sprite;
  private textObject: Phaser.GameObjects.Text;

  constructor({
    scene,
    x,
    y,
    text,
    style,
    normalTexture,
    hoverTexture,
    onClick,
  }: MenuButtonConfig) {
    this.buttonSprite = scene.add
      .sprite(x, y, normalTexture)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.textObject = scene.add
      .text(x, y, text.toUpperCase(), {
        ...style,
        fontFamily: FONT_FAMILY,
      })
      .setOrigin(0.5)
      .setResolution(3);

    this.buttonSprite.on("pointerover", () => {
      this.buttonSprite.setTexture(hoverTexture);
    });

    this.buttonSprite.on("pointerout", () => {
      this.buttonSprite.setTexture(normalTexture);
    });

    this.buttonSprite.on("pointerdown", onClick);
  }

  setPosition(x: number, y: number) {
    this.buttonSprite.setPosition(x, y);
    this.textObject.setPosition(x, y);
  }

  setVisible(visible: boolean) {
    this.buttonSprite.setVisible(visible);
    this.textObject.setVisible(visible);
  }
}
