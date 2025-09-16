import type { Item } from "../models/items/Item";
import { ITEM_CLASSES } from "../models/items/ItemsRegistry";
import type { Wire } from "../models/Wire";
import { GAME_CONFIG } from "../utils/constants";

export class ShopManager {
    private _coins: number;
    private _doubleReward: boolean;
    private _items: Item[] = [];

    private generateRandomItem() {
        return ITEM_CLASSES[Math.floor(Math.random() * ITEM_CLASSES.length)];
    }

    private addNewItem() {
        let item: Item;
        do {
            const RandomItem = this.generateRandomItem();
            item = new RandomItem();
        } while (this._items.some((i) => i.key === item.key));

        this._items.push(item);
    }

    private generateRandomItems(count: number) {
        this._items = [];

        for (let i = 0; i < count; i++) {
            this.addNewItem();
        }
    }

    constructor() {
        this._coins = GAME_CONFIG.startingCoins;
        this._doubleReward = false;
        this.generateRandomItems(GAME_CONFIG.startingShopItems);
    }

    public get coins() {
        return this._coins;
    }

    public get items() {
        return this._items;
    }

    public activateDoubleReward(): void {
        this._doubleReward = true;
    }

    public hasEnoughCoins(price: number): boolean {
        return this._coins >= price;
    }

    public buyItem(itemId: string): Item {
        const index = this._items.findIndex((item) => item.id === itemId);
        const itemPrice = this._items[index].price;

        this._coins -= itemPrice;
        const [boughtItem] = this._items.splice(index, 1);
        this.addNewItem();
        return boughtItem;
    }

    public reward(currentWire: Wire) {
        const rewardMult = this._doubleReward ? 2 : 1;
        const reward = currentWire.explodeChance * 100 * rewardMult;
        this._coins += reward;
        this._doubleReward = false;
    }
}
