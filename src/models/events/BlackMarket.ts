import type { GameManager } from "../../managers/GameManager";
import { EVENT_MAMAGER_CONFIG, EVENT_MANAGER_EVENTS_KEYS, EVENTS } from "../../utils/constants";
import { EventBus } from "../../utils/EventBus";
import { GameEvent } from "./GameEvent";

interface BlackMarketShopConfig {
    gameManager: GameManager;
}

export class BlackMarket extends GameEvent {
    constructor({ gameManager }: BlackMarketShopConfig) {
        const config = EVENT_MAMAGER_CONFIG.EVENTS[EVENT_MANAGER_EVENTS_KEYS.BLACK_MARKET];
        super({ ...config, gameManager: gameManager });
    }
    public apply(): void {
        EventBus.emit(EVENTS.UNLOCKABLE_EVENTS.BLACK_MARKET_UNLOCKED);
    }
}
