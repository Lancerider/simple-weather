<template>
  <div>
    <div class="app-header">
      <div class="header__title">
        Simple Wheater
      </div>
      <div class="header_search-icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WheatherApp',

  data() {
    return {
      cities: ['RIO DE JANEIRO, BEIJING, LOS ANGELES'],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
