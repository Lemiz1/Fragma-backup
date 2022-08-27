import React, { useEffect, useState } from "react";
import Item from "./Item";

function Gallery(props) {
  const nftIDs = props.IDs; 
  const [displayAsset, setDisplayAsset] = useState();
  

  function displayNFTs() {
    if (nftIDs != undefined) {
      console.log("Niceeee");
      setDisplayAsset(
        nftIDs.map((ids, index) => {return <Item key = {index} canisId={ids} page = {props.page}/>})
      )
    }
  };


  useEffect(() => {displayNFTs()}, [])




  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{props.pageTitle}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
            {displayAsset}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;