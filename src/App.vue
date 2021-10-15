<template>
  <div id="app">
    <WheatherApp msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import WheatherApp from './components/WheatherApp.vue';

export default {
  name: 'App',

  components: {
    WheatherApp,
  },

  mounted() {
    console.log(process.env);
  },
};
</script>

<style lang="scss">
</style>
