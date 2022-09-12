<template>
  <div>
    <yandex-map
      :coords="coords"
      class="h-[900px] rounded-[70px] overflow-hidden"
      zoom="14"
      v-if="mapDone == true"
    >
      <ymap-marker
      :marker-id="123"
        :coords="coords"
        :icon="markerIcon"
      ></ymap-marker>
    </yandex-map>
  </div>
</template>

<script>
// читаем документацию по vue-yandex-maps
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  props: {
    ymap_data: Object,
    titleCompany: String
  },
  components: {
    yandexMap,
    ymapMarker
  },
  data () {
    return {
      // начальная точка (центр)
      coords: [],
      mapDone: false,
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: '/icons/map-default.png',
        imageSize: [23, 26],
        imageOffset: [0, 0],
        content: '',
        contentOffset: [10, -25],
        contentLayout:
          '<div style="width: 100%;  color: #212121; font-weight: bold;">$[properties.iconContent]</div>'
      },
    }
  },
  methods: {

    // устанавлием значения для балуна

    setMapMarker () {
     this.coords = this.ymap_data.Coordinates.split(',')
     this.markerIcon.content = this.titleCompany
    }
  },
  mounted () {
    // сначала устанавливаем значение из пропса при рендере компонента карты

    this.setMapMarker()


    // чтобы не было ошибки при долгой загрузки карты , не рендерим пока карта не будет готова
    this.mapDone = true
  }
}
</script>

<style></style>
