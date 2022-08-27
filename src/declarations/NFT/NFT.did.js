export const idlFactory = ({ IDL }) => {
  const CaniBack = IDL.Service({
    'getCaniID' : IDL.Func([], [IDL.Principal], ['query']),
    'getImgData' : IDL.Func([], [IDL.Text], ['query']),
    'getOwnerNFT' : IDL.Func([], [IDL.Principal], ['query']),
    'getSoundData' : IDL.Func([], [IDL.Text], ['query']),
    'getTitle' : IDL.Func([], [IDL.Text], ['query']),
    'shipNFT' : IDL.Func([IDL.Principal, IDL.Principal], [IDL.Text], []),
  });
  return CaniBack;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Principal, IDL.Text, IDL.Text];
};
