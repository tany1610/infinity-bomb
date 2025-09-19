import type { Item } from "../models/Item";
import { EVENTS, UI_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";

export class InventoryManager {
    private _items: Item[] = [];
    private slotsCount: number;

    private addItem(item: Item) {
        if (this.hasSpace) {
            this._items.push(item);
        }
    }

    private removeItem(item: Item) {
        const index = this._items.findIndex((invItem) => invItem.id === item.id);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
    }

    constructor() {
        this._items = [];
        this.slotsCount = UI_CONFIG.inventory.slots.count;

        EventBus.on(EVENTS.SHOP.ITEM_BOUGHT, this.addItem, this);
        EventBus.on(EVENTS.INVENTORY.ITEM_USED, this.removeItem, this);
    }

    public get items(): Item[] {
        return this._items;
    }

    public get hasSpace(): boolean {
        return this._items.length + 1 <= this.slotsCount;
    }
}
