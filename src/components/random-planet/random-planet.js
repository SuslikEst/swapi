import React, { Component } from 'react';

import './random-planet.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {}
  }

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet });
  }

  updatePlanet() {
    let id = Math.floor(Math.random() * 25 + 2);
    this.swapiService
      .getOnePlanet( id )
      .then(( planet ) => {
        this.setState( this.onPlanetLoaded(planet) );
      });
  }

  render() {

    const { planet: { id, name, population, rotationPeriod, diameter } } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <Spinner />
        
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>Planet Name</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{ population }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{ rotationPeriod }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{ diameter }</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
