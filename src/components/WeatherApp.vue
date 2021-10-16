<template>
  <div class="app__container">

    <div class="app__header">
      <div class="header__title">
        Simple Weather
      </div>
      <div class="header_search-icon"></div>
    </div>

    <div class="app__body">
      <div class="cities__labels">
        <div
          v-for="(city, index) in favoritedCities"
          :key="index"
          class="Cities__labels-label"
        >
          {{ city.name.toUpperCase() }}
        </div>
      </div>

      <div
        v-if="showLoadingWeatherError && !weatherData"
        class="loading-error"
      >
        Something went wrong, try again
      </div>
      <div class="city-hourly-weather__container">
        <div class="city-hourly-weather__title">Next hours</div>
        <div class="city-hourly-weather__list">
          <div class="city-hourly-weather__list__item">
            <div class="hourly-weather__item__temperature">27º</div>
            <div class="hourly-weather__item__humidity">0%</div>
            <div class="hourly-weather__item__icon">Sun</div>
            <div class="hourly-weather__info__time">
              3:00PM
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showLoadingWeatherError && !weatherData"
        class="loading-error"
      >
        Something went wrong
      </div>
      <div class="city-daily-weather__container">
        <div class="city-daily-weather__title">Next 5 days</div>
        <div class="city-daily-weather__list">
          <div class="city-daily-weather__list__item">
            <div class="daily-weather__item__icon">Sun</div>
            <div class="daily-weather__item__info">
              <div class="daily-weather__info__title">
                Fri, Nov 1
              </div>
              <div class="daily-weather__info__subtitle">
                Clear throughout the day.
              </div>
            </div>
            <div class="daily-weather__item__temperatures">27º 11º</div>
          </div>
        </div>
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
    };
  },

  async mounted() {
    this.favoritedCities = getFavoritedCities();

    [this.currentCity] = this.favoritedCities;
    this.getWeathers();
  },

  methods: {
    async getWeathers() {
      this.loadingWeatherData = true;
      this.showLoadingWeatherError = false;

      try {
        const response = await getWeatherByCity(this.currentCity);

        this.weatherData = response.data;
        console.log('weatherData', this.weatherData);
      } catch (error) {
        this.showLoadingWeatherError = true;
      }

      this.loadingWeatherData = false;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
