import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
const styles = {
  root: {
    "& *": {
      fontFamily: "inherit",
      fontWeight: "400",
    },
  },
};

function NavMetaForm(props) {
  const [stage, setStage] = React.useState("closed");
  const { classes } = props;
  const [paletteName, setPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      props.paletteList.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const handleClickOpen = () => {
    setStage("name");
  };

  const handleClose = () => {
    setStage("closed");
  };

  const handlePaletteNameChange = e => {
    setPaletteName(e.target.value);
  };

  const handleSaveName = () => {
    setStage("emoji");
  };

  const handleSubmitPalette = e => {
    const emoji = e.native;
    props.handleSavePalette(paletteName, emoji);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog open={stage === "emoji"} onClose={handleClose}>
        <Picker onSelect={handleSubmitPalette} />
      </Dialog>
      <Dialog
        open={stage === "name"}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <ValidatorForm onSubmit={handleSaveName}>
          <DialogTitle id="form-dialog-title">Palette Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your beautiful Palette. Make sure it's
              unique
            </DialogContentText>
            <TextValidator
              value={paletteName}
              name="paletteName"
              onChange={handlePaletteNameChange}
              fullWidth
              margin="normal"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["This filed is required", "Enter Unique Name"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(NavMetaForm);
