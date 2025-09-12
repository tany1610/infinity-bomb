import { GameManager } from "../../managers/GameManager";
import { Item } from "./Item";
import { ITEMS_CONFIG } from "../../utils/constants";

export class FuseKit extends Item {
    constructor() {
        super(ITEMS_CONFIG.fuseKit.title, ITEMS_CONFIG.fuseKit.price, ITEMS_CONFIG.fuseKit.effect);
    }

    apply(gameManager: GameManager): void {
        gameManager.addFuse();
    }
}
