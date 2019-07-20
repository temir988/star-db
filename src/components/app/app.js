import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";

import { SwapiServiceProvider } from "../swapi-service-context";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./app.css";

export default class App extends React.Component {
  state = {
    hasError: false,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService
          ? "DummySwapiService"
          : SwapiService;
      console.log("switched to", Service);
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app container">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" component={StarshipsPage} />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
