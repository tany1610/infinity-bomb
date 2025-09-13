import Phaser from "phaser";
import { GAME_CONFIG } from "../utils/constants";
import { GameManager } from "../managers/GameManager";

interface HeaderConfig {
    scene: Phaser.Scene;
    manager: GameManager;
}

export class Header {
    private scene: Phaser.Scene;
    private manager: GameManager;

    constructor({ scene, manager }: HeaderConfig) {
        this.scene = scene;
        this.manager = manager;

        const { width } = this.scene.scale;

        const config = GAME_CONFIG.header;
        const livesConfig = GAME_CONFIG.header.lives;
        const coinsConfig = GAME_CONFIG.header.coins;
        const skipsConfig = GAME_CONFIG.header.skips;

        const lives = this.manager.lives;
        const coins = this.manager.shopManager.coins;

        this.scene.add
            .rectangle(
                width * config.position.xRatio,
                config.position.y,
                width,
                config.height,
                config.backgroundColor
            )
            .setOrigin(config.origin);
        this.scene.add.text(livesConfig.x, livesConfig.y, `${livesConfig.text} ${lives}`, {
            ...livesConfig.style,
        });
        this.scene.add.text(coinsConfig.x, coinsConfig.y, `${coinsConfig.text} ${coins}`, {
            ...coinsConfig.style,
        });
        this.scene.add.text(skipsConfig.x, skipsConfig.y, skipsConfig.text, {
            ...skipsConfig.style,
        });
    }
}
