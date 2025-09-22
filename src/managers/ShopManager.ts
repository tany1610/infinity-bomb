import { CORRUPTED_ITEM_CLASSES } from "../models/corruptedItems/ItemsRegistry";
import type { Item } from "../models/Item";
import { ITEM_CLASSES } from "../models/items/ItemsRegistry";
import type { Wire } from "../models/Wire";
import { AUDIO_KEYS, GAME_CONFIG } from "../utils/constants";
import { AudioManager } from "./AudioManager";

export class ShopManager {
    private _coins: number;
    private _doubleReward: boolean;
    private _trippleReward: boolean;
    private _items: Item[] = [];
    private _blackMarketItem!: Item | null;

    private generateRandomItem() {
        return ITEM_CLASSES[Math.floor(Math.random() * ITEM_CLASSES.length)];
    }

    private getRandomCorruptedItemClass() {
        return CORRUPTED_ITEM_CLASSES[Math.floor(Math.random() * CORRUPTED_ITEM_CLASSES.length)];
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
        this._trippleReward = false;
        this.generateRandomItems(GAME_CONFIG.startingShopItems);
        this.generateRandomBlackMarketItem();
    }

    public get coins() {
        return this._coins;
    }

    public get items() {
        return this._items;
    }

    public get blackMarketItem() {
        return this._blackMarketItem;
    }

    public activateDoubleReward(): void {
        this._doubleReward = true;
    }

    public activateTrippleReward(): void {
        this._trippleReward = true;
    }

    public resetRewards(): void {
        this._doubleReward = false;
        this._trippleReward = false;
    }

    public hasEnoughCoins(price: number): boolean {
        return this._coins >= price;
    }

    public buyItem(itemId: string): Item {
        const index = this._items.findIndex((item) => item.id === itemId);
        let boughtItem, itemPrice;

        if (index >= 0) {
            itemPrice = this._items[index].price;
            [boughtItem] = this._items.splice(index, 1);
            this.addNewItem();
        } else {
            // Black Market item
            itemPrice = this._blackMarketItem!.price;
            boughtItem = this._blackMarketItem;
            this._blackMarketItem = null;
        }

        AudioManager.getInstance().playSfx(AUDIO_KEYS.COIN);
        this._coins -= itemPrice;

        return boughtItem!;
    }

    public generateRandomBlackMarketItem() {
        const RandomItem = this.getRandomCorruptedItemClass();
        this._blackMarketItem = new RandomItem();
    }

    public addCoins(coins: number) {
        // As coins can be a negative, make sure we don't go under 0
        this._coins = Math.max(this._coins + coins, 0);
    }

    public reward(currentWire: Wire) {
        let rewardMult = 1;
        if (this._doubleReward) {
            rewardMult += 1;
        }
        if (this._trippleReward) {
            rewardMult += 3;
        }
        const reward = currentWire.explodeChance * 100 * rewardMult;
        this.addCoins(reward);
        this.resetRewards();
    }
}
