import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import DropDown from "./DropDown";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Footer from "./Footer";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "90vh",
  },

  color: {
    height: "50%",
    width: "20%",
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
      <div className="SingleColorPalette Palette">
        <NavBar>
          <NavLink to="/" className="NavBar-logo">
            LOGO
          </NavLink>
          <DropDown changeColorFormat={this.changeColorFomat} />
        </NavBar>
        {colorBoxes}
        <div className="goBack ColorBox">
          <NavLink to={`/palette/${palette.id}`} className="back-button">
            Go Back
          </NavLink>
        </div>
        <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
