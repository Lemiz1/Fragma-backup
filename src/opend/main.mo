import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import NFT "../NFT_BACKEND/nftCreate";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";


actor OpenD {

    private type NFTData = {
        iOwnr: Principal;
        iPrice: Nat;
    };


    stable var individualEntries : [(Principal, NFT.CaniBack)] = [];
    stable var holderEntries : [(Principal, List.List<Principal>)] = [];
    stable var sellEntries : [(Principal, NFTData)] = [];

    

    let individualNFTData = HashMap.HashMap<Principal, NFT.CaniBack>(1, Principal.equal, Principal.hash);
    var holdNFTs = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    var sellNFT = HashMap.HashMap<Principal, NFTData>(1, Principal.equal, Principal.hash);
    
    




    // Connect wallet and get the principal of wallet -> Principal.fromText()
    public func newNFT(ownerNFTs: Principal, audioURL: Text, title: Text, imageURL: Text): async Principal {
        // FRONT END - ANNOYMOUS
        let owner : Principal = ownerNFTs;
        let mintNFT = await NFT.CaniBack(title, owner, audioURL, imageURL);
        let newNFTID = await mintNFT.getCaniID();
        
        Cycles.add(500_000_000);

        individualNFTData.put(newNFTID, mintNFT);
        addToHolder(owner, newNFTID);

        return newNFTID;
    };


    public func addToHolder(owner: Principal, assetID: Principal) {
        var getAsset : List.List<Principal> = switch(holdNFTs.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        getAsset := List.push(assetID, getAsset);
        holdNFTs.put(owner, getAsset);
    };

    
    public query func getArrayNFTs(ownerID : Principal) : async [Principal] {
        let getAsset : List.List<Principal> = switch (holdNFTs.get(ownerID)) {
            case null List.nil<Principal>();
            case (?result) result;
        };
        return (List.toArray(getAsset));
    };



    // Need to update the msg.caller 
    public func sellNFTItem(id: Principal, currentOwner: Principal, priceTag: Nat,) : async Text{

        var returnItem : NFT.CaniBack = switch(individualNFTData.get(id)) {
            case null return "NFT don't available";
            case (?result) result;
        };

        let realOwner = await returnItem.getOwnerNFT();
        if (Principal.equal(realOwner, currentOwner)) {

            let newNFTData :NFTData = {
                iOwnr = currentOwner;
                iPrice = priceTag;
            };

            sellNFT.put(id, newNFTData);
            return "Success";

        } else {
            return "WRONG PEOPLE!"
        }
    };

    public query func getOpenDCaniID() : async Principal {
        return Principal.fromActor(OpenD)
    };


    public query func getSellingItem() : async [Principal] {
        return Iter.toArray(sellNFT.keys());
    };


    public query func checkListed(idItem: Principal) : async Bool {
        if (sellNFT.get(idItem) == null) {
            return false;
        } else {
            return true;
        }
    };

    public query func getRealOwner(mainID: Principal) : async Principal {
        var ownPrin : NFTData = switch(sellNFT.get(mainID)) {
            case null return Principal.fromText("");
            case (?result) result;
        };

        return ownPrin.iOwnr;
    }; 



    public query func getNFTListedPrice(caniID_NFT: Principal) : async Nat {
        var listed : NFTData = switch(sellNFT.get(caniID_NFT)) {
            case null return 0;
            case (?result) result;
        };

        return listed.iPrice;
    };





    // HAVEN'T CHECK THE ACCOUNT BALANCE FOR PURCHASE
    public func purchase(assetID: Principal, ownerId: Principal, newOwnerId: Principal): async Text{

        var boughtNFT : NFT.CaniBack = switch(individualNFTData.get(assetID)) {
            case null return "NFT doesn't exist";
            case (?result) result;
        };

        let transferOutcome = await boughtNFT.shipNFT(newOwnerId, ownerId);

        if (transferOutcome == "Success") {
            sellNFT.delete(assetID);

            var ownedNFTs : List.List<Principal> = switch(holdNFTs.get(ownerId)) {
                case null List.nil<Principal>();
                case (?result) result;
            };

            ownedNFTs := List.filter(ownedNFTs, func (assetIDListing: Principal) : Bool {
                return assetIDListing != assetID;
            });

            addToHolder(newOwnerId, assetID);
            return "Success";

        } else return "Purchasing ERROR";
    
    }






    // Pre UPGRADE + POST UPGRADE 


};
