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
          <h1 class="display-2 my-5 blue-grey--text text--darken-3">{{ item.name }}</h1>
          <v-divider></v-divider>
          <h3 class="display-1 my-5 red--text text--darken-3">₱{{ item.price }}</h3>
          <h3 class="display-1 my-5 blue-grey--text text--darken-3 font-weight-thin">Quantity: {{ item.quantity }}
          </h3>
          <v-divider></v-divider>
          <v-row>
            <v-col
              sm="12"
              md="6"
              offset-md="3"
            >
              <v-btn
                block
                x-large
                color="red darken-3"
                class="my-5"
                @click="removeFromCart"
              >
                <p class="grey--text text--lighten-3 my-auto">Remove from Cart</p>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: ["item"],
    methods: {
      removeFromCart() {
        const data = {
          name: this.item.name,
          quantity: this.item.quantity,
          price: this.item.price,
          imageUrl: this.item.imageUrl,
          itemId: this.item.itemId
        };
        const id = this.$store.getters["user/getId"];
        this.$store.dispatch("cart/removeFromCart", { id, data });
      }
    }
  };
</script>