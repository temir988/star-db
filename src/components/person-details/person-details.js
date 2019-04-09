import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';

import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ person });
      });
  }

  render() {

    if (!this.state.person) {
      return <span>Select a person from a list</span>
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.person;

    return (
      <div className="person-details card">
        {/* <img className="person-image"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAADYCAMAAAA5zzTZAAAAMFBMVEX////Nzc3S0tLLy8vPz8/39/f6+vrv7+/8/Pzj4+PHx8fd3d3Y2NjV1dXq6urz8/MTeP6BAAAGUElEQVR4nO2d25adIAyGxaDi9vT+b1tQp+M+uIUQJXH4ZrVX7ap/gSSEEIoik8lkMplMJpPJ0GLm36upGdtu6PtunEziLzqPaexLDQ8AUEoBPHRXp/6kM6jaYVaotfvlfnM/U+rPImfsZ5lvQHujKWwK0+qPMmf0eJ8pPFqd2s3Vz0oBuuYWYqdhfzx/Kduxkj2P685Hp1uwYNUKtk+NW6A70/ZJ5/JnYBhTfzGScXEqAUAvclw7WDynPxo0tKk/OxjT2zkZqtT+DeiFmSYrNGjebsSWVeqPD8F4OZdPSu3PIMm/9jids1KtxExgY41RmM19UQtdagm+jBDoXV7HFZrUEvyY1G6Y6yu1FDF/TRmjcgFEREttvFBrf1Or8KCKWqM/UkGAU+3j1ug6por/9K0IhDqp/B2Ni+sJpKoytZAjagqVDp1ayREjMt59V8rdo6ID3le4G18SF7MoZZ59aGjMkVPKPPQliI8kKLU2ZPgbSq2PidzEyFE6xW1MBSltqLwpe6VtVFZFklLfY5gbKCUTyl0pWSzIXimdO2WeSTJk9oi7UrLNqVPK+tCtojO93JU+CJWyTiRRKuWd8SVVyjplRqlUs04kkY6p4hw6kI4pdIwHlXRMNefYgXb2cvYztEo5+5msFEmfWs8+WSmSP2OR/pCXYXwGRbk/taED4/JByuyKAsYGiTRjxrymmTALyrwiie74lLU3LeZ6DrKzNsY+pqAqu1JzkRljy+sgOpjRzJOghRtUIqXch9SdoJIoZT+kBZVLLdkPqau9irZKUurw4+evhJJXRx3vaAbG+c8tfeh1tlc4b9eeaCBSqQC7u9JG1l+xDu2f6WLMrwRX+p+ou0FiVukMvqpOsy/WfsIUAz5+YH/V4JkRXUDIO330Dr7QV0YguGHAKpVxH3MDtipUlI+ZmbDWV5LlnUFenNGMz0z3QAUPrGsb9kAtVN5FSDtMqNSvjC34Mzb2DVcqzpnOoO5ZCEiUvYNJ/bKuitwnfFA511p9I3xQ5QVIK8FJbrFKgzO/YpUG344XqzQ4xyJW6RQoVK7S8DEVuJOZCVaqQWCA70D06xC4aXMgqpNEhoPefV43iDj1f2HqvjRi3lfK+5bMB+qdvtqHQu2PnFE1ruE0QuYq1mqVY5a6iPPTud0r59tPG+zMVTFFHdqdzUiQWqPPKTZIOIaqS5I2Hfyl1mVsT9AZzT7RMmmyxiuss/mmhdBm6d+k8o0hxoGuYlu5Gcy0tMPv2YYw2Ek1RU08nivs1urknlWh1+nWPKf3Z6a2hNhCwW9qWxaH5Kaxownrf/9JSgHK1GKrsXePpXx5JYdC6PJ/OIyJxJpq7FwgfprAN0D1zdVL1lRtp91LZKdN2D2xurvM65iq6XoNazpBX6p1+aeGC5ZsbSdsqVA5E0pA9+vbfafM5app7VA+Lp+vn7C7nJMcj3UkgzrXkYSh55zESDykpul08gn7ETuwlObp29t5qSGNKNrgF6uuY35iCoAmoiC7NXsm1snGa6W5X3k6EJ30N2xn7hPOEpdxeZiJrunwydgRiUr6d14vIrLA2qaIN96MiLm74h4DRrtXwt7g14AeVSGW9z/4l6MI3ue6FI0tHKDtdHQNuH5KZA/iXAhuUJFveqalRGzPzZn5vtPQCPMbXNvIAsxtZInLFHcOSfgqw4VgDqykedMFRMUAZQf/C0GUB6Mvj6YF0c5OpkHCLFTCtoFXoiG4CY9Mg6TC/Qzdk4FXE1qaJtQgKTd/w8IkabvwLWEuVewyDb1oTtQdMQ1BNmnkcoCIIKytHcUz2ekIsL4m9bfGYGejfzZJYrLslxA/IzXoXQhJhsrchf/ivVCj+spxwLuVlOxl6vyMr0kSd/T0hq9Jkhz0znhvx6UbJO9DC1PKDQVXPI1vLefQfw/PJpSErxQkw8/NtPLH1DMeFJoWfMJri0r6Fk4SfB+CqKV7Uxfjexlf+RGS8mx/IT5Ccni5GWyLVl54uBnxW7YFDzcj3/Q6fDKh0jenCz67Gdk5pB98HCrlK2QJ8XCohG/oJUR7ONR7mF51fAx1g1hw4dDNTOJ3bAvHbkbyKduWYzeDaqPMkUM3c4dtuPI6RL2L6T1yqKa4ydzVR/s2U6T+RDIOLx+UN0Ef3IgyjLq5ZDKZTCaTyWQyVPwDMvFquw9ROTsAAAAASUVORK5CYII=" alt="Person" /> */}
        <img className="person-image" alt="Person"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
