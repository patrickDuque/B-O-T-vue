<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular display-2 mt-5">{{ item.name.toUpperCase() }}</h1>
    </v-container>
    <ShopItem
      v-for="items in item.items"
      :key="items.id"
      :item="items"
    />
  </div>
</template>

<script>
  import ShopItem from "@/components/Shop/ShopItem.vue";
  export default {
    computed: {
      item() {
        const shop = this.$store.getters["shop/getShop"];
        const item = shop.filter(item => item.name === this.$route.params.name);
        return item[0];
      }
    },
    components: {
      ShopItem
    }
  };
</script>