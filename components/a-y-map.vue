<template>
  <yandex-map
    :coords="coords"
    class="h-[400px]"
    zoom="10"
    @click="onClick"
    v-if="mapDone == true"
  >
    <ymap-marker
      v-for="marker in markers"
      :key="marker.id"
      :marker-id="marker.id"
      :coords="marker.coords"
      :balloon-template="mapBalloon(marker)"
      :icon="{ content: marker.text }"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  props: {
    ymap_data: Array
  },
  components: {
    yandexMap,
    ymapMarker
  },
  data () {
    return {
      coords: [55.8, 37.4],
      markers: [],
      mapDone: false
    }
  },
  methods: {
    onClick (e) {
      this.coords = e.get('coords')
    },
     mapBalloon: function(marker) {
      return `<div><h1>${marker.text}</h1></div>`
    },
    setMapMarker () {
      // const markersPropsA =  this.ymap_data.map(item => item.attributes.Coordinates.split(',')[0])
      // const markersPropsB =  this.ymap_data.map(item => item.attributes.Coordinates.split(',')[1])

      // const markersPropsVip = this.ymap_data.map(item => item.attributes.VIP)

      this.markers = this.ymap_data.map((item, i) => ({
        coords: item.attributes.Coordinates.split(','),
        text: item.attributes.CompanyName,
        id: i + 1,
        vip: item.attributes.VIP
      }))
      // console.log(markersPropsB)
    }
  },
   computed: {
    balloonTemplate() {
      return `
        <h1 class="text-[red]">Hi, everyone!</h1>
        <p>I am here: ${this.coords}</p>
        <img src="http://via.placeholder.com/350x150">
      `
    }
  },
  mounted () {
    this.setMapMarker()
    this.mapDone = true
  }
}
</script>

<style></style>
