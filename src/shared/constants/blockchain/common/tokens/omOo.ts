import {ITokenConstants} from "../types";
import {USDT_ABI, WRAPPED_TOKEN_ABI} from "../abis";

export const COMMON_Oo_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omOo",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://youtu.be/NNS2NnZ67xs",
    name: "OM DAO Wrapped omOo",
    title: "Oo"
}