import { SnipMaster } from "./SnipMaster";
import { CircuitPeek } from "./CircuitPeek";
import { FuseKit } from "./FuseKit";
import { Item } from "../Item";
import { DefuserDrone } from "./DefuserDrone";
import { GreedySnip } from "./GreedySnip";
import { Payday } from "./Payday";
import { WireSwap } from "./WireSwap";

export const ITEM_CLASSES: (new () => Item)[] = [
    SnipMaster,
    CircuitPeek,
    FuseKit,
    DefuserDrone,
    GreedySnip,
    Payday,
    WireSwap,
];
