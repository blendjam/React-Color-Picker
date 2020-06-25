import React from "react";
import chroma from "chroma-js";
import { ReactComponent as Trash } from "./trash.svg";
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    backgroundColor: props => props.color,
    padding: ".5rem",
    cursor: "move",
    "& span": {
      fontWeight: "400",
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    "&:hover div": {
      opacity: 1,
    },
  },

  trashContainer: {
    width: "2rem",
    height: "2rem",
    padding: ".3rem",
    opacity: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    color: "white",
    cursor: "pointer",
    transition: "opacity .5s ease",
  },
};

const DragableColorBox = SortableElement(props => {
  const { classes, name, color } = props;
  const isLight = chroma(color).luminance() >= 0.4;
  const dynamicColor = isLight ? "black" : "white";

  const handleDelete = e => {
    props.deleteColor(name);
  };

  return (
    <div className={classes.root} style={{ color: dynamicColor }}>
      <div className={classes.container}>
        <span>{name}</span>
        <div className={classes.trashContainer} onClick={handleDelete}>
          <Trash className={classes.Trash} />
        </div>
      </div>
    </div>
  );
});

export default withStyles(styles)(DragableColorBox);
