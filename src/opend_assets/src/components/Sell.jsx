import React from "react";






function SellButton(props) {


    return (
    <div className="Chip-root makeStyles-chipBlue-108 Chip-clickable">
        <span
          onClick={props.handleSumbit}
          className="form-Chip-label"
        >
          {props.status}
        </span>
    </div>
    )

}

export default SellButton;