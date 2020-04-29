<template>
  <router-link
    active-class="active"
    :to="destination"
    exact
  >
    <p class="title font-weight-light red--text text--darken-4 ma-0 pa-2">{{ label }}</p>
  </router-link>
</template>

<script>
  export default {
    props: ["label", "destination"]
  };
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .active {
    border-bottom: 1px solid #b71c1c;
  }
</style>