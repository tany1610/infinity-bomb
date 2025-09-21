import Phaser from "phaser";
import { EVENTS, UI_CONFIG } from "../utils/constants";
import { GameManager } from "../managers/GameManager";
import { InventorySlot } from "./slots/InventorySlot";
import { EventBus } from "../utils/EventBus";

interface InventoryConfig {
    scene: Phaser.Scene;
    gameManager: GameManager;
}

export class Inventory {
    private scene: Phaser.Scene;
    private gameManager: GameManager;
    private inventorySlots: InventorySlot[] = [];
    private container: Phaser.GameObjects.Container;

    private initInventoryItems() {
        this.inventorySlots.forEach((slot) => slot.destroy());
        this.inventorySlots = [];

        const slotsConfig = UI_CONFIG.inventory.slots;

        const inventoryItems = this.gameManager.inventoryItems;

        for (let index = 0; index < slotsConfig.count; index++) {
            const item = inventoryItems[index];
            this.inventorySlots.push(
                new InventorySlot({
                    index,
                    item,
                    scene: this.scene,
                    gameManager: this.gameManager,
                    inventoryContainer: this.container,
                })
            );
        }
    }

    constructor({ scene, gameManager }: InventoryConfig) {
        this.scene = scene;
        this.gameManager = gameManager;

        const { width } = this.scene.scale;
        const config = UI_CONFIG.inventory;

        this.container = this.scene.add.container(config.position.x, config.position.y);

        const background = this.scene.add
            .rectangle(0, 0, width, config.height, config.backgroundColor)
            .setOrigin(0, 0);

        this.container.add(background);

        this.initInventoryItems();

        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.initInventoryItems, this);
        EventBus.on(EVENTS.INVENTORY.ITEM_USED, this.initInventoryItems, this);
    }
}
