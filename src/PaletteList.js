import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import sizes from './sizes';
import { ReactComponent as PlusCircle } from './plus-circle.svg';
import bg from './bg';


const styles = {
  root: {
    height: "100vh",
    backgroundColor: "#424389",
    /* background by SVGBackgrounds.com */
    backgroundImage: bg,
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },
  container: {
    width: "50%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [sizes.down("md")]: {
      width: "100%",
    }
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    background: "#1d1d1d",
    alignItems: "center",
    color: "white",
    "& a": {
      background: "white",
      display: "flex",
      alignItems: "center",
      borderRadius: "1rem",
      color: "royalblue",
      textDecoration: "none",
      padding: "0 1rem",
      margin: "0 1rem",
      "& span": {
        margin: ".5rem",
        fontWeight: "400",
      },

      [sizes.down("md")]: {
        fontSize: ".7rem",
        padding: "0 .5rem",
      },

      [sizes.down("xs")]: {
        marginTop: '1rem',
      },
    },
    [sizes.down('xs')]: {
      flexDirection: "column",
      background: "none",
      width: "100%",
      margin: 0,
    }
  },
  title: {
    fontSize: "4rem",
    fontWeight: "400",
    color: 'crimson',
    borderRadius: "1rem",
    textAlign: "center",
    padding: "0 2rem",
    "& span": {
      color: "white",
    },

    [sizes.down("md")]: {
      fontSize: "3rem",
    },

    [sizes.down("xs")]: {
      fontSize: "3rem",
      width: "100%",
      background: "#1d1d1d",
      borderRadius: 0,
    }
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
    this.props.history.push(`${process.env.PUBLIC_URL}/palette/${id}`);
  };

  render() {
    const { paletteList, classes } = this.props;
    const paletteDOM = paletteList.map(p => (
      <MiniPalette
        key={p.id}
        deletePalette={this.props.deletePalette}
        goToPalette={() => {
          this.gotToPalette(p.id);
        }}
        {...p}
      />
    ));
    return (
      <div className={classes.root}>
        <nav className={classes.nav}>
          <h1 className={classes.title}><span>React</span>Colors</h1>
          <NavLink to={`${process.env.PUBLIC_URL}/palette/new`}><span>Create Palette</span><PlusCircle /></NavLink>
        </nav>
        <div className={classes.container}>
          <div className={classes.palettes}>{paletteDOM}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Palettelist);
