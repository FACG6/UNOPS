import React from "react";

function Buttons(props) {
  if (props.value === 'search') {
    return <input className="button" type="submit" value="Search" />;
  }
}
export default Buttons;
