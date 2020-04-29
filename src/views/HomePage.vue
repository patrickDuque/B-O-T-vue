<template>
  <v-container fluid>
    <HomeHeader />
    <div class="spacer" />
    <HomeBody />
    <div class="spacer" />
    <HomeFooter />
  </v-container>
</template>

<script>
  import HomeHeader from "@/components/Home/HomeHeader.vue";
  import HomeBody from "@/components/Home/HomeBody.vue";
  import HomeFooter from "@/components/Home/HomeFooter.vue";
  export default {
    components: {
      HomeHeader,
      HomeBody,
      HomeFooter
    },
    mounted() {
      const id = this.$store.getters["user/getId"];
      this.$store.dispatch("cart/initCart", id);
    }
  };
</script>

<style scoped>
  .spacer {
    height: 200px;
  }
</style>
