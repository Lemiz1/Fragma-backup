import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'addToHolder' : (arg_0: Principal, arg_1: Principal) => Promise<undefined>,
  'checkListed' : (arg_0: Principal) => Promise<boolean>,
  'getArrayNFTs' : (arg_0: Principal) => Promise<Array<Principal>>,
  'getNFTListedPrice' : (arg_0: Principal) => Promise<bigint>,
  'getOpenDCaniID' : () => Promise<Principal>,
  'getRealOwner' : (arg_0: Principal) => Promise<Principal>,
  'getSellingItem' : () => Promise<Array<Principal>>,
  'newNFT' : (
      arg_0: Principal,
      arg_1: string,
      arg_2: string,
      arg_3: string,
    ) => Promise<Principal>,
  'purchase' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: Principal,
    ) => Promise<string>,
  'sellNFTItem' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: bigint,
    ) => Promise<string>,
}
