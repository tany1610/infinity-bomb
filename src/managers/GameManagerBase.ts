import type { Item } from "../models/items/Item";
import type { Wire } from "../models/Wire";
import { EVENTS, GAME_CONFIG } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import { InventoryManager } from "./InventoryManager";
import { ShopManager } from "./ShopManager";
import { WireManager } from "./WireManager";

export class GameManagerBase {
    private _lives!: number;
    private _round!: number;
    private _skips!: number;
    private _isGameOver: boolean = false;

    public _wireManager: WireManager;
    public _shopManager: ShopManager;
    public _inventoryManager: InventoryManager;

    private initGame(): void {
        this._lives = GAME_CONFIG.startinglives;
        this._round = 1;
        this._skips = GAME_CONFIG.startingSkips;
    }

    private gameOver(): void {
        localStorage.setItem("score", this._round.toString());
        this._isGameOver = true;
        EventBus.emit(EVENTS.GAME.GAME_OVER);
    }

    private applyRewards(): void {
        const currentWire = this._wireManager.currentWire;
        this._shopManager.reward(currentWire);
    }

    private nextRound(): void {
        this._round += 1;
        this.nextWire();
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

    public get skips(): number {
        return this._skips;
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

    public get isGameOver(): boolean {
        return this._isGameOver;
    }

    public addFuse(): void {
        this._lives = Math.min(this._lives + 1, GAME_CONFIG.startinglives);
    }

    public nextWire() {
        this._wireManager.nextWire();
        EventBus.emit(EVENTS.GAME.NEXT_ROUND);
    }

    public applySkip(): void {
        if (this._skips - 1 >= 0) {
            this._skips -= 1;
            this.nextRound();
            EventBus.emit(EVENTS.GAME.SKIP);
        }
    }

    public blowFuse(doubleBlow: boolean): void {
        const liveCost = doubleBlow ? 2 : 1;

        if (this._lives - liveCost <= 0) {
            this.gameOver();
        } else {
            this._lives -= liveCost;
            EventBus.emit(EVENTS.GAME.LOST_LIFE);
        }
    }

    public cutWire(doubleBlow: boolean): boolean {
        const explodes = this._wireManager.cutWire();
        if (explodes) {
            this.blowFuse(doubleBlow);
        } else {
            this.applyRewards();
        }
        this.nextRound();
        return explodes;
    }

    public destroy(): void {
        EventBus.removeAllListeners();
    }
}
