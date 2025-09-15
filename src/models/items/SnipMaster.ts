import { GameManager } from "../../managers/GameManager";
import { Item } from "./Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class SnipMaster extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.snipMaster.title,
            ITEMS_CONFIG.snipMaster.price,
            ITEMS_CONFIG.snipMaster.effect,
            ITEMS_CONFIG.snipMaster.image
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.forceSafeCut();
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
