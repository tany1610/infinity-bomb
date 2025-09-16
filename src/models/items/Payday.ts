import { GameManager } from "../../managers/GameManager";
import { Item } from "./Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class Payday extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.payday.title,
            ITEMS_CONFIG.payday.key,
            ITEMS_CONFIG.payday.price,
            ITEMS_CONFIG.payday.effect,
            ITEMS_CONFIG.payday.image
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.activateDoubleReward();
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
