import { Wire } from "../models/Wire";
import { WIRE_COLORS } from "../utils/constants";

export class WireManager {
    private wiresConfig: Record<keyof typeof WIRE_COLORS, number>;
    private _currentWire!: Wire;

    private generateRandomChance(): number {
        // Random step chance between 10% and 90%
        const step = Math.floor(Math.random() * 9) + 1;
        return step / 10;
    }

    private generateRandomConfig(): Record<keyof typeof WIRE_COLORS, number> {
        return Object.keys(WIRE_COLORS).reduce(
            (acc, key) => {
                acc[key as keyof typeof WIRE_COLORS] = this.generateRandomChance();
                return acc;
            },
            {} as Record<keyof typeof WIRE_COLORS, number>
        );
    }

    private generateRandomWire(): void {
        const colors = Object.keys(WIRE_COLORS) as (keyof typeof WIRE_COLORS)[];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const colorHexValue = WIRE_COLORS[randomColor];
        const explodeChance = this.wiresConfig[randomColor];

        this._currentWire = new Wire(randomColor, colorHexValue, explodeChance);
    }

    constructor() {
        this.wiresConfig = this.generateRandomConfig();
        this.generateRandomWire();
    }

    public get currentWire() {
        return this._currentWire;
    }

    public getWireExplosionChance(color: keyof typeof WIRE_COLORS): number {
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
}
