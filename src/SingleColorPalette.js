import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import DropDown from "./DropDown";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Footer from "./Footer";
import sizes from "./sizes";

const styles = {
  root: {
    height: "100%",
    "& .ColorBox": {
      height: "50%",

      [sizes.down("md")]: {
        height: "20%",
        width: "50%",
      },

      [sizes.down("xs")]: {
        width: "100%",
        height: "10%",
      },
    },

    "& footer": {
      [sizes.down("xs")]: {
        display: "none",
      },
    },
  },

  paletteWrapper: {
    height: "87%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "flex-start",

    [sizes.down("xs")]: {
      height: "92%",
    },
  },

  goBack: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    width: "20%",
    color: "white",
    backgroundColor: "black",

    "& a": {
      fontWeight: "500",
      fontSize: "2rem",
      color: "white",
      textDecoration: "none",
      [sizes.down("xs")]: {
        fontSize: "1.5rem",
      },
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%",
    },

    [sizes.down("xs")]: {
      width: "100%",
      height: "10%",
    },
  },

  backBtn: {
    padding: "0 1rem",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255,0.2)",
  },
  Logo: {
    margin: "0.3rem",
    marginRight: "5rem",
    background: " crimson",
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    display: "flex",
    justifyContent: "cetner",
    alignItems: "center",
    padding: ".5rem",
  },
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorFormat: "hex",
    };
    this._shades = this.findShades(this.props.id);
  }

  findShades(id) {
    let shades = [];
    for (let i = 100; i <= 900; i += 100) {
      shades.push(this.props.palette.colors[i].find(e => e.id === id));
    }
    return shades;
  }

  changeColorFormat = colorFormat => {
    this.setState({ colorFormat });
  };

  render() {
    const { classes, palette } = this.props;
    const colorBoxes = this._shades.map(shade => {
      const key = shade.name.replace(/ /g, "-");
      return (
        <ColorBox
          background={shade[this.state.colorFormat]}
          key={key}
          className={classes.color}
          name={shade.name}
          showMore={false}
        />
      );
    });

    return (
      <div className={classes.root}>
        <NavBar>
          <NavLink to="/" className={classes.Logo}>
            LOGO
          </NavLink>
          <DropDown changeColorFormat={this.changeColorFormat} />
        </NavBar>
        <div className={classes.paletteWrapper}>
          {colorBoxes}
          <div className={classes.goBack}>
            <NavLink to={`/palette/${palette.id}`} className={classes.backBtn}>
              Go Back
            </NavLink>
          </div>
        </div>
        <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
