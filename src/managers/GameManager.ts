import type { Item } from "../models/Item";
import { EVENTS } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import { EventManager } from "./EventManager";
import { GameManagerBase } from "./GameManagerBase";

export class GameManager extends GameManagerBase {
    private _doubleBlow!: boolean;
    private _eventManager: EventManager;

    constructor() {
        super();
        this._eventManager = new EventManager({ gameManager: this });
        this._doubleBlow = false;
    }

    public cutWire(): void {
        super.cutWire(this._doubleBlow);
    }

    public nextRound(): void {
        this._doubleBlow = false;
        this._shopManager.generateRandomBlackMarketItem();
        super.nextRound();
        this._eventManager.checkEvents(this.round);
    }

    public buyItem(item: Item): void {
        if (this._inventoryManager.hasSpace && this._shopManager.hasEnoughCoins(item.price)) {
            const boughtItem = this._shopManager.buyItem(item.id);
            EventBus.emit(EVENTS.SHOP.ITEM_BOUGHT, boughtItem);
        }
    }

    public activateDoubleReward(): void {
        this._shopManager.activateDoubleReward();
    }

    public activateTrippleReward(): void {
        this._shopManager.activateTrippleReward();
    }

    public activateDoubleBlow(): void {
        this._doubleBlow = true;
    }

    public exposeExplodeChance(glitched: boolean = false): void {
        this._wireManager.exposeExplodeChance(glitched);
    }

    public forceSafeCut(): void {
        this._wireManager.forceSafeCut();
    }

    public halveExplodeChance(): void {
        this._wireManager.halveExplodeChance();
    }

    public getCoins(): number {
        return this._shopManager.coins;
    }

    public addCoins(coins: number) {
        this._shopManager.addCoins(coins);
    }
}
