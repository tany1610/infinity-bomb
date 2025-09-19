import { capitalize } from "../utils/helpers";
import type { IHovarable, WireConfig } from "../utils/interfaces";

export class Wire implements IHovarable {
    private _colorName: string;
    private _explodeChance: number;
    private _explodeChanceExposed: boolean;
    private _texture: string;

    constructor(colorName: string, texture: string, wireConfig: WireConfig) {
        this._colorName = colorName;
        this._explodeChance = wireConfig.explodeChance;
        this._explodeChanceExposed = wireConfig.isExplodeChanceExposed;
        this._texture = texture;
    }

    public get explodeChance(): number {
        return this._explodeChance;
    }

    public set explodeChance(value: number) {
        this._explodeChance = value;
    }

    public get colorName(): string {
        return this._colorName;
    }

    public get texture() {
        return this._texture;
    }

    public get name(): string {
        return `${capitalize(this._colorName)} Wire`;
    }

    public get description(): string {
        return `Explode chance: ${this.getExplodeChance()}`;
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
}
