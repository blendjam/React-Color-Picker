import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import SideBarwNavBar from "./SideBarwNavBar";
import DragableColorList from "./DragableColorList";
import arrayMove from "array-move";
import seedColors from './SeedColors';

const styles = {};

class NewPalette extends Component {
  state = {
    newName: "",
    colorList: [...seedColors[0].colors].splice(0, 6),
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

  handelSavePalette = (paletteName, emoji) => {
    const id = paletteName.toLowerCase().replace(/ /g, "-");
    const newPlaette = {
      paletteName,
      emoji,
      id,
      colors: this.state.colorList,
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
          handleSavePalette={this.handelSavePalette}
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
