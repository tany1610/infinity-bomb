import { GameManager } from "../../managers/GameManager";
import { Item } from "../Item";
import { EVENTS, ITEMS_CONFIG } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";

export class DefuserDrone extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.defuserDrone.title,
            ITEMS_CONFIG.defuserDrone.key,
            ITEMS_CONFIG.defuserDrone.price,
            ITEMS_CONFIG.defuserDrone.effect,
            ITEMS_CONFIG.defuserDrone.image
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.cutWire();
        EventBus.emit(EVENTS.INVENTORY.ITEM_USED, this);
    }
}
