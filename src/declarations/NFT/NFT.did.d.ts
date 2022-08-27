import type { Principal } from '@dfinity/principal';
export interface CaniBack {
  'getCaniID' : () => Promise<Principal>,
  'getImgData' : () => Promise<string>,
  'getOwnerNFT' : () => Promise<Principal>,
  'getSoundData' : () => Promise<string>,
  'getTitle' : () => Promise<string>,
  'shipNFT' : (arg_0: Principal, arg_1: Principal) => Promise<string>,
}
export interface _SERVICE extends CaniBack {}
