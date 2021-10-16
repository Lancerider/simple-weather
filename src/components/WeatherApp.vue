<template>
  <div class="app__container">

    <div class="app__header">
      <div class="header__title">
        Simple Weather
      </div>
      <div class="header_search-icon">
        <i class="material-icons">search</i>
      </div>
    </div>

    <div class="cities__labels">
      <a
        v-for="(city, index) in favoritedCities"
        :key="index"
        class="cities__label"
        :class="{ active: city.id === currentCity.id}"
        @click.prevent="citySelection(city)"
      >
        {{ city.name.toUpperCase() }}
      </a>
    </div>
    <div class="app__body">

      <div v-if="showLoadingWeatherError && !weatherData" class="loading-error">
        Something went wrong, try again
      </div>

      <div class="city-hourly-weather__container">

        <div class="city-hourly-weather__title">Next hours</div>

        <div v-if="loadingWeatherData" class="loader">Loading...</div>
        <div v-if="!weatherData && !loadingWeatherData" class="no-data">No Data</div>

        <template v-if="weatherData && !loadingWeatherData">
          <div class="city-hourly-weather__list">
            <div
              v-for="(hour, index) in weatherData.hourly.slice(0, 8)"
              :key="index"
              class="city-hourly-weather__list__item"
            >
              <div class="hourly-weather__item__temperature">{{ Math.floor(hour.temp) }}º</div>
              <div class="hourly-weather__item__humidity">{{ hour.humidity }}%</div>
              <div class="hourly-weather__item__icon">{{ hour.weather[0].main }}</div>
              <div class="hourly-weather__info__time">
                {{ hour.dt }}
              </div>
            </div>
          </div>
        </template>

      </div>

      <div class="city-daily-weather__container">

        <div class="city-daily-weather__title">Next 5 days</div>

        <div v-if="!weatherData && !loadingWeatherData" class="no-data">No Data</div>
        <div v-if="loadingWeatherData" class="loader">Loading...</div>

        <template v-if="weatherData && !loadingWeatherData">
          <div class="city-daily-weather__list">
            <div
              v-for="(day, index) in weatherData.daily.slice(0,5)"
              :key="index"
              class="city-daily-weather__list__item"
            >
              <div class="daily-weather__item__icon">{{ day.weather[0].main }}</div>
              <div class="daily-weather__item__info">
                <div class="daily-weather__info__title">
                  {{  day.dt }}
                </div>
                <div class="daily-weather__info__subtitle">
                  {{ day.weather[0].description }}
                </div>
              </div>
              <div class="daily-weather__item__temperatures">
                {{ Math.floor(day.temp.max) }}º   {{ Math.floor(day.temp.min) }}º
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>
    <div class="app__footer">
      Last updated on Oct31 15:32
    </div>
  </div>
</template>

<script>
import { getFavoritedCities, getWeatherByCity } from '../services';

export default {
  name: 'WeatherApp',

  data() {
    return {
      favoritedCities: [],
      currentCity: null,
      weatherData: null,
      showLoadingWeatherError: false,
      loadingWeatherData: false,
    };
  },

  async mounted() {
    this.favoritedCities = getFavoritedCities();

    [this.currentCity] = this.favoritedCities;
    this.getWeather();
  },

  methods: {
    async getWeather() {
      this.loadingWeatherData = true;
      this.showLoadingWeatherError = false;

      try {
        const response = await getWeatherByCity(this.currentCity);

        this.weatherData = response.data;
      } catch (error) {
        this.showLoadingWeatherError = true;
      }

      this.loadingWeatherData = false;
    },
    citySelection(city) {
      this.currentCity = city;
      this.getWeather();
    },
  },
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background-color: #007cac;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans';
}

.app__header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  color: #fff;
  font-size: 1.2rem;
  background-color: #1565c0;
}

.app__body {
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 2.5%;
}

.cities__labels {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}

.cities__label {
  padding: .75rem 1rem;

  &.active {
    border-bottom: 2px solid #b85f1c;
  }
}

.city-hourly-weather__container,
.city-daily-weather__container {
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  min-height: 100px;
}

.loader, .no-data, .loading-error {
  text-align: center;
}

.city-hourly-weather__title,
.city-daily-weather__title {
  font-size: 1.25rem;
  padding: .5rem;
}

.city-hourly-weather__list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: .5rem;
}

.city-hourly-weather__list__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5rem;

  div {
    padding: .25rem;
  }
}

.city-daily-weather__list {
  display: flex;
  flex-direction: column;
}

.city-daily-weather__list__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: .5rem;
}

.app__footer {
  background-color: #1565c0;
  color: #fff;
  padding: .25rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
}
</style>
