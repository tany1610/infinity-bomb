import { Item } from "../Item";
import { CircuitPeekCorrupted } from "./CircuitPeekCorrupted";
import { DefuserDroneCorrupted } from "./DefuserDroneCorrupted";
import { FuseKitCorrupted } from "./FuseKitCorrupted";
import { GreedySnipCorrupted } from "./GreedySnipCorrupted";
import { PaydayCorrupted } from "./PaydayCorrupted";
import { SnipMasterCorrupted } from "./SnipMasterCorrupted";
import { WireSwapCorrupted } from "./WireSwapCorrupted";

export const CORRUPTED_ITEM_CLASSES: (new () => Item)[] = [
    CircuitPeekCorrupted,
    SnipMasterCorrupted,
    FuseKitCorrupted,
    DefuserDroneCorrupted,
    GreedySnipCorrupted,
    PaydayCorrupted,
    WireSwapCorrupted,
];
