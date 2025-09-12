import { SnipMaster } from "./SnipMaster";
import { CircuitPeek } from "./CircuitPeek";
import { FuseKit } from "./FuseKit";
import { Item } from "./Item";

export const ITEM_CLASSES: (new () => Item)[] = [SnipMaster, CircuitPeek, FuseKit];
