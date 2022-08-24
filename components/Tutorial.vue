<template>
  <section class="wrapper-map">
    <yandex-maps :coords="coords" :placemarks="items" :zoom="zoom" @set-coords="coords = $event"></yandex-maps>
  </section>
</template>

<script>
import YandexMaps from "~/components/YandexMaps";

export default {
  components: {
    YandexMaps
  },
  data() {
    return {
      zoom: 9,
      items: [
        [55.843636, 37.453836],
        [55.784152, 37.712021],
        [59.954435, 30.355646],
        [55.755610, 37.618353],
        [52.277666, 104.328639],
        [52.268093, 104.329484],
        [56.013070, 92.886968],
        [69.343985, 88.210393],
        [55.998786, 92.812911],
        [56.025321, 92.842960]
      ],
      coords: [55.843636, 37.453836]
    };
  },
  created() {
    this.$bus.$on("get-data-point", coords => {
      console.log(coords);
      // this.queryToGetData(
      //   this.loadMore,
      //   this.currentTab,
      //   START_PAGE,
      //   this.specField.id,
      //   this.searchField,
      //   coords)
    });
  },
  beforeDestroy() {
    this.$bus.$off("get-data-point");
  }
};
</script>

<style lang="css">
.wrapper-map {
  background-color: #ccc;
  height: 280px;
  width: 80%;
  position: relative;
  margin: 50px auto;
}
</style>
