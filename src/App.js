import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import NewPalette from "./NewPalette";
import seedColors from "./SeedColors";
import generatePalette from "./ColorHelpers";
import Palettelist from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

class App extends React.Component {
  state = {
    palettes: [...seedColors],
  };
  findPalette = id => {
    return this.state.palettes.find(palette => palette.id === id);
  };

  savePalette = newPalette => {
    this.setState(st => ({ palettes: [...st.palettes, newPalette] }));
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <Palettelist paletteList={this.state.palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/new"
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
          path="/palette/:id"
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
          path="/palette/:paletteId/:colorId"
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
