import { GameManager } from "../../managers/GameManager";
import { Item } from "./Item";
import { ITEMS_CONFIG } from "../../utils/constants";

export class SnipMaster extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.snipMaster.title,
            ITEMS_CONFIG.snipMaster.price,
            ITEMS_CONFIG.snipMaster.effect
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.forceSafeCut();
    }
}
