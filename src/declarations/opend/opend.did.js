export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addToHolder' : IDL.Func([IDL.Principal, IDL.Principal], [], ['oneway']),
    'checkListed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'getArrayNFTs' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'getNFTListedPrice' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getOpenDCaniID' : IDL.Func([], [IDL.Principal], ['query']),
    'getRealOwner' : IDL.Func([IDL.Principal], [IDL.Principal], ['query']),
    'getSellingItem' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'newNFT' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Principal],
        [],
      ),
    'purchase' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Principal],
        [IDL.Text],
        [],
      ),
    'sellNFTItem' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
