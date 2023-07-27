import { TOKEN_SYMBOLS, ITokenConstants } from "../../common";
import {USDT} from "./usdt";
import {OMD} from "./omd";
import {stOMD} from "./stOmd";
import {omdwTigr} from "./omdwTigr";
import {AG} from "./AG";
import {omAra} from "./omAra";
import {omCRD} from "./omCRD";
import {omCrc} from "./omCrc";
import {omDB} from "./omDB";
import {omFP} from "./omFP";
import {omOo} from "./omOo";
import {omdwCRB} from "./omdwCRB";
import {omdwChai} from "./omdwChai";
import {omdwCons} from "./omdwCons";
import {omdwCont} from "./omdwCont";
import {omdwDelC} from "./omdwDelC";
import {omdwLed} from "./omdwLed";
import {omdwMS} from "./omdwMS";

export const ETHEREUM_TOKENS: Record<TOKEN_SYMBOLS, ITokenConstants> = {
    USDT,
    OMD,
    stOMD,
    omdwTigr,
    AG,
    omAra,
    omCRD,
    omCrc,
    omDB,
    omFP,
    omOo,
    omdwCRB,
    omdwChai,
    omdwCons,
    omdwCont,
    omdwDelC,
    omdwLed,
    omdwMS,
}