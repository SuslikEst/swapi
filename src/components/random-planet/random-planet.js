import React, { Component } from 'react';

import './random-planet.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  }

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  }

  onError = (error) => {
    this.setState({ error: true, loading: false });
  }

  updatePlanet() {
    let id = Math.floor(Math.random() * 25 + 2);
    this.swapiService
      .getOnePlanet( id )
      .then(( planet ) => {
        this.setState( this.onPlanetLoaded(planet) );
      })
      .catch(this.onError);
  }

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const isError = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={ planet } /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { isError }
        { spinner }
        { content }
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return(
        <React.Fragment>
          <img 
           className="planet-image"
           src={ `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` } 
          />
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
        </React.Fragment>
  );
}