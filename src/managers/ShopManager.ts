import type { Item } from "../models/items/Item";
import { ITEM_CLASSES } from "../models/items/ItemsRegistry";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";

export class ShopManager {
    private _coins: number;
    private _items: Item[] = [];

    private generateRandomItems(count: number) {
        this._items = [];

        for (let i = 0; i < count; i++) {
            const RandomItem = ITEM_CLASSES[Math.floor(Math.random() * ITEM_CLASSES.length)];
            this._items.push(new RandomItem());
        }
    }

    private hasEnoughCoins(price: number): boolean {
        return this._coins >= price;
    }

    constructor() {
        this._coins = GAME_CONFIG.startingCoins;
        this.generateRandomItems(GAME_CONFIG.startingShopItems);
    }

    public get coins() {
        return this._coins;
    }

    public get items() {
        return this._items;
    }

    public buyItem(itemId: string): void {
        const index = this._items.findIndex((item) => item.id === itemId);
        const itemPrice = this._items[index].price;

        if (this.hasEnoughCoins(itemPrice)) {
            this._coins -= itemPrice;
            const [boughtItem] = this._items.splice(index, 1);

            EventBus.emit(EVENTS.SHOP.ITEM_BOUGHT, boughtItem);
        }
    }
}
