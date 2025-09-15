import type { GameManager } from "../managers/GameManager";
import { EVENTS, UI_CONFIG } from "../utils/constants";
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
    private roundText!: Phaser.GameObjects.Text;

    private drawHeaderContent(): void {
        const livesConfig = UI_CONFIG.header.lives;
        const coinsConfig = UI_CONFIG.header.coins;
        const skipsConfig = UI_CONFIG.header.skips;
        const roundConfig = UI_CONFIG.header.round;

        const lives = this.gameManager.lives;
        const coins = this.gameManager.coins;
        const round = this.gameManager.round;

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

        this.roundText = this.scene.add.text(
            roundConfig.x,
            roundConfig.y,
            `${roundConfig.text} ${round}`,
            {
                ...roundConfig.style,
            }
        );
    }

    private updateCoins() {
        const coinsConfig = UI_CONFIG.header.coins;
        const coins = this.gameManager.coins;

        this.coinsText.setText(`${coinsConfig.text} ${coins}`);
    }

    private updateLives() {
        const livesConfig = UI_CONFIG.header.lives;
        const lives = this.gameManager.lives;

        this.livesText.setText(`${livesConfig.text} ${lives}`);
    }

    private updateRound() {
        const roundConfig = UI_CONFIG.header.round;
        const round = this.gameManager.round;

        this.roundText.setText(`${roundConfig.text} ${round}`);
    }
    constructor({ scene, gameManager }: HeaderConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width } = this.scene.scale;

        const config = UI_CONFIG.header;

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
        EventBus.on(EVENTS.GAME.NEXT_ROUND, this.updateCoins, this);
        EventBus.on(EVENTS.GAME.NEXT_ROUND, this.updateRound, this);
        EventBus.on(EVENTS.INVENTORY.ITEM_USED, this.updateLives, this);
        EventBus.on(EVENTS.GAME.LOST_LIFE, this.updateLives, this);
    }
}
