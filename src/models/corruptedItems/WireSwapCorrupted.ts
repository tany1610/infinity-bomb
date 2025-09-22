import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class WireSwapCorrupted extends Item {
    private shouldApplyCorruption(): boolean {
        const randomChance = Number(Math.random().toFixed(1)) * 100;
        return randomChance <= this.corruptionChance;
    }

    constructor() {
        super(
            ITEMS_CONFIG.wireSwapCorrupted.title,
            ITEMS_CONFIG.wireSwapCorrupted.key,
            ITEMS_CONFIG.wireSwapCorrupted.price,
            ITEMS_CONFIG.wireSwapCorrupted.effect,
            ITEMS_CONFIG.wireSwapCorrupted.image,
            true,
            ITEMS_CONFIG.wireSwapCorrupted.corruptionChance
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.swapWires();

        if (this.shouldApplyCorruption()) {
            gameManager.generateRandomWiresConfig();
        }

        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
