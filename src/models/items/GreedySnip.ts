import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class GreedySnip extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.greedySnip.title,
            ITEMS_CONFIG.greedySnip.key,
            ITEMS_CONFIG.greedySnip.price,
            ITEMS_CONFIG.greedySnip.effect,
            ITEMS_CONFIG.greedySnip.image
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.activateDoubleBlow();
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
