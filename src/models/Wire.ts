import type { WIRE_COLORS } from "../utils/constants";

export class Wire {
    private _color: keyof typeof WIRE_COLORS;
    private _explodeChance: number;
    private _explodeChanceExposed: boolean;

    constructor(color: keyof typeof WIRE_COLORS, explodeChance: number) {
        this._color = color;
        this._explodeChance = explodeChance;
        this._explodeChanceExposed = false;
    }

    public get color() {
        return this._color;
    }

    public set explodeChance(value: number) {
        this._explodeChance = value;
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
