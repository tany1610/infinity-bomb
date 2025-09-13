import type { Item } from "../models/items/Item";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";

export class InventoryManager {
    private _items: Item[] = [];
    private slotsCount: number;

    private addItem(item: Item) {
        if (this.hasSpace) {
            this._items.push(item);
        }
    }

    constructor() {
        this._items = [];
        this.slotsCount = GAME_CONFIG.inventory.slots.count;

        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.addItem, this);
    }

    public get items(): Item[] {
        return this._items;
    }

    public get hasSpace(): boolean {
        return this._items.length + 1 <= this.slotsCount;
    }
}
