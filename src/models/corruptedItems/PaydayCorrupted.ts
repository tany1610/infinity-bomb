import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class PaydayCorrupted extends Item {
    private shouldApplyCorruption(): boolean {
        const randomChance = Number(Math.random().toFixed(1)) * 100;
        return randomChance <= this.corruptionChance;
    }

    constructor() {
        super(
            ITEMS_CONFIG.paydayCorrupted.title,
            ITEMS_CONFIG.paydayCorrupted.key,
            ITEMS_CONFIG.paydayCorrupted.price,
            ITEMS_CONFIG.paydayCorrupted.effect,
            ITEMS_CONFIG.paydayCorrupted.image,
            true,
            ITEMS_CONFIG.paydayCorrupted.corruptionChance
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.activateTrippleReward();

        if (this.shouldApplyCorruption()) {
            const coins = gameManager.getCoins();
            gameManager.addCoins(-coins);
        }

        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
