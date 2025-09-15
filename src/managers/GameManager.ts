import type { Item } from "../models/items/Item";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import { InventoryManager } from "./InventoryManager";
import { ShopManager } from "./ShopManager";
import { WireManager } from "./WireManager";

export class GameManager {
    private _lives!: number;

    public _wireManager: WireManager;
    public _shopManager: ShopManager;
    public _inventoryManager: InventoryManager;

    private initGame(): void {
        this._lives = GAME_CONFIG.startinglives;
    }

    private gameOver(): void {
        const explodeChance = this._wireManager.currentWire.explodeChance;
        alert(`Game Over! Explode chance was: ${explodeChance * 100}%`);
    }

    private blowFuse(): void {
        if (this._lives - 1 < 0) {
            this.gameOver();
        } else {
            this._lives -= 1;
            EventBus.emit(EVENTS.GAME.LOST_LIFE);
        }
    }

    private nextRound(): void {
        const currentWireExplodeChance = this._wireManager.currentWire.explodeChance;
        this._shopManager.reward(currentWireExplodeChance);
        this._wireManager.nextWire();
        EventBus.emit(EVENTS.GAME.NEXT_ROUND);
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

    public get currentWire() {
        return this._wireManager.currentWire;
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

    // [WIP]: currently for testing purposes
    public cutWire(): void {
        const explodes = this._wireManager.cutWire();
        if (explodes) {
            this.blowFuse();
        } else {
            this.nextRound();
        }
    }

    public buyItem(itemId: string): void {
        if (this._inventoryManager.hasSpace) {
            const boughtItem = this._shopManager.buyItem(itemId);
            EventBus.emit(EVENTS.SHOP.ITEM_BOUGHT, boughtItem);
        }
    }
}
