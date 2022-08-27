import React, { useState } from "react";
import { useForm } from "react-hook-form";
import  { opend } from "../../../declarations/opend";
import { Principal } from "@dfinity/principal";
import Item from "./Item";
// import { Web3Storage } from 'web3.storage';
import fleekStorage from '@fleekhq/fleek-storage-js'
// import CURRENT_USER_ID from "../index";



// This is the main part 

function Minter() {
  const CURRENT_USER_ID = Principal.fromText(window.localStorage.getItem("CURRENT_USER_ID"));



  // --- STORE - UPLOAD TO WEB3 STORAGE --- 
  // function getAccessToken () {
  //   // If you're just testing, you can paste in a token
  //   // and uncomment the following line:
  //   return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY1ZmQzOUJmOTkwNTI2OTk0MjExREQ5QjQyQkZBQjY5MDUxYWJlNTMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEzODc2NjY5MDEsIm5hbWUiOiJmcmFnbWEifQ.7jPB9D9XJwEWC-h0S27jWUe3DK4VsxMTlq_x1RArOMA'

  //   // In a real app, it's better to read an access token from an
  //   // environement variable or other configuration that's kept outside of
  //   // your code base. For this to work, you need to set the
  //   // WEB3STORAGE_TOKEN environment variable before you run your code.
  //   return process.env.WEB3STORAGE_TOKEN
  // }

  // function makeStorageClient () {
  //   return new Web3Storage({ token: getAccessToken() })
  // };

  // async function storeFiles (files) {
  //   const client = makeStorageClient()
  //   const cid = await client.put(files)
  //   console.log('stored files with cid:', cid)
  //   return cid
  // };
  
  // async function retrieveFiles (cid) {

  //   const client = makeStorageClient()
  //   const res = await client.get(cid)
  //   console.log(`Got a response! [${res.status}] ${res.statusText}`)
  //   if (!res.ok) {
  //     throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
  //   }

  //   const files = await res.files()
  //   for (const file of files) {
  //     console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
  //   }
  // }
  // --- STORE x UPLOAD TO WEB3 STORAGE --- 
  


  const {register, handleSubmit} = useForm();
  const [caniID, setCaniID] = useState("");
  const [appear, setAppear] = useState(true);


  
  
  
  async function onSubmit(data){
    console.log("Clicked!");

    setAppear(false)

    const soundTitle = data.nameNFT;
    const soundData = data.audioNFT[0];
    const soundUploadName = soundData.name;

    const imgData = data.imgNFT[0];
    const imgName = imgData.name;
    
    console.log("Got the file name" + "img: " + imgName + " sound: "+ soundUploadName);


    
    async function uploadedFile(data, name){
      const url = await fleekStorage.upload({
        apiKey: '3VzyOvDOd0iOGtYwQPtygg==',
        apiSecret: '8Ar3TQ6T8l/41rJ4RDAFKIXJDzbnZQ2clGHPRsWNRos=',
        key: name,
        ContentType: 'image/png',
        data: data,
      });

      return(url.publicUrl);
    };

    
    
    // console.log("Upload timeeee");
    const urlSound = await uploadedFile(soundData, soundUploadName);
    const urlImage = await uploadedFile(imgData, imgName);

    console.log(urlSound.toString());
    console.log(urlImage.toString());


    const NFTCaniId = await opend.newNFT(CURRENT_USER_ID,urlSound, soundTitle, urlImage);



    // setCaniID(NFTCaniId);
    
    setAppear(true);


  };



  



  if (caniID == "") {
    return (
      <div className="minter-container">
        <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
          Create NFT
        </h3>
        <div hidden = {appear} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Upload Image
        </h6>
        <form className="makeStyles-form-109" noValidate="" autoComplete="off">
          <div className="upload-container">
            <input 
            {...register("audioNFT", {required: true})}
              className="upload"
              type="file"
              accept="audio/mp3,audio/*;capture=microphone" 
            />

          <input 
            {...register("imgNFT", {required: true})}
              className="upload"
              type="file"
              accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp" 
            />
          </div>
  
          <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
            NFT Name
          </h6>
          <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
            <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
              <input
               {...register("nameNFT", {required: true})}
                placeholder="e.g. CryptoDunks"
                type="text"
                className="form-InputBase-input form-OutlinedInput-input"
              />
            
              <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
              
            </div>
  
          </div>
          <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
            <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">Mint NFT</span>
          </div>
        </form>
      </div>
    );
  } else {
    return (
    <div className="minter-container">
      <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Minted!
      </h3>
      <div className="horizontal-center">
        {/* <Item canisId = {caniID}/> */}
      </div>
    </div>
    )
  }


}

export default Minter;