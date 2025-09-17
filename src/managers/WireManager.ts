import { Wire } from "../models/Wire";
import { WIRES } from "../utils/constants";

export class WireManager {
    private wiresConfig: Record<keyof typeof WIRES, number>;
    private _currentWire!: Wire;

    private generateUniqueChances(): number[] {
        const colorsCount = Object.keys(WIRES).length;

        // Creates an array of chances (20%, 30%, 40%, etc. to 90%)
        const chances = Array.from({ length: colorsCount }, (_, i) => (i + 2) / 10);

        // Shuffle the chances
        for (let i = chances.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [chances[i], chances[j]] = [chances[j], chances[i]];
        }

        return chances;
    }

    private generateRandomConfig(): Record<keyof typeof WIRES, number> {
        const colors = Object.keys(WIRES) as (keyof typeof WIRES)[];
        const chances = this.generateUniqueChances();

        return colors.reduce(
            (acc, color, idx) => {
                acc[color] = chances[idx];
                return acc;
            },
            {} as Record<keyof typeof WIRES, number>
        );
    }

    private generateRandomWire(): void {
        const colors = Object.keys(WIRES) as (keyof typeof WIRES)[];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const explodeChance = this.wiresConfig[randomColor];

        this._currentWire = new Wire(randomColor, WIRES[randomColor], explodeChance);
    }

    constructor() {
        this.wiresConfig = this.generateRandomConfig();
        this.generateRandomWire();
    }

    public get currentWire() {
        return this._currentWire;
    }

    public getWireExplosionChance(color: keyof typeof WIRES): number {
        return this.wiresConfig[color];
    }

    public cutWire(): boolean {
        const explodes = this._currentWire.cut();
        return explodes;
    }

    public skipWire(): void {
        this.generateRandomWire();
    }

    public nextWire(): void {
        this.generateRandomWire();
    }

    public forceSafeCut(): void {
        this._currentWire.explodeChance = 0;
    }

    public exposeExplodeChance(): void {
        this._currentWire.exposeExplodeChance();
    }

    public halveExplodeChance(): void {
        this._currentWire.explodeChance /= 2;
    }
}
