<template>
  <yandex-map
    :coords="coords"
    class="h-[400px]"
    zoom="10"
    @click="onClick"
    v-if="mapDone == true"
    ref="coordsMap"
  >
    <ymap-marker
      v-for="marker in markers.filter((i) => i.vip == false)"
      :key="marker.id"
      :marker-id="marker.id"
      :coords="marker.coords"
      :balloon-template="mapBalloon(marker)"
      :icon="markerIcon"
    ></ymap-marker>
    <ymap-marker
      v-for="marker in markers.filter((i) => i.vip == true)"
      :key="marker.id"
      :marker-id="marker.id"
      :coords="marker.coords"
      :balloon-template="mapBalloon(marker)"
      :icon="markerIconVip"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
// читаем документацию по vue-yandex-maps
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
      // начальная точка (центр)
      coords: [],
      markers: [],
      mapDone: false,
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: '/icons/map-default.png',
        imageSize: [19, 25],
        imageOffset: [0, 0],
        content: '',
        contentOffset: [10, -25],
        contentLayout:
          '<div style="width: 100%;  color: #212121; font-weight: bold;">$[properties.iconContent]</div>'
      },
      markerIconVip: {
        layout: 'default#imageWithContent',
        imageHref: '/icons/map-orange.png',
        imageSize: [24, 32],
        imageOffset: [0, 0],
        content: '',
        contentOffset: [10, -25],
        contentLayout:
          '<div style="width: 100%;  color: #212121; font-weight: bold;">$[properties.iconContent]</div>'
      }
    }
  },
  computed: {
    //custom Icons in Ymap 
    setIcons: function(){

    },
  },
  methods: {
    onClick (e) {
      this.coords = e.get('coords')
      console.log(e);
    },
    
    // кастомный балун для карты , тут определяем визуал при надатии на точку на карте
    mapBalloon: function (marker) {
      // если дилер VIP
      if(marker.attr.VIP == true ){
         return `<div class="flex flex-col gap-2 bg-[#FFDEB6] p-2 rounded-md">
      <h1 class="font-bold">${marker.text}</h1>
      <span>Открыто: c ${marker.attr.StartTimeWork} до ${marker.attr.EndTimeWork} </span>
      <span>Телефон:  ${marker.attr.Phone}  </span>
       <span>${marker.attr.CompanyDesc}  </span>
       <a class="underline" href="/company/${marker.id}"> Подробнее</a>
      </div>`
      } else {
         return `<div class="flex flex-col gap-2">
      <h1 class="font-bold">${marker.text}</h1>
      <span>Открыто: c ${marker.attr.StartTimeWork} до ${marker.attr.EndTimeWork} </span>
      <span>Телефон:  ${marker.attr.Phone}  </span>
       <span>${marker.attr.CompanyDesc}  </span>
       <a class="underline" href="/company/${marker.id}"> Подробнее - ${marker.id}</a>
      </div>`
      }
     
    },
    // устанавлием значения для балуна
    setMapMarker () {
      this.markers = this.ymap_data.map((item, i) => ({
        coords: item.attributes.Coordinates.split(','),
        text: item.attributes.CompanyName,
        attr: item.attributes,
        id: item.id,
        vip: item.attributes.VIP
      }))
    },
    setMapCoords () {
      this.coords = this.ymap_data[0].attributes.Coordinates.split(',')
    }
  },
  mounted () {
    // сначала устанавливаем значение из пропса при рендере компонента карты
    this.setMapMarker()
    this.setMapCoords()
    // чтобы не было ошибки при долгой загрузки карты , не рендерим пока карта не будет готова
    this.mapDone = true
  }
}
</script>

<style></style>
