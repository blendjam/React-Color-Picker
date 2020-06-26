import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteButton from "./DeleteButton";

const styles = {
  root: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: ".5rem",
    margin: "1rem auto",
    height: "150px",
    width: "200px",
    cursor: "pointer",
    "&:hover i": {
      opacity: 1,
    },
  },
  colors: {
    width: "100%",
    height: "80%",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    overflow: "hidden",
    borderRadius: "5px",
    margin: "auto",
  },
  miniColorBox: {
    width: "20%",
    height: "25%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    fontWeight: "700",
    marginTop: ".5rem",
  },
  emoji: {
    fontSize: "1rem",
    marginLeft: "auto",
  },
};

const MiniPalette = (props) => {
  const { classes, paletteName, emoji, colors, id } = props;
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColorBox}
      key={color.name}
      style={{ backgroundColor: color.color }}></div>
  ));

  const deletePalette = id => {
    props.deletePalette(id);
  };


  return (
    <div className={classes.root} onClick={props.goToPalette}>
      <DeleteButton deletePalette={deletePalette} id={id} />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
