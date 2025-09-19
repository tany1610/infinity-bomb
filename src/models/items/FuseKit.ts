import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class FuseKit extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.fuseKit.title,
            ITEMS_CONFIG.fuseKit.key,
            ITEMS_CONFIG.fuseKit.price,
            ITEMS_CONFIG.fuseKit.effect,
            ITEMS_CONFIG.fuseKit.image
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.addFuse();
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
