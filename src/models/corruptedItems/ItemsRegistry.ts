import { Item } from "../Item";
import { CircuitPeekCorrupted } from "./CircuitPeekCorrupted";

export const CORRUPTED_ITEM_CLASSES: (new () => Item)[] = [CircuitPeekCorrupted];
