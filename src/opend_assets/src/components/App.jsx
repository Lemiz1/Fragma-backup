import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import Item from "./Item";
import Minter from "./Minter";





function App(props) {

  const nnsCanisterId = 'ryjl3-tyaaa-aaaaa-aaaba-cai'

  // Whitelist
  const whitelist = [
    nnsCanisterId,
  ];
  // Host
  const host = "http://localhost:8080";


  async function connectWallet() {
    const connected = await window.ic.plug.isConnected();
    if (!connected) {
      await window.ic.plug.requestConnect({ whitelist , host });
      var current_user_id = Principal.fromText(window.ic.plug.principalId);
      window.localStorage.setItem("CURRENT_USER_ID", current_user_id);
    };
  };

  connectWallet();
  

   


    
 
  
  // useEffect(() => {changeDISPLAY()}, [])

  // function changeDISPLAY(item) {
  //   console.log("TEST FUNCTIoN");
  // }


  
  
  
  // const idCaniNFT = "rrkah-fqaaa-aaaaa-aaaaq-cai";
  
  // var result = connectWallet()
  

  return (
    <div className="App">
      <Header/>
      {/* <Minter/> */}
      {/* <Item canisId = {idCaniNFT} /> */}
      
      <Footer />
    </div>
  );
}

export default App;