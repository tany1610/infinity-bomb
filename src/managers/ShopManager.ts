import type { Item } from "../models/items/Item";
import { ITEM_CLASSES } from "../models/items/ItemsRegistry";

export class ShopManager {
    private items: Item[] = [];

    private generateRandomItems(count: number) {
        this.items = [];

        for (let i = 0; i < count; i++) {
            const randomClass = ITEM_CLASSES[Math.floor(Math.random() * ITEM_CLASSES.length)];
            this.items.push(new randomClass());
        }
    }

    constructor() {
        this.generateRandomItems(3);
    }

    public get availableItems() {
        return this.items;
    }
}
