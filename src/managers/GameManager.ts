import type { Item } from "../models/items/Item";
import { GAME_CONFIG } from "../utils/constants";
import { InventoryManager } from "./InventoryManager";
import { ShopManager } from "./ShopManager";
import { WireManager } from "./WireManager";

export class GameManager {
    private _lives!: number;

    public _wireManager: WireManager;
    public _shopManager: ShopManager;
    public _inventoryManager: InventoryManager;

    private initGame() {
        this._lives = GAME_CONFIG.startinglives;
    }

    constructor() {
        this._shopManager = new ShopManager();
        this._inventoryManager = new InventoryManager();
        this._wireManager = new WireManager();

        this.initGame();
    }

    public get lives() {
        return this._lives;
    }

    public get shopItems(): Item[] {
        return this._shopManager.items;
    }

    public get coins(): number {
        return this._shopManager.coins;
    }

    public get inventoryItems(): Item[] {
        return this._inventoryManager.items;
    }

    public addFuse(): void {
        this._lives = Math.min(this._lives + 1, GAME_CONFIG.startinglives);
    }

    public exposeExplodeChance(): void {
        this._wireManager.exposeExplodeChance();
    }

    public forceSafeCut(): void {
        this._wireManager.forceSafeCut();
    }

    public buyItem(itemId: string): void {
        if (this._inventoryManager.hasSpace) {
            this._shopManager.buyItem(itemId);
        }
    }
}
