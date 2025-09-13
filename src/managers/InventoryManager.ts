import type { Item } from "../models/items/Item";
import { GAME_CONFIG } from "../utils/constants";

export class InventoryManager {
    private items: Item[];
    private slotsCount: number;

    constructor() {
        this.items = [];
        this.slotsCount = GAME_CONFIG.inventory.slots.count;
    }

    public get hasSpace(): boolean {
        return this.items.length + 1 <= this.slotsCount;
    }
}
