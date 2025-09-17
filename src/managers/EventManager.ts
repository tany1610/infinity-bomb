import { BlackMarket } from "../models/events/BlackMarket";
import type { GameEvent } from "../models/events/GameEvent";
import type { GameManager } from "./GameManager";

interface EventManagerConfig {
    gameManager: GameManager;
}

export class EventManager {
    private _events: GameEvent[];

    constructor({ gameManager }: EventManagerConfig) {
        this._events = [new BlackMarket({ gameManager })];
    }

    public checkEvents(round: number): void {
        for (const event of this._events) {
            const isEventPermanent = event.duration === Infinity;
            const isEventActive = event.isUnlocked(round) && event.isActive(round);
            const shouldApplyPermanentEvent = round === event.unlockRound;
            const shouldApplyEvent = isEventPermanent ? shouldApplyPermanentEvent : isEventActive;

            if (shouldApplyEvent) {
                event.apply();
            }
        }
    }
}
