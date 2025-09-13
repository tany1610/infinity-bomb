import Phaser from "phaser";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { GameManager } from "../managers/GameManager";
import { EventBus } from "../utils/EventBus";

interface HeaderConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class Header {
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private livesText!: Phaser.GameObjects.Text;
    private coinsText!: Phaser.GameObjects.Text;
    private skipsText!: Phaser.GameObjects.Text;

    private drawHeaderContent(): void {
        const livesConfig = GAME_CONFIG.header.lives;
        const coinsConfig = GAME_CONFIG.header.coins;
        const skipsConfig = GAME_CONFIG.header.skips;

        const lives = this.gameManager.lives;
        const coins = this.gameManager.coins;

        this.livesText = this.scene.add.text(
            livesConfig.x,
            livesConfig.y,
            `${livesConfig.text} ${lives}`,
            {
                ...livesConfig.style,
            }
        );

        this.coinsText = this.scene.add.text(
            coinsConfig.x,
            coinsConfig.y,
            `${coinsConfig.text} ${coins}`,
            {
                ...coinsConfig.style,
            }
        );

        this.skipsText = this.scene.add.text(skipsConfig.x, skipsConfig.y, skipsConfig.text, {
            ...skipsConfig.style,
        });
    }

    private updateCoins() {
        const coinsConfig = GAME_CONFIG.header.coins;
        const coins = this.gameManager.coins;

        this.coinsText.setText(`${coinsConfig.text} ${coins}`);
    }

    constructor({ scene, gameManager }: HeaderConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width } = this.scene.scale;

        const config = GAME_CONFIG.header;

        this.scene.add
            .rectangle(
                width * config.position.xRatio,
                config.position.y,
                width,
                config.height,
                config.backgroundColor
            )
            .setOrigin(config.origin);

        this.drawHeaderContent();

        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.updateCoins, this);
    }
}
