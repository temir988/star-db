import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorIndicator from '../error-indicator/error-indicator';
import PeoplePage from '../people-page/people-page';
import Row from '../row'
import SwapiService from '../../services/swapi-service';
import ItemDetails, { Record } from '../item-details/item-details';
import ItemList from '../item-list';

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

    const { getPerson, 
            getStarship,
            getPersonImage,
            getStarshipImage } = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
      >      
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails 
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage} 
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    const list = (
      <ItemList />
    );

    return (
      <div className="container">
        <Header />
        <RandomPlanet />

        <PeoplePage />
        {/* <Row
          left={personDetails}
          right={starshipDetails}
        /> */}
      </div>
    )
  };
};
