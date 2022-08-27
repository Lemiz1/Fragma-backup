import React from "react";

function PriceTag(props) {
    return(
        <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
          <span className="disChip-label">{props.price}</span>
        </div>
    );
}

export default PriceTag;