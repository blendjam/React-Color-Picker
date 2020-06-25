import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

const styles = {
  root: {
    height: "100vh",
    background: "lightblue",
    display: "flex",
    justifyContent: "center",
    overflowY: "scroll",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem",
    color: "white",
    "& a": {
      color: "royalblue",
    },
  },
  title: {
    fontWeight: "400",
  },
  palettes: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    justifyContent: "center",
  },
};

class Palettelist extends Component {
  gotToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };

  render() {
    const { paletteList, classes } = this.props;
    const paletteDOM = paletteList.map(p => (
      <MiniPalette
        key={p.id}
        goToPalette={() => {
          this.gotToPalette(p.id);
        }}
        {...p}
      />
    ));
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.title}>React Colors</h1>
            <NavLink to="/palette/new">Create New Palette</NavLink>
          </nav>
          <div className={classes.palettes}>{paletteDOM}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Palettelist);
