<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-alert
          id="modal"
          v-show="showModal && $store.getters['user/authCheck']"
          dense
          text
          type="success"
        >
          {{ item.name }} Added to cart
        </v-alert>
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
          <h3 class="display-1 my-5 blue-grey--text text--darken-3 font-weight-thin">Quantity <v-btn
              text
              :disabled="quantity === 1"
              @click="quantity--"
            >
              <v-icon>remove</v-icon>
            </v-btn> {{ quantity }} <v-btn
              text
              :disabled="quantity >= 5"
              @click="quantity++"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </h3>
          <v-divider></v-divider>
          <v-row>
            <v-col
              sm="12"
              md="6"
            >
              <v-btn
                block
                x-large
                color="grey darken-3"
                class="my-5"
                @click="dialog = true"
              >
                <p class="green--text text--lighten-3 my-auto">Buy Now</p>
              </v-btn>
            </v-col>
            <v-col
              sm="12"
              md="6"
            >
              <v-btn
                block
                x-large
                color="green lighten-3"
                class="my-5"
                @click="addToCart"
              >
                <p class="grey--text text--darken-3 my-auto">Add to Cart</p>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">Please enter your card details</v-card-title>
        <v-container>
          <stripe-elements
            ref="elementsRef"
            :pk="publishableKey"
            :amount="subTotal"
            locale="auto"
            @token="tokenCreated"
            @loading="loading = $event"
          >
          </stripe-elements>
          <v-row>
            <v-col
              sm="12"
              md="6"
            >
              <v-text-field
                v-model="name"
                color="green accent-2"
                label="Name"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col
              sm="12"
              md="6"
            >
              <v-text-field
                v-model="email"
                color="green accent-2"
                label="Email"
                :rules="[rules]"
              ></v-text-field>
            </v-col>
            <v-col sm="12">
              <v-text-field
                v-model="address"
                color="green accent-2"
                label="Address"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col sm="12">
              <v-text-field
                v-model="description"
                color="green accent-2"
                label="Additional Description"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-col
          sm="12"
          md="6"
          offset-md="3"
        >
          <v-btn
            block
            class="green accent-1 blue-grey--text text--darken-2"
            @click="submit"
            :disabled="disable"
          >
            <h4>Pay ₱{{subTotal}}</h4>
          </v-btn>
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { StripeElements } from "vue-stripe-checkout";
  import axios from "axios";
  export default {
    data: () => ({
      quantity: 1,
      showModal: false,
      dialog: false,
      loading: false,
      publishableKey: "pk_test_zyYm0slf57VTt0fxGOaWv2xw00lubmcejk",
      token: null,
      charge: null,
      name: "",
      email: "",
      address: "",
      description: "",
      disable: true
    }),
    components: {
      StripeElements
    },
    props: ["item"],
    computed: {
      getId() {
        return this.$store.getters["user/getId"];
      },
      subTotal() {
        return this.item.price * this.quantity;
      }
    },
    methods: {
      addToCart() {
        const data = {
          name: this.item.name,
          quantity: this.quantity,
          price: this.item.price,
          imageUrl: this.item.imageUrl,
          itemId: this.item.id
        };
        this.$store.dispatch("cart/addToCart", { data, id: this.getId });
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 1500);
      },
      submit() {
        this.$refs.elementsRef.submit();
      },
      tokenCreated(token) {
        this.token = token;
        this.charge = {
          source: token.id,
          amount: this.subTotal * 100,
          name: this.name,
          description: this.description,
          receipt_email: this.email,
          address: this.address
        };
        this.$store.commit("cart/orderPass", {
          name: this.item.name,
          quantity: this.quantity,
          imageUrl: this.item.imageUrl
        });
        this.sendTokenToServer(this.charge);
        this.dialog = false;
      },
      sendTokenToServer(charge) {
        const id = this.$store.getters["user/getId"];
        axios
          .post(`https://loud-giddy-firewall.glitch.me/checkout/${id}`, charge)
          .then(() => {
            this.$store.dispatch("cart/initCart", id);
            this.$router.push("/orders");
          });
      },
      rules(email) {
        // eslint-disable-next-line no-useless-escape
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
          this.disable = false;
          return true;
        } else {
          this.disable = true;
          return "Please enter a valid email";
        }
      },
      required(i) {
        if (i.length <= 0) {
          this.disable = true;
          return "This Field is required";
        } else {
          this.disable = false;
          return true;
        }
      }
    }
  };
</script>

<style scoped>
  #modal {
    position: absolute;
    right: 0;
    z-index: 10000;
  }
</style>