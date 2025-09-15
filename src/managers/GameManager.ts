import { GameManagerBase } from "./GameManagerBase";

export class GameManager extends GameManagerBase {
    private _doubleBlow!: boolean;

    constructor() {
        super();
        this._doubleBlow = false;
    }

    public cutWire(): void {
        super.cutWire(this._doubleBlow);
    }

    public activateDoubleReward(): void {
        this._shopManager.activateDoubleReward();
    }

    public activateDoubleBlow(): void {
        this._doubleBlow = true;
        this._wireManager.halveExplodeChance();
    }

    public exposeExplodeChance(): void {
        this._wireManager.exposeExplodeChance();
    }

    public forceSafeCut(): void {
        this._wireManager.forceSafeCut();
    }
}
