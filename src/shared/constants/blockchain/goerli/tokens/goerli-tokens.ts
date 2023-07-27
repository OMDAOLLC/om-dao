import { TOKEN_SYMBOLS, ITokenConstants } from "../../common";
import {USDT} from "./usdt";
import {OMD} from "./omd";
import {stOMD} from "./st-omd";
import {omdwTigr} from "./omdwTigr";

export const GOERLI_TOKENS: Record<TOKEN_SYMBOLS, ITokenConstants> = {
    USDT,
    OMD,
    stOMD,
    omdwTigr,
    AG: USDT,
    omAra: USDT,
    omCRD: USDT,
    omCrc: USDT,
    omDB: USDT,
    omFP: USDT,
    omOo: USDT,
    omdwCRB: USDT,
    omdwChai: USDT,
    omdwCons: USDT,
    omdwCont: USDT,
    omdwDelC: USDT,
    omdwLed: USDT,
    omdwMS: USDT,
}