import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import Dropdown from "./DropDown";
import Slider from "./Slider";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import sizes from './sizes';
import "./Palette.css";

const styles = {
  root: {
    height: "100%",

    "& .ColorBox": {
      [sizes.down('md')]: {
        width: "50%",
        height: "10%",
      },

      [sizes.down("xs")]: {
        width: "100%",
        height: "5%",
      },
    }
  },

  paletteContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    height: '87%',
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
    [sizes.down("xs")]: {
      display: "none",
    }
  }
};

class Palette extends Component {
  state = {
    level: 500,
    colorFormat: "hex",
  };

  changeLevel = level => {
    this.setState({ level });
  };

  changeColorFormat = colorFormat => {
    this.setState({ colorFormat });
  };

  render() {
    const { level, colorFormat } = this.state;
    const { classes, palette } = this.props;
    const colorBoxes = palette.colors[level].map(c => (
      <ColorBox
        background={c[colorFormat]}
        name={c.name}
        key={c.id}
        showMore={true}
        moreUrl={`${process.env.PUBLIC_URL}/palette/${palette.id}/${c.id}`}
      />
    ));
    return (
      <div className={classes.root}>
        <NavBar>
          <NavLink to={`${process.env.PUBLIC_URL}/`} className={classes.Logo}>
            LOGO
          </NavLink>
          <Slider changeLevel={this.changeLevel} level={level} />
          <Dropdown changeColorFormat={this.changeColorFormat} />
        </NavBar>
        <div className={classes.paletteContainer}>{colorBoxes}</div>
        <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);