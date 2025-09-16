import { GameManager } from "../../managers/GameManager";
import { Item } from "./Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class WireSwap extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.wireSwap.title,
            ITEMS_CONFIG.wireSwap.price,
            ITEMS_CONFIG.wireSwap.effect,
            ITEMS_CONFIG.wireSwap.image
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.nextWire();
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
