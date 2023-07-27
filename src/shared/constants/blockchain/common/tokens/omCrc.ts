import {ITokenConstants} from "../types";
import {USDT_ABI, WRAPPED_TOKEN_ABI} from "../abis";

export const COMMON_Crc_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omCrc",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://selectedpublic.notion.site/Crecy-da12da0f0086482299a5cdf141ffc1a7",
    name: "OM DAO Wrapped Crecy",
    title: "Crecy"
}