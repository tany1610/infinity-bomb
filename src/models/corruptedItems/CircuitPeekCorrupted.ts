import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class CircuitPeekCorrupted extends Item {
    private shouldApplyCorruption(): boolean {
        const randomChance = Number(Math.random().toFixed(1)) * 100;
        return randomChance <= this.corruptionChance;
    }

    constructor() {
        super(
            ITEMS_CONFIG.circuitPeekCorrupted.title,
            ITEMS_CONFIG.circuitPeekCorrupted.key,
            ITEMS_CONFIG.circuitPeekCorrupted.price,
            ITEMS_CONFIG.circuitPeekCorrupted.effect,
            ITEMS_CONFIG.circuitPeekCorrupted.image,
            true,
            ITEMS_CONFIG.circuitPeekCorrupted.corruptionChance
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.addSkip();

        if (this.shouldApplyCorruption()) {
            gameManager.exposeExplodeChance(true);
        } else {
            gameManager.exposeExplodeChance();
        }

        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
