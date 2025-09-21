import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class DefuserDroneCorrupted extends Item {
    private shouldApplyCorruption(): boolean {
        const randomChance = Number(Math.random().toFixed(1)) * 100;
        return randomChance <= this.corruptionChance;
    }

    constructor() {
        super(
            ITEMS_CONFIG.fuseKitCorrupted.title,
            ITEMS_CONFIG.fuseKitCorrupted.key,
            ITEMS_CONFIG.fuseKitCorrupted.price,
            ITEMS_CONFIG.fuseKitCorrupted.effect,
            ITEMS_CONFIG.fuseKitCorrupted.image,
            true,
            ITEMS_CONFIG.fuseKitCorrupted.corruptionChance
        );
    }

    apply(gameManager: GameManager): void {
        if (this.shouldApplyCorruption()) {
            gameManager.cutWire();
            setTimeout(() => {
                gameManager.cutWire();
            }, 1000);
        }
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
