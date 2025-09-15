import { GameManager } from "../../managers/GameManager";
import { Item } from "./Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class CircuitPeek extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.circuitPeek.title,
            ITEMS_CONFIG.circuitPeek.price,
            ITEMS_CONFIG.circuitPeek.effect,
            ITEMS_CONFIG.circuitPeek.image
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.exposeExplodeChance();
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
