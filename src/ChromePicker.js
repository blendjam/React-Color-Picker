import React, { Component } from "react";
import { ChromePicker } from "react-color";

export class ColorPicker extends Component {
  state = {
    background: "#fff",
  };

  handleChange = background => {
    this.setState({ background }, () => {
      this.props.onChange && this.props.onChange(this.state.background.hex);
    });
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <ChromePicker
        color={this.state.background}
        onChange={this.handleChange}
        onChangeComplete={this.handleChangeComplete}
        disableAlpha={true}
      />
    );
  }
}

export default ColorPicker;
