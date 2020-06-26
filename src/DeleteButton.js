import React, { useState } from "react";
import { ReactComponent as TrashIcon } from "./trash.svg";
import { ReactComponent as XIcon } from "./X.svg";
import { withStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

const styles = {
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: ".3rem",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderTopRightRadius: ".3rem",
    opacity: 0,
    transition: "opacity .3s ease",
  },
};

function DeleteButton(props) {
  const [open, setOpen] = useState(false);
  const { classes } = props;

  const openDialog = e => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeDialog = e => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleDeletePalette = e => {
    e.stopPropagation();
    props.deletePalette(props.id);
  };

  return (
    <i className={classes.root} onClick={openDialog}>
      <TrashIcon className={classes.trashIcon} />
      <Dialog open={open} aria-labelledby="delete-dialog-title">
        <DialogTitle>Delete Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDeletePalette}>
            <Avatar
              style={{
                backgroundColor: blue[100],
                color: blue[600],
                marginRight: "1rem",
              }}>
              <TrashIcon />
            </Avatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <Avatar
              style={{
                backgroundColor: red[100],
                color: red[600],
                marginRight: "1rem",
              }}>
              <XIcon />
            </Avatar>
            <ListItemText primary="Close" />
          </ListItem>
        </List>
      </Dialog>
    </i>
  );
}
export default withStyles(styles)(DeleteButton);
