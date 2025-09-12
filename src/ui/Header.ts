import Phaser from "phaser";
import { GAME_CONFIG } from "../utils/constants";

interface HeaderConfig {
    scene: Phaser.Scene;
}

export class Header {
    private scene: Phaser.Scene;

    constructor({ scene }: HeaderConfig) {
        this.scene = scene;

        const { width } = this.scene.scale;

        const config = GAME_CONFIG.header;
        const livesConfig = GAME_CONFIG.header.lives;
        const coinsConfig = GAME_CONFIG.header.coins;
        const skipsConfig = GAME_CONFIG.header.skips;

        this.scene.add
            .rectangle(
                width * config.position.xRatio,
                config.position.y,
                width,
                config.height,
                config.backgroundColor
            )
            .setOrigin(config.origin);
        this.scene.add.text(livesConfig.x, livesConfig.y, livesConfig.text, {
            ...livesConfig.style,
        });
        this.scene.add.text(coinsConfig.x, coinsConfig.y, coinsConfig.text, {
            ...coinsConfig.style,
        });
        this.scene.add.text(skipsConfig.x, skipsConfig.y, skipsConfig.text, {
            ...skipsConfig.style,
        });
    }
}
