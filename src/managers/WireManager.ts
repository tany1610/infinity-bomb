import { Wire } from "../models/Wire";
import { EVENTS, WIRES } from "../utils/constants";
import { EventBus } from "../utils/EventBus";
import type { WireConfig } from "../utils/interfaces";

export class WireManager {
    private wiresConfig: Record<keyof typeof WIRES, WireConfig>;
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

    private generateRandomConfig(): Record<keyof typeof WIRES, WireConfig> {
        const colors = Object.keys(WIRES) as (keyof typeof WIRES)[];
        const chances = this.generateUniqueChances();

        return colors.reduce(
            (acc, color, idx) => {
                acc[color] = {
                    explodeChance: chances[idx],
                    isExplodeChanceExposed: false,
                };
                return acc;
            },
            {} as Record<keyof typeof WIRES, WireConfig>
        );
    }

    private generateRandomWire(): void {
        const colors = Object.keys(WIRES) as (keyof typeof WIRES)[];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const wireConfig = this.wiresConfig[randomColor];

        this._currentWire = new Wire(randomColor, WIRES[randomColor], wireConfig);
    }

    constructor() {
        this.wiresConfig = this.generateRandomConfig();
        this.generateRandomWire();
    }

    public get currentWire() {
        return this._currentWire;
    }

    public getWireExplosionChance(color: keyof typeof WIRES): number {
        return this.wiresConfig[color].explodeChance;
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

    public exposeExplodeChance(glitched: boolean = false): void {
        const currentWireColor = this._currentWire.colorName as keyof typeof WIRES;
        this._currentWire.exposeExplodeChance(glitched);
        this.wiresConfig[currentWireColor].isExplodeChanceExposed = true;
    }

    public halveExplodeChance(): void {
        this._currentWire.explodeChance /= 2;
    }

    public swapWires(): void {
        const currentWireColor = this._currentWire.colorName as keyof typeof WIRES;
        const currentWireExplodeChance = this._currentWire.explodeChance;
        const saferWires = Object.entries(this.wiresConfig)
            .filter(([_, config]) => config.explodeChance < currentWireExplodeChance)
            .map(([color]) => color as keyof typeof WIRES);

        if (saferWires.length === 0) {
            return; // no safer wire
        }

        // get random safer wire index
        const randomIndex = Math.floor(Math.random() * saferWires.length);
        const saferWireColor = saferWires[randomIndex];

        // switch wires config
        const tempConfig = this.wiresConfig[currentWireColor];
        this.wiresConfig[currentWireColor] = this.wiresConfig[saferWireColor];
        this.wiresConfig[saferWireColor] = tempConfig;

        // create new current wire with the new config
        this._currentWire = new Wire(
            currentWireColor,
            WIRES[currentWireColor],
            this.wiresConfig[currentWireColor]
        );

        EventBus.emit(EVENTS.GAME.RESHUFFLED_WIRES);
    }
}
