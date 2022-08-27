import Debug "mo:base/Debug";
import Principal "mo:base/Principal";


// Every time we create an actor will assign a new canister id
actor class CaniBack (tag: Text, ownr: Principal, soundURL: Text, imageURL: Text ) = this {

    private let itemTitle = tag;
    private var ownerNFT = ownr;
    private var imgData = imageURL;
    private var soundData = soundURL;

    public query func getTitle() : async Text {
        return itemTitle;
    };

    public query func getOwnerNFT() : async Principal {
        return ownerNFT;
    };

    public query func getImgData() : async Text {
        return imgData;
    };

    public query func getSoundData() : async Text {
        return soundData;
    };

    public query func getCaniID() : async Principal {
        return Principal.fromActor(this);
    };

    public func shipNFT(to: Principal, currentPrincipal: Principal) : async Text {
        if (currentPrincipal == ownerNFT) {
            ownerNFT := to;
            return "Success"
        } else {
            return "Error: not initiated by NFT owner"
        }
    };

}