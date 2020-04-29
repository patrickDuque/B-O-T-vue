<template>
  <v-container>
    <router-link :to="`/shop/${cart.name}`">
      <h1 class="blue-grey--text text--darken-2">{{ cart.name.toUpperCase()}}</h1>
      <v-row>
        <v-col
          xs="12"
          sm="6"
          md="6"
          lg="3"
          v-for="(item, index) in cart.items"
          :key="item.id"
        >
          <v-img
            v-if="index < 4"
            :src="item.imageUrl"
            width="600"
            height="400"
          ></v-img>
        </v-col>
      </v-row>
    </router-link>
  </v-container>
</template>

<script>
  export default {
    props: ["cart"]
  };
</script>

<style>
  a {
    text-decoration: none;
  }
</style>