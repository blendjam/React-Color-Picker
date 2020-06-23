import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import NavBar from "./NavBar";
import Dropdown from "./DropDown";
import Slider from "./Slider";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

export default class Palette extends Component {
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
    const { palette } = this.props;
    const colorBoxes = palette.colors[level].map(c => (
      <ColorBox
        background={c[colorFormat]}
        name={c.name}
        key={c.id}
        showMore={true}
        moreUrl={`/palette/${palette.id}/${c.id}`}
      />
    ));
    return (
      <div className="Palette">
        <NavBar>
          <NavLink to="/" className="NavBar-logo">
            LOGO
          </NavLink>
          <Slider changeLevel={this.changeLevel} level={level} />
          <Dropdown changeColorFormat={this.changeColorFormat} />
        </NavBar>
        <div className="Palette-colors">{colorBoxes}</div>
        <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}
