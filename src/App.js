import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import NewPalette from "./NewPalette";
import seedColors from "./SeedColors";
import generatePalette from "./ColorHelpers";
import Palettelist from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

class App extends React.Component {
  findPalette(id) {
    return seedColors.find(palette => palette.id === id);
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Palettelist paletteList={seedColors} {...props} />}
        />
        <Route exact path="/palette/new" render={props => <NewPalette />} />
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
