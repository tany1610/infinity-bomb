import { capitalize } from "../utils/helpers";
import type { IHovarable } from "../utils/interfaces";

export class Wire implements IHovarable {
    private _colorName: string;
    private _colorValue: number;
    private _explodeChance: number;
    private _explodeChanceExposed: boolean;
    private _doubleReward: boolean;

    constructor(colorName: string, colorValue: number, explodeChance: number) {
        this._colorName = colorName;
        this._colorValue = colorValue;
        this._explodeChance = explodeChance;
        this._explodeChanceExposed = false;
        this._doubleReward = false;
    }

    public get color(): number {
        return this._colorValue;
    }

    public get explodeChance(): number {
        return this._explodeChance;
    }

    public set explodeChance(value: number) {
        this._explodeChance = value;
    }

    public get name(): string {
        return `${capitalize(this._colorName)} Wire`;
    }

    public get description(): string {
        return `Explode chance: ${this.getExplodeChance()}`;
    }

    public get doubleReward(): boolean {
        return this._doubleReward;
    }

    public getExplodeChance(): string {
        if (this._explodeChanceExposed) {
            return `${this._explodeChance * 100}%`;
        }

        return "???";
    }

    public cut(): boolean {
        return Math.random() < this._explodeChance;
    }

    public exposeExplodeChance(): void {
        this._explodeChanceExposed = true;
    }

    public applyDoubleReward(): void {
        this._doubleReward = true;
    }
}
