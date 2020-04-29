<template>
  <v-container fluid>
    <v-row no-gutters>
      <CustomCard
        v-for="(card, i) in cards"
        :key="i"
        :image="card.image"
        :title="card.title"
      />
    </v-row>
  </v-container>
</template>

<script>
  import CustomCard from "../CustomCard.vue";
  import accessory1 from "../../assets/home-images/accessory1.jpg";
  import shoes1 from "../../assets/home-images/shoes1.jpg";
  import shoes2 from "../../assets/home-images/shoes2.jpg";
  export default {
    data: () => ({
      cards: [
        { title: "Mens Shoes", image: shoes1 },
        { title: "Mens Accessory", image: accessory1 },
        { title: "Mens Sneakers", image: shoes2 }
      ]
    }),
    components: {
      CustomCard
    }
  };
</script>