import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as ArrowIcon } from "./arrow.svg";
import Button from "./Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ColorPicker from "./ChromePicker";

const drawerWidth = "400px";

const styles = {
  root: {
    "& main": {
      position: "absolute",
      top: "5vh",
      height: "95vh",
      width: "100%",
      left: 0,
      transition: "left 300ms ease, width 300ms ease",
    },
  },

  navBar: {
    background: "#E5E5E5",
    width: "100vw",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    padding: "0 1rem",
  },

  MenuIcon: {
    color: "crimson",
    cursor: "pointer",
  },

  drawer: {
    position: "absolute",
    width: drawerWidth,
    height: "100vh",
    background: "#E5E5E5",
    transition: "width 300ms ease",

    "&.drawer-enter": {
      transform: "translateX(-110%)",
    },
    "&.drawer-enter-active": {
      transform: "translateX(0)",
      transition: "transform 300ms ease",
    },
    "&.drawer-exit": {
      transform: "translateX(0)",
    },
    "&.drawer-exit-active": {
      transform: "translateX(-110%)",
      transition: "transform 300ms ease",
    },
  },

  drawerTop: {
    width: "100%",
    height: "10vh",
    padding: ".5rem",
    display: "flex",
    borderBottom: "2px solid #0000001a",
    justifyContent: "flex-end",
  },

  ArrowIcon: {
    color: "crimson",
    cursor: "pointer",
    transform: "rotate(90deg)",
  },
};

function SideBarwNavBar(props) {
  const [open, setOpen] = useState(true);
  const [newColor, setColor] = useState("#fff");
  const [name, setName] = useState("");
  const { classes, addColor } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      props.colorList.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      props.colorList.every(({ color }) => color !== newColor)
    );
  });
  const handleClick = e => {
    setOpen(!open);
  };

  const addNewColor = () => {
    addColor(newColor, name);
    setName("");
    setColor(null);
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  const shiftMain = open
    ? { left: drawerWidth, width: `calc(100% - ${drawerWidth})` }
    : {};

  return (
    <div className={classes.root}>
      <CSSTransition
        in={open}
        timeout={300}
        unmountOnExit
        classNames={"drawer"}>
        <div className={classes.drawer}>
          <div className={classes.drawerTop}>
            <ArrowIcon onClick={handleClick} className={classes.ArrowIcon} />
          </div>
          <h1>Design Your Palette</h1>
          <div className={classes.buttons}>
            <Button>Cler Palette</Button>
            <Button>Random Color</Button>
          </div>
          <ColorPicker onChange={setColor} />
          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator
              value={name}
              onChange={handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "This filed is required",
                "Enter Unique Name",
                "Use Unique Color",
              ]}
            />
            <Button color={newColor} type="submit">
              Add Color
            </Button>
          </ValidatorForm>
        </div>
      </CSSTransition>
      <div className={classes.navBar}>
        {!open && (
          <MenuIcon className={classes.MenuIcon} onClick={handleClick} />
        )}
      </div>
      <main style={shiftMain}>{props.children}</main>
    </div>
  );
}
export default withStyles(styles)(SideBarwNavBar);
