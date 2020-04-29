<template>
  <v-app>
    <Header />
    <v-content>
      <transition
        name="fade"
        appear
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
  import Header from "./components/Header.vue";

  export default {
    name: "App",

    components: {
      Header
    },

    data: () => ({
      //
    }),
    created() {
      this.$store.commit("shop/getItems");
      this.$store.dispatch("user/tryAutoLogin");
    }
  };
</script>

<style>
  div#app {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Open Sans Condensed", sans-serif;
    background-color: #ffffff;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 0.5s;
  }

  .fade-leave-active {
    transition: opacity 0.5s;
    opacity: 0;
  }
</style>
