import { ITokenConstants } from '../types';
import { OMDAO_STAKE_ABI } from '../abis';

export const COMMON_ST_OMD_DATA: Omit<ITokenConstants, 'address'> = {
  symbol: 'stOMD',
  abi: OMDAO_STAKE_ABI,
  decimal: '6',
  herf: 'https://omdao.vc',
  name: 'OM DAO (Staked)',
  title: 'OM DAO (Staked)',
};
