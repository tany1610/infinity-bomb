import type { Item } from "../models/items/Item";
import type { Wire } from "../models/Wire";
import { EVENTS, GAME_CONFIG, UI_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import { InventoryManager } from "./InventoryManager";
import { ShopManager } from "./ShopManager";
import { WireManager } from "./WireManager";

export class GameManager {
    private _lives!: number;
    private _round!: number;

    public _wireManager: WireManager;
    public _shopManager: ShopManager;
    public _inventoryManager: InventoryManager;

    private initGame(): void {
        this._lives = GAME_CONFIG.startinglives;
        this._round = 1;
    }

    private gameOver(): void {
        localStorage.setItem("score", this._round.toString());
        EventBus.emit(EVENTS.GAME.GAME_OVER);
    }

    private blowFuse(): void {
        if (this._lives - 1 <= 0) {
            this.gameOver();
        } else {
            this._lives -= 1;
            EventBus.emit(EVENTS.GAME.LOST_LIFE);
        }
    }

    private applyRewards(): void {
        const currentWire = this._wireManager.currentWire;
        this._shopManager.reward(currentWire.explodeChance);
    }

    private nextRound(): void {
        this._wireManager.nextWire();
        this._round += 1;
        EventBus.emit(EVENTS.GAME.NEXT_ROUND);
    }

    constructor() {
        this._shopManager = new ShopManager();
        this._inventoryManager = new InventoryManager();
        this._wireManager = new WireManager();

        this.initGame();
    }

    public get lives(): number {
        return this._lives;
    }

    public get round(): number {
        return this._round;
    }

    public get currentWire(): Wire {
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

    public cutWire(): void {
        const explodes = this._wireManager.cutWire();
        if (explodes) {
            this.blowFuse();
        } else {
            this.applyRewards();
        }
        this.nextRound();
    }

    public buyItem(item: Item): void {
        if (this._inventoryManager.hasSpace && this._shopManager.hasEnoughCoins(item.price)) {
            const boughtItem = this._shopManager.buyItem(item.id);
            EventBus.emit(EVENTS.SHOP.ITEM_BOUGHT, boughtItem);
        }
    }

    public destroy(): void {
        EventBus.removeAllListeners();
    }
}
