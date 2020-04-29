<template>
  <v-col
    xs="12"
    sm="10"
    md="4"
  >
    <v-card
      class="mx-auto my-5"
      max-width="400"
      outlined
      id="card"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="image"
      >
      </v-img>
      <v-card-text>
        <h1 class="text-center
          blue-grey--text
          text--darken-2">{{ title }}</h1>
      </v-card-text>

      <v-layout class="justify-center align-center">
        <v-btn
          color="white"
          text
          x-large
          @click="$router.push('/shop')"
        >
          <h2 class="black--text pa-3 my-3">Shop now</h2>
        </v-btn>
      </v-layout>
    </v-card>
  </v-col>
</template>


<script>
  export default {
    props: ["title", "image"]
  };
</script>

<style scoped>
  #card {
    border: none;
  }

  .black--text {
    border: 1px solid black;
  }
</style>