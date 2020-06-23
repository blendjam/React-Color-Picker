import React, { Component } from "react";
import "./Slider.css";

export default class Slider extends Component {
  handleChange = e => {
    this.setState({ value: e.target.value });
    this.props.changeLevel(e.target.value);
  };

  render() {
    return (
      <div className="Slider-wrapper">
        <p>Level:</p>
        <p className="Slider-value">{this.props.level}</p>
        <input
          className="Slider"
          type="range"
          min="100"
          max="900"
          step="100"
          onChange={this.handleChange}
          value={this.props.level}
        />
      </div>
    );
  }
}
