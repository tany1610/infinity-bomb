import { GameManager } from "../../managers/GameManager";

export abstract class Item {
    private _id: string;
    private _title: string;
    private _price: number;
    private _effect: string;
    private _image: string;

    constructor(title: string, price: number, effect: string, image: string) {
        this._id = Phaser.Utils.String.UUID();
        this._title = title;
        this._price = price;
        this._effect = effect;
        this._image = image;
    }

    abstract apply(gameManager: GameManager): void;

    public get id() {
        return this._id;
    }

    public get name() {
        return this._title;
    }

    public get price() {
        return this._price;
    }

    public get effect() {
        return this._effect;
    }

    public get image() {
        return this._image;
    }
}
