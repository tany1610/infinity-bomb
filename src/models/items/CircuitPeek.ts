import { GameManager } from "../../managers/GameManager";
import { Item } from "./Item";
import { ITEMS_CONFIG } from "../../utils/constants";

export class CircuitPeek extends Item {
    constructor() {
        super(
            ITEMS_CONFIG.circuitPeek.title,
            ITEMS_CONFIG.circuitPeek.price,
            ITEMS_CONFIG.circuitPeek.effect
        );
    }

    apply(gameManager: GameManager): void {
        gameManager.forceSafeCut();
    }
}
