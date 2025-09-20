import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class SnipMasterCorrupted extends Item {
    private shouldApplyCorruption(): boolean {
        const randomChance = Number(Math.random().toFixed(1)) * 100;
        return randomChance <= this.corruptionChance;
    }

    constructor() {
        super(
            ITEMS_CONFIG.snipMasterCorrupted.title,
            ITEMS_CONFIG.snipMasterCorrupted.key,
            ITEMS_CONFIG.snipMasterCorrupted.price,
            ITEMS_CONFIG.snipMasterCorrupted.effect,
            ITEMS_CONFIG.snipMasterCorrupted.image,
            true,
            ITEMS_CONFIG.snipMasterCorrupted.corruptionChance
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.addSkip();
        gameManager.forceSafeCut();

        if (this.shouldApplyCorruption()) {
            const coinsToRemove = Math.round(gameManager.getCoins() / 2);
            gameManager.addCoins(-coinsToRemove);
        }

        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
