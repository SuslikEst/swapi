class SwapiService {

	_apiBase = 'https://swapi.co/api';

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);
		if(!res.ok){
			throw new Error(`Could not fetch ${url} , received ${res.status}`);
		}
		const body = await res.json();
		return body;
	}

	async getAllPeoples() {
		const people = await this.getResource(`/people/`);
		return people.results.map(this._transformPeople);;
	}

	async getOnePeople(id) {
		const people = await this.getResource(`/people/${id}/`);
		return this._transformPeople(people);
	}

	async getAllPlanets() {
		const planets = await this.getResource(`/planets/`);
		return planets.results.map(this._transformPlanet);
	}

	async getOnePlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`);
		return this._transformPlanet(planet);
	}

	async getAllStarships() {
		const starships = await this.getResource(`/starships/`);
		return starships.results.map(this._transformStarship);;
	}

	async getOneStarships(id) {
		const starship = await this.getResource(`/starships/${id}/`);
		return this._transformStarship(starship);
	}

	_extractId(item){
		const idRegExp = /\/([0-9]*)\/$/;
		return item.url.match(idRegExp)[1];
	}

	_transformPlanet(planet) {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter
		}
	}

	_transformPeople(people) {
		return {
			id: this._extractId(people),
			name: people.name,
			gender: people.gender,
			birthYear: people.birthYear,
			eyeColor: people.eyeColor
		}
	}

	_transformStarship(starship) {
		return {
			id: this._extractId(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.costInCredits,
			length: starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			cargoCapacity: starship.cargoCapacity
		}
	}

}

export default SwapiService;