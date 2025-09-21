import { Item } from "../Item";
import { CircuitPeekCorrupted } from "./CircuitPeekCorrupted";
import { DefuserDroneCorrupted } from "./DefuserDroneCorrupted";
import { FuseKitCorrupted } from "./FuseKitCorrupted";
import { SnipMasterCorrupted } from "./SnipMasterCorrupted";

export const CORRUPTED_ITEM_CLASSES: (new () => Item)[] = [
    CircuitPeekCorrupted,
    SnipMasterCorrupted,
    FuseKitCorrupted,
    DefuserDroneCorrupted,
];
