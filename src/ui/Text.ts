import Phaser from "phaser";
import { FONT_FAMILY } from "../utils/constants";

interface TextConfig {
    scene: Phaser.Scene;
    x: number;
    y: number;
    content: string;
    style: Phaser.Types.GameObjects.Text.TextStyle;
}

export class Text {
    constructor({ scene, x, y, content, style }: TextConfig) {
        scene.add
            .text(x, y, content, { ...style, fontFamily: FONT_FAMILY })
            .setOrigin(0.5)
            .setResolution(3);
    }
}
