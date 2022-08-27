import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/NFT";
import { Principal } from "@dfinity/principal";
import SellButton from "./Sell";
import {opend} from "../../../declarations/opend"
// import CURRENT_USER_ID from "../index";
import PriceTag from "./PriceTag";



function Item(props) {
  
  const CURRENT_USER_ID = Principal.fromText(window.localStorage.getItem("CURRENT_USER_ID"));

  const [nftName, setNFTName] = useState();
  const [address, setAddress] = useState();
  const [img, setImg] = useState();
  
  const [sellButton, setSellButton] = useState();
  const [priceTyping, setPriceType] = useState();
  const [hiddenLoader, setHiddenLoader] = useState(true);
  const [fade, setFade] = useState();
  const [listStatus, setListStatus] = useState();

  const [sellPrice, setSellPrice] = useState();


  
  
  const canisIdControl = (props.canisId);
  const loca = "http://localhost:8080/";
  const agentLoca = new HttpAgent({local: loca});
  
  // Deploy live -> remove following 
  agentLoca.fetchRootKey();
  
  let NFTCaniController


  async function runNFTCani() {
    console.log("Nicely added");
    NFTCaniController = await Actor.createActor(
      idlFactory, {
        agent: agentLoca,
        canisterId: canisIdControl,
      }
    );
  
    

    // GET DATA FROM USER INPUT
    const name = await NFTCaniController.getTitle();
    const addressInput = await NFTCaniController.getOwnerNFT();
    const audioLink = await NFTCaniController.getSoundData();
    const imgData = await NFTCaniController.getImgData();

    // const imgData = new Uint8Array(rawImgData);
    // const img = URL.createObjectURL(new Blob([imgData], {type: "image/png"}))
    
    // AVAILABLE TO CHANGE
    setNFTName(name);
    setAddress(addressInput.toText());
    setImg(imgData);
    
    // Missing the play button for testing 
    // setSellButton(<SellButton status = "Play" handleSumbit={() => playAudio(audioLink)}/>);

    
    

    

    // SETTING DISPLAY FOR MARKET AND MY NFTs
    if (props.page == "collection") {
      const checkItemSold = await opend.checkListed(props.canisId);

      if (checkItemSold) {
        setAddress("OpenD");
        setFade({filter: "blur(4px)"});
        setListStatus(" Listed");
      } else {
      setSellButton(<SellButton status = "Sell" handleSumbit={handleSumbit}/>);
      }

    } else if (props.page == "market") {
      const originOwner = await opend.getRealOwner(props.canisId);
      if ( originOwner  != CURRENT_USER_ID.toText()  )  {
        setSellButton(<SellButton status = "Buy" handleSumbit={handleBuy}/>);
      }    
      const priceNFT = await opend.getNFTListedPrice(props.canisId);
      console.log(priceNFT);
      setSellPrice(<PriceTag price = {priceNFT.toString()}/>);
      
    }



      // PLAY AUDIO
      async function playAudio(audioInput) {
        
        console.log("Play the musicccc");
        var audio = new Audio(audioInput);  
        audio.type = 'audio/mp3';
      
        try {
          await audio.play();
          console.log('Playing...');
        } catch (err) {
          console.log('Failed to play...' + err);
        }
      }
  
    
  
    // BUY FROM MARKET
    async function handleBuy(){
      console.log("Hurray you bought somethings");
    }
    
  
    // TYPE YOUR PRICE
    let priceInput;
    function handleSumbit() {
      console.log("Sell Button got clicked!");
      setPriceType(<input
        placeholder="Price in DANG"
        type="number"
        className="price-input"
        value={priceInput}
        onChange={(e) => priceInput = e.target.value}
      />)
      setSellButton(<SellButton status = "Confirmed" handleSumbit={clickSell}/>);
    };
  
  
    // SELLING FROM MY NFTs
    async function clickSell() {
      setFade({filter: "blur(4px)"})
      setHiddenLoader(false);
      console.log("Price " + priceInput);
      const newItemResult = await opend.sellNFTItem(canisIdControl, CURRENT_USER_ID, Number(priceInput));
      console.log("newItem " + newItemResult);
  
      if (newItemResult == "Success") {
        const openDId = await opend.getOpenDCaniID();
        const shipNFTResult = await NFTCaniController.shipNFT(openDId, CURRENT_USER_ID);
        console.log("Shipping "+ shipNFTResult);
        if (shipNFTResult == "Success") {
          setPriceType();
          setSellButton();
          setHiddenLoader(true);
          setAddress("OpenD");
          setListStatus(" Listed");
        }
      }
    }

    }

    useEffect(() => {
      runNFTCani()
    }, [])

  


    
    


  return (
    <div className="disGrid-item">
      
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={img}
          style = {fade}
        />
       
        <div hidden = {hiddenLoader} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>


       
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {nftName} <span className="purple-text">{listStatus}</span>
          </h2>
          
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {address}
          </p>
          {sellPrice}
          
          {priceTyping}
          {sellButton}
        </div>
      </div>
    </div>
  );

  
  
}

export default Item;