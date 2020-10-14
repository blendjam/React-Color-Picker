import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import NewPalette from "./NewPalette";
import seedColors from "./SeedColors";
import generatePalette from "./ColorHelpers";
import Palettelist from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

class App extends React.Component {
  constructor(props) {
    super(props);

    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

    this.state = {
      palettes: savedPalettes || seedColors,
    };
  }

  findPalette = id => {
    return this.state.palettes.find(palette => palette.id === id);
  };

  savePalette = newPalette => {
    this.setState(
      st => ({ palettes: [...st.palettes, newPalette] }),
      this.syncLocalStorage
    );
  };

  deletePalette = paletteId => {
    const newPalettes = this.state.palettes.filter(e => e.id !== paletteId);
    this.setState({ palettes: newPalettes }, this.syncLocalStorage);
  };

  syncLocalStorage = () => {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + "/"}
          render={routeProps => (
            <Palettelist
              paletteList={this.state.palettes}
              deletePalette={this.deletePalette}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/palette/new"}
          render={routeProps => (
            <NewPalette
              savePalette={this.savePalette}
              paletteList={this.state.palettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/palette/:id"}
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/palette/:paletteId/:colorId"}
          render={routeProps => (
            <SingleColorPalette
              id={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
