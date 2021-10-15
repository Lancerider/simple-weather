import axios from 'axios';

const apiBaseURL = process.env.VUE_APP_API_BASE_URL || 'api.openweathermap.org/data/2.5';
const apiKey = process.env.VUE_APP_API_KEY || '1f89da47fe4d0be6bbbf376af70bdb58';

export const getFavoritedCities = () => ([
  {
    id: 3451189,
    name: 'Rio de Janeiro',
    state: '',
    country: 'BR',
  },
  {
    id: 1816670,
    name: 'Beijing',
    state: '',
    country: 'CN',
  },
  {
    id: 5368361,
    name: 'Los Angeles',
    state: 'CA',
    country: 'US',
  },
]);

export const getWheaterByCityId = (cityId) => {
  // TODO: /forecast/hourly the api says "invalid api key"
  const url = `${apiBaseURL}/forecast?id=${cityId}&appid=${apiKey}`;

  return axios.get(url);
};
