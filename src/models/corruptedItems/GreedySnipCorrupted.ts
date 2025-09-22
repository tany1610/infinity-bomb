import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class GreedySnipCorrupted extends Item {
    private shouldApplyCorruption(): boolean {
        const randomChance = Number(Math.random().toFixed(1)) * 100;
        return randomChance <= this.corruptionChance;
    }

    constructor() {
        super(
            ITEMS_CONFIG.greedySnipCorrupted.title,
            ITEMS_CONFIG.greedySnipCorrupted.key,
            ITEMS_CONFIG.greedySnipCorrupted.price,
            ITEMS_CONFIG.greedySnipCorrupted.effect,
            ITEMS_CONFIG.greedySnipCorrupted.image,
            true,
            ITEMS_CONFIG.greedySnipCorrupted.corruptionChance
        );
    }

    apply(gameManager: GameManager): void {
        if (this.shouldApplyCorruption()) {
            gameManager.activateTrippleReward();
            gameManager.activateDoubleBlow();
        }

        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
