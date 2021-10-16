<template>
  <div id="app">
    <WeatherApp msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import WeatherApp from './components/WeatherApp.vue';

export default {
  name: 'App',

  components: {
    WeatherApp,
  },
};
</script>

<style lang="scss">
</style>
