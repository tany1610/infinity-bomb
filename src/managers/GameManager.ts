import type { Item } from "../models/items/Item";
import { InventoryManager } from "./InventoryManager";
import { ShopManager } from "./ShopManager";
import { WireManager } from "./WireManager";

export class GameManager {
    private readonly MAX_FUSES = 3;
    private _fuses!: number;

    private wireManager: WireManager;
    private shopManager: ShopManager;
    private inventoryManager: InventoryManager;

    private initGame() {
        this._fuses = this.MAX_FUSES;
    }

    constructor() {
        this.shopManager = new ShopManager();
        this.inventoryManager = new InventoryManager();
        this.wireManager = new WireManager();

        this.initGame();
    }

    public forceSafeCut(): void {
        this.wireManager.forceSafeCut();
    }

    public exposeExplodeChance(): void {
        this.wireManager.exposeExplodeChance();
    }

    public addFuse(): void {
        this._fuses = Math.min(this._fuses + 1, this.MAX_FUSES);
    }

    public getAvailableItems(): Item[] {
        return this.shopManager.availableItems;
    }
}
