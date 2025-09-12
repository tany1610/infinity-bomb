import { GameManager } from "../../managers/GameManager";

export abstract class Item {
    private _title: string;
    private _price: number;
    private _effect: string;

    constructor(title: string, price: number, effect: string) {
        this._title = title;
        this._price = price;
        this._effect = effect;
    }

    abstract apply(gameManager: GameManager): void;

    public get name() {
        return this._title;
    }

    public get price() {
        return this._price;
    }

    public get effect() {
        return this._effect;
    }
}
