import { Item } from "../Item";
import { CircuitPeekCorrupted } from "./CircuitPeekCorrupted";
import { SnipMasterCorrupted } from "./SnipMasterCorrupted";

export const CORRUPTED_ITEM_CLASSES: (new () => Item)[] = [
    CircuitPeekCorrupted,
    SnipMasterCorrupted,
];
