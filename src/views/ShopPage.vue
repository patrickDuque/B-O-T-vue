<template>
  <v-container
    fluid
    class="justify-center"
  >
    <ShopList
      v-for="(cart, i) in carts"
      :key="i"
      :cart="cart"
    />
  </v-container>
</template>

<script>
  import ShopList from "@/components/Shop/ShopList.vue";
  export default {
    components: {
      ShopList
    },
    computed: {
      carts() {
        console.log(this.$store.getters["shop/getShop"]);
        return this.$store.getters["shop/getShop"];
      }
    }
  };
</script>