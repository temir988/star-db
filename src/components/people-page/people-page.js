import React, { Component } from 'react';

import './people-page.css';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator';
import Row from '../row';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import ItemDetails from '../item-details';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedItem: 3,
    hasError: false
  };

  

  onItemSelected = (id) => {
    this.setState({ selectedItem: id });
  };

  render() {

    if ( this.state.hasError ) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.swapiService.getAllPeople}        
      >
      {(i) => (
        `${i.name} (${i.birthYear})` 
      )}
      </ItemList>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedItem} />
      </ErrorBoundry>
    );
    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundry>
    );
  }
}