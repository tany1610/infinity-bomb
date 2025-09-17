import type { GameManager } from "../../managers/GameManager";

interface GameEventConfig {
    _id: string;
    name: string;
    description: string;
    unlockRound: number;
    duration: number;
    gameManager: GameManager;
}

export abstract class GameEvent {
    public readonly _id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly unlockRound: number;
    public readonly duration: number;
    public readonly gameManager: GameManager;

    constructor({ _id, name, description, unlockRound, duration, gameManager }: GameEventConfig) {
        this.gameManager = gameManager;

        this._id = _id;
        this.name = name;
        this.description = description;
        this.unlockRound = unlockRound;
        this.duration = duration;
    }

    public isUnlocked(round: number): boolean {
        return round >= this.unlockRound;
    }

    public isActive(round: number): boolean {
        const isUnlocked = this.isUnlocked(round);

        if (isUnlocked && this.duration === Infinity) {
            return true;
        }
        const activeUntil = this.unlockRound + this.duration;
        return isUnlocked && round <= activeUntil;
    }

    public abstract apply(): void;
}
