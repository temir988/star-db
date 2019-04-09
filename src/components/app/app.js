import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorIndicator from '../error-indicator/error-indicator';
import PeoplePage from '../people-page/people-page';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';

export default class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    hasError: false
  };
  
  componentDidCatch() {
    console.log('componentDidCatch');
    this.setState({hasError: true});
  }

  render() {

    if ( this.state.hasError ) {
      return <ErrorIndicator />;
    }

    return (      
    
      <div className="container">
        <Header />
        <RandomPlanet />

        <PeoplePage />       
        
      </div>
    )
  };
};
