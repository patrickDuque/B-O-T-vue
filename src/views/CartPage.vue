<template>
  <v-container>
    <h1 v-if="myCart.length > 0">My Cart</h1>
    <h1 v-else>No items in Cart</h1>
    <CartItem
      v-for="items in myCart"
      :key="items.id"
      :item="items"
    />
    <v-container class="text-center">
      <h1 v-if="myCart.length > 0">Subtotal: ₱{{ subTotal }}</h1>
      <v-btn
        v-if="subTotal > 0"
        x-large
        color="green accent-1"
        class="mt-5 font-weight-bold my-auto blue-grey--text text--darken-3"
        @click="dialog = true"
      >
        Continue to checkout
      </v-btn>
      <v-container>
        <PayPal
          v-if="subTotal > 0"
          :amount="subTotal"
          currency="PHP"
          :client="credentials"
          env="sandbox"
        >
        </PayPal>
      </v-container>
    </v-container>
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
  import CartItem from "@/components/Cart/CartItem.vue";
  import axios from "axios";
  import PayPal from "vue-paypal-checkout";

  export default {
    data: () => ({
      dialog: false,
      loading: false,
      publishableKey: "pk_test_zyYm0slf57VTt0fxGOaWv2xw00lubmcejk",
      token: null,
      charge: null,
      name: "",
      email: "",
      address: "",
      description: "",
      disable: true,
      credentials: {
        sandbox:
          "AZfAs4MTbgLf3LA9y1TwfGEx9R76iJxKuL0XjO0UgCRncQ97DmVi17RdC-q4g0udURg00X7V8hKYITaK",
        production: "EMJZXLG3WP7XC"
      }
    }),
    components: {
      CartItem,
      StripeElements,
      PayPal
    },
    computed: {
      myCart() {
        return this.$store.getters["cart/getCart"];
      },
      subTotal() {
        const total = [];
        this.myCart.forEach(i => {
          total.push(+i.quantity * +i.price);
        });
        return total.reduce((a, b) => a + b, 0);
      }
    },
    methods: {
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
        this.$store.commit("cart/getOrders");
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