import type { Item } from "../models/items/Item";
import { ITEM_CLASSES } from "../models/items/ItemsRegistry";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";

export class ShopManager {
    private _coins: number;
    private items: Item[] = [];

    private generateRandomItems(count: number) {
        this.items = [];

        for (let i = 0; i < count; i++) {
            const RandomItem = ITEM_CLASSES[Math.floor(Math.random() * ITEM_CLASSES.length)];
            this.items.push(new RandomItem());
        }
    }

    private hasEnoughCoins(price: number): boolean {
        return this._coins >= price;
    }

    constructor() {
        this._coins = GAME_CONFIG.startingcoins;
        this.generateRandomItems(1);
    }

    public get coins() {
        return this._coins;
    }

    public get availableItems() {
        return this.items;
    }

    public buyItem(itemId: string): void {
        const index = this.items.findIndex((item) => item.id === itemId);
        const itemPrice = this.items[index].price;

        if (this.hasEnoughCoins(itemPrice)) {
            this._coins -= itemPrice;
            const [boughtItem] = this.items.splice(index, 1);

            EventBus.emit(EVENTS.SHOP.ITEM_BOUGHT, boughtItem);
        }
    }
}
