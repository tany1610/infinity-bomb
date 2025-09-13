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

    public get wireManager() {
        return this._wireManager;
    }

    public get shopManager() {
        return this._shopManager;
    }

    public get inventoryManager() {
        return this._inventoryManager;
    }

    public get lives() {
        return this._lives;
    }

    public addFuse(): void {
        this._lives = Math.min(this._lives + 1, GAME_CONFIG.startinglives);
    }
}
