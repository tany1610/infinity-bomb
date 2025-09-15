import { GameManager } from "../../managers/GameManager";
import type { IHovarable } from "../../utils/interfaces";

export abstract class Item implements IHovarable {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;
    private _image: string;

    constructor(name: string, price: number, description: string, image: string) {
        this._id = Phaser.Utils.String.UUID();
        this._name = name;
        this._price = price;
        this._description = description;
        this._image = image;
    }

    abstract apply(gameManager: GameManager): void;

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get price() {
        return this._price;
    }

    public get description() {
        return this._description;
    }

    public get image() {
        return this._image;
    }
}
