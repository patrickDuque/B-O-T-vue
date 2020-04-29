<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-img
          :src="item.imageUrl"
          height="400"
        />
      </v-col>
      <v-col md="6">
        <v-container>
          <h3 class="display-1 my-5 blue-grey--text text--darken-3">Your order of {{ item.name }} has been placed</h3>
          <h3 class="display-1 my-5 red--text text--darken-3 font-weight-thin">Quantity: {{ item.quantity }}
          </h3>
          <v-divider></v-divider>
          <v-row>
            <v-col
              sm="12"
              md="6"
              offset-md="3"
            >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: ["item"]
  };
</script>