<template>
  <v-app-bar
    app
    color="white"
    class="px-0"
    elevate-on-scroll
  >
    <div
      class="d-flex align-center"
      @click="$router.push('/')"
    >
      <v-img
        alt="Shoe Logo"
        class="shrink mx-3"
        contain
        src="../assets/shoe.svg"
        transition="scale-transition"
        width="60"
      />
      <h1
        style="font-family: 'Bangers', cursive;"
        class="blue-grey--text text--darken-2"
      >Boots-of-Travel</h1>
    </div>

    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <Link
        v-if="checkAuth"
        destination="/"
        label="HOME"
      />
      <Link
        v-if="checkAuth"
        destination="/shop/mens-shoes"
        label="SHOES"
      />
      <Link
        v-if="checkAuth"
        destination="/shop/mens-shirts"
        label="CLOTHING"
      />
      <Link
        v-if="checkAuth"
        destination="/shop/mens-caps"
        label="CAPS"
      />
      <Link
        v-if="checkAuth"
        destination="/shop/mens-accessories"
        label="ACCESSORIES"
      />
      <Link
        v-if="checkAuth"
        destination="/shop/mens-bags"
        label="BAGS"
      />
      <router-link
        v-if="checkAuth"
        to="/cart"
        exact
        active-class="active"
      >
        <p class="title font-weight-light red--text text--darken-4 ma-0 pa-2"> CART <v-icon
            class="ml-1 red--text text--darken-4"
            id="cart"
          >shopping_cart</v-icon> {{ cartItems }}
        </p>
      </router-link>
      <Link
        v-if="!checkAuth"
        destination="/signin"
        label="SIGN IN"
      />
      <Link
        v-if="!checkAuth"
        destination="/signup"
        label="SIGN UP"
      />

      <p
        v-if="checkAuth"
        id="logout"
        @click="logout"
        class="title font-weight-light red--text text--darken-4 ma-0 pa-2"
      > LOG OUT
      </p>
    </v-toolbar-items>
    <v-menu class="hidden-md-and-up">
      <template v-slot:activator="{ on }">
        <v-icon
          class="hidden-md-and-up"
          large
          v-on="on"
        >menu</v-icon>
      </template>
      <v-list>
        <v-list-item v-if="checkAuth">
          <Link
            destination="/"
            label="HOME"
          />
        </v-list-item>
        <v-list-item v-if="checkAuth">
          <Link
            destination="/shop/mens-shoes"
            label="SHOES"
          />
        </v-list-item>
        <v-list-item v-if="checkAuth">
          <Link
            destination="/shop/mens-shirts"
            label="CLOTHING"
          />
        </v-list-item>
        <v-list-item v-if="checkAuth">
          <Link
            destination="/shop/mens-caps"
            label="CAPS"
          />
        </v-list-item>
        <v-list-item v-if="checkAuth">
          <Link
            destination="/shop/mens-accessories"
            label="ACCESSORIES"
          />
        </v-list-item>
        <v-list-item v-if="checkAuth">
          <Link
            destination="/shop/mens-bags"
            label="BAGS"
          />
        </v-list-item>
        <v-list-item v-if="checkAuth">
          <router-link
            to="/cart"
            exact
            active-class="active"
          >
            <p class="title font-weight-light red--text text--darken-4 ma-0 pa-2"> CART <v-icon
                class="ml-1 red--text text--darken-4"
                id="cart"
              >shopping_cart</v-icon> {{ cartItems }}
            </p>
          </router-link>
        </v-list-item>
        <v-list-item v-if="!checkAuth">
          <Link
            destination="/signin"
            label="SIGN IN"
          />
        </v-list-item>
        <v-list-item v-if="!checkAuth">
          <Link
            destination="/signup"
            label="SIGN UP"
          />
        </v-list-item>
        <v-list-item v-if="checkAuth">
          <p
            id="logout"
            @click="logout"
            class="title font-weight-light red--text text--darken-4 ma-0 pa-2"
          > LOG OUT
          </p>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-if="checkAuth"
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">Are you sure you want to logout?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="confirmLogout"
          >
            Yes
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="declineLogout"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
  import Link from "./Link.vue";
  export default {
    data: () => ({
      dialog: false
    }),
    components: {
      Link
    },
    computed: {
      cartItems() {
        let total = 0;
        this.$store.getters["cart/getCart"].forEach(i => {
          total += +i.quantity;
        });
        return total;
      },
      checkAuth() {
        return this.$store.getters["user/authCheck"];
      }
    },
    methods: {
      logout() {
        this.dialog = true;
      },
      confirmLogout() {
        this.$store.commit("user/logout");
        this.$router.push("/signin");
        this.dialog = false;
      },
      declineLogout() {
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>
  div.d-flex {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  .active {
    border-bottom: 1px solid #b71c1c;
  }

  #logout {
    cursor: pointer;
  }
</style>