import { InventoryManager } from "./InventoryManager";
import { ShopManager } from "./ShopManager";
import { WireManager } from "./WireManager";

export class GameManager {
    private readonly MAX_FUSES = 3;
    private _fuses!: number;

    public _wireManager: WireManager;
    public _shopManager: ShopManager;
    public _inventoryManager: InventoryManager;

    private initGame() {
        this._fuses = this.MAX_FUSES;
    }

    constructor() {
        this._shopManager = new ShopManager();
        this._inventoryManager = new InventoryManager();
        this._wireManager = new WireManager();

        this.initGame();
    }

    public get wireManager() {
        return this._wireManager;
    }

    public get shopManager() {
        return this._shopManager;
    }

    public get inventoryManager() {
        return this._inventoryManager;
    }

    public addFuse(): void {
        this._fuses = Math.min(this._fuses + 1, this.MAX_FUSES);
    }
}
