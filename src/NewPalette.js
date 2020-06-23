import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import SideBarwNavBar from "./SideBarwNavBar";
import DragableColorBox from "./DragableColorBox";

const sideBarWidth = "100px";

const styles = {
  root: {
    // overflow: "hidden",
  },
  container: {
    // display: "flex",
    // flexWrap: "wrap",
  },
};

class NewPalette extends Component {
  state = {
    newName: "",
    colorList: [],
  };

  addColor = (currentColor, newName) => {
    const newColor = { color: currentColor, name: newName };
    this.setState({
      colorList: [...this.state.colorList, newColor],
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SideBarwNavBar
          sideBarWidth={sideBarWidth}
          addColor={this.addColor}
          colorList={this.state.colorList}>
          {this.state.colorList.map(color => (
            <DragableColorBox
              color={color.color}
              name={color.name}
              key={color.name}
            />
          ))}
        </SideBarwNavBar>
      </div>
    );
  }
}
export default withStyles(styles)(NewPalette);
