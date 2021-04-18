import React from "react";
import "./Bulb.css";
const Bulb = (props) => {
  const bulbIsClicked = (bulb) => {
    props.isClicked(bulb);
  };
  return (
    <div>
      {props.bulb.isActive ? (
        <button
          className="circle"
          style={{ backgroundColor: props.bulb.color }}
        />
      ) : (
        <button className="circle" onClick={() => bulbIsClicked(props.bulb)} />
      )}
    </div>
  );
};

export default Bulb;
