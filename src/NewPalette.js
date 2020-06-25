import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import SideBarwNavBar from "./SideBarwNavBar";
import DragableColorList from "./DragableColorList";
import arrayMove from "array-move";

const styles = {};

class NewPalette extends Component {
  state = {
    newName: "",
    colorList: [...this.props.paletteList[0].colors],
  };

  addColor = (currentColor, newName) => {
    const newColor = { color: currentColor, name: newName };
    this.setState({
      colorList: [...this.state.colorList, newColor],
    });
  };

  deleteColor = colorName => {
    const newList = [...this.state.colorList].filter(
      color => color.name !== colorName
    );
    this.setState({ colorList: newList });
  };

  handelSavePalette = paletteName => {
    const newName = paletteName;
    const id = newName.toLowerCase().replace(/ /g, "-");
    const newPlaette = {
      paletteName: newName,
      colors: this.state.colorList,
      emoji: ":P",
      id,
    };

    this.props.savePalette(newPlaette);
    this.props.history.push("/");
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colorList }) => ({
      colorList: arrayMove(colorList, oldIndex, newIndex),
    }));
  };

  clearPalette = () => {
    this.setState({ colorList: [] });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SideBarwNavBar
          addColor={this.addColor}
          savePalette={this.handelSavePalette}
          clearPalette={this.clearPalette}
          paletteList={this.props.paletteList}
          colorList={this.state.colorList}>
          <DragableColorList
            axis="xy"
            distance={10}
            onSortEnd={this.onSortEnd}
            colorList={this.state.colorList}
            deleteColor={this.deleteColor}
          />
        </SideBarwNavBar>
      </div>
    );
  }
}
export default withStyles(styles)(NewPalette);
