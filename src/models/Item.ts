import { GameManager } from "../managers/GameManager";
import type { IHovarable } from "../utils/interfaces";

export abstract class Item implements IHovarable {
    private _id: string;
    private _key: number;
    private _name: string;
    private _price: number;
    private _description: string;
    private _image: string;
    private _isCorrupted: boolean;
    private _corruptionChance: number;

    constructor(
        name: string,
        key: number,
        price: number,
        description: string,
        image: string,
        isCorrupted: boolean = false,
        corruptionChance: number = 0
    ) {
        this._id = Phaser.Utils.String.UUID();
        this._key = key;
        this._name = name;
        this._price = price;
        this._description = description;
        this._image = image;
        this._isCorrupted = isCorrupted;
        this._corruptionChance = corruptionChance;
    }

    abstract apply(gameManager: GameManager): void;

    public get id() {
        return this._id;
    }

    public get key() {
        return this._key;
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

    public get isCorrupted() {
        return this._isCorrupted;
    }

    public get corruptionChance() {
        return this._corruptionChance;
    }
}
