import React, { useState } from "react";
import { ReactComponent as Arrow } from "./arrow.svg";
import { CSSTransition } from "react-transition-group";
import "./DropDown.css";

function DropDown(props) {
  const [open, setOpen] = useState(false);
  const [dropValue, setDropValue] = useState("Color Format");

  function DropdownItem(props) {
    return (
      <span className="menu-item">
        <span className="icon-left">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </span>
    );
  }

  const handleClick = e => {
    const format = e.target.innerText;
    setDropValue(format);
    props.changeColorFormat(format.toLowerCase());
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const menuBar = (
    <div className="menu" onClick={handleClick}>
      <DropdownItem>Rgb</DropdownItem>
      <DropdownItem>Rgba</DropdownItem>
      <DropdownItem>Hex</DropdownItem>
    </div>
  );

  return (
    <div className="DropDown">
      <div className="DropDown-nav" onClick={handleOpen}>
        <span>{dropValue}</span>
        <button className={`arrow ${open && "rotate"}`} >
          <Arrow />
        </button>
      </div>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="menu"
        unmountOnExit={true}>
        <div className="DropDown-menu">{menuBar}</div>
      </CSSTransition>
    </div>
  );
}

export default DropDown;
