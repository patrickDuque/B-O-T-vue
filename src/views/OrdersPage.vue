<template>
  <v-container>
    <h1>Your Orders: </h1>
    <OrderItem
      v-for="order in orders"
      :key="order.id"
      :item="order"
    />
  </v-container>
</template>

<script>
  import OrderItem from "@/components/Order/OrderItem.vue";
  export default {
    components: {
      OrderItem
    },
    computed: {
      orders() {
        return this.$store.getters["cart/getOrder"];
      }
    }
  };
</script>