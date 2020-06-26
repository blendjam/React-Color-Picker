import React, { useState, useEffect } from "react";
import Button from "./Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ColorPicker from "./ChromePicker";
import { withStyles } from "@material-ui/styles";
import chroma from "chroma-js";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& h1": {
      margin: "1rem auto",
    },
  },

  buttons: {
    margin: "1rem auto",
  },

  lowerForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem auto",

    "& button": {
      margin: "1rem auto",
    },
  },
};

function DrawerForm(props) {
  const { classes } = props;
  const [newColor, setColor] = useState("#000000");
  const [colorName, setColorName] = useState("");
  let fontColor = chroma(newColor).luminance() >= 0.4 ? "black" : "white";

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

  const addRandomColor = () => {
    const allColors = props.paletteList.map(p => p.colors).flat();
    const rand = allColors[Math.floor(Math.random() * allColors.length)];
    setColor(rand.color.toLowerCase());
    setColorName(rand.name);
  };

  const addNewColor = () => {
    props.addColor(newColor, colorName);
    setColorName("");
    setColor("#ffffff");
  };

  const handleColorNameChange = e => {
    setColorName(e.target.value);
  };

  const isFull = () => {
    return props.colorList.length >= 20;
  };

  return (
    <div className={classes.root}>
      <h1>Design Your Palette</h1>
      <div className={classes.buttons}>
        <Button
          onClick={props.clearPalette}
          fontColor="crimson"
          color="crimson">
          Clear Palette
        </Button>
        <Button
          onClick={addRandomColor}
          disabled={isFull()}
          fontColor="royalblue"
          color="royalblue">
          Random Color
        </Button>
      </div>
      <ColorPicker onChange={setColor} />
      <ValidatorForm onSubmit={addNewColor} className={classes.lowerForm}>
        <TextValidator
          value={colorName}
          name="colorName"
          onChange={handleColorNameChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "This filed is required",
            "Enter Unique Name",
            "Use Unique Color",
          ]}
        />
        <Button
          bgColor={newColor}
          fontColor={fontColor}
          color="transparent"
          disabled={isFull()}
          type="submit">
          {isFull() ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(DrawerForm);
