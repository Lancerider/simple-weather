import axios from 'axios';

const apiBaseURL = process.env.VUE_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.VUE_APP_API_KEY || '1f89da47fe4d0be6bbbf376af70bdb58';

const weatherApi = axios.create({
  baseURL: apiBaseURL,
});

const citiesData = {
  3451190: {
    id: 3451190,
    name: 'Rio de Janeiro',
    state: '',
    country: 'BR',
    coord: {
      lon: -43.2075,
      lat: -22.902781,
    },
  },
  1816670: {
    id: 1816670,
    name: 'Beijing',
    state: '',
    country: 'CN',
    coord: {
      lon: 116.397232,
      lat: 39.907501,
    },
  },
  5368361: {
    id: 5368361,
    name: 'Los Angeles',
    state: 'CA',
    country: 'US',
    coord: {
      lon: -118.243683,
      lat: 34.052231,
    },
  },
};

export const getFavoritedCities = () => Object.values(citiesData);

export const getWeatherByCity = (city) => {
  const { lat, lon } = city.coord;

  const url = `/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${apiKey}`;

  return weatherApi.get(url);
};
