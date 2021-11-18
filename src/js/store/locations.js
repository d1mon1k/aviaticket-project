import api from "../services/apiService";

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = null;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    console.log(this.shortCitiesList);
    return response;
  }

  getCityCodeByKey(nameFromForm) {
    const city = Object.values(this.cities).find((city) => {
      return city.full_Name === nameFromForm;
    });
    return city.code;
  }

  getAirlinesNameByCode(code) {
    return this.airlines[code].name ? this.airlines[code] : "";
  }

  getAirlinesLogoByCode(code) {
    return this.airlines[code].logo ? this.airlines[logo] : "";
  }

  createShortCitiesList(cities) {
    // { 'City, Country': null }
    // [ [key, value] , ... ]
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.fullName] = null;
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    // { Code : {name, ...} }
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    // { 'CountryCode': {...} }
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    // { 'City name, Country name': {...} }
    return cities.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code); //? difference
      const city_name = city.name || city.name_translations.en;
      const full_Name = `${city_name}, ${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_Name,
      };
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    console.log(response);
  }
}

const locations = new Locations(api);

export default locations;

// { 'City, Country' : null }
// [ {}, {} ]
// { 'City': {...} } => cities[code]
