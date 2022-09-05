<template>
  <div class="grid grid-cols-12 gap-4 ">
    <div
      @click="ymapMob = !ymapMob"
      class="col-span-12 flex justify-center items-center sm:hidden px-4 py-4 font-semibold  rounded-md bg-neutral-200"
    >
      <span v-if="ymapMob == false">Показать на карте</span>
      <span v-else>Скрыть карту</span>
    </div>
    <div v-if="ymapMob == true" class="w-full col-span-12">
      <a-y-map
        v-if="dealers !== undefined && dealers.data.length"
        :ymap_data="dealers.data"
      />
      <span v-else>Категория пуста</span>
    </div>
    <div
      class="col-span-12 sm:col-span-7 grid grid-cols-1 sm:grid-cols-3  gap-4   sm:overflow-y-auto sm:h-[600px]"
      v-if="dealers !== undefined"
    >
      <a-dealer
        v-for="dealer in dealers.data"
        :key="dealer.id"
        :dealer_data="dealer.attributes"
        :company_url="dealer.id"
        class="max-h-[130px]"
      />
    </div>
    <div class="col-span-5 hidden sm:flex relative ">
      <div class="absolute top-0 w-full right-0 left-0  h-[400px]">
        <a-y-map
          v-if="dealers !== undefined && dealers.data.length"
          :key="mapYandex"
          :ymap_data="dealers.data"
        />
        <span v-else>Категория пуста</span>
      </div>
    </div>
  </div>
</template>

<script>
import aYMap from '~/components/a-y-map.vue'
import ADealer from '~/components/dealer/a-dealer.vue'
import gql from 'graphql-tag'
import { useSity } from '@/store'

const SINGLE_CAT = gql`
  query SINGLE_CAT($UID: String, $ID: ID) {
    dealers(
      filters: { sity: { id: { eq: $ID } }, categories: { UID: { eq: $UID } } }
      sort: "VIP:desc"
      pagination: { limit: 100}
    ) {
      data {
        attributes {
          CompanyName
          CompanyDesc
          Coordinates
          StartTimeWork
          EndTimeWork
          VIP
          UID
          Phone
          categories {
            data {
              attributes {
                Name
              }
            }
          }
          sity {
            data {
              attributes {
                Name
              }
            }
          }
        }
        id
      }
    }
  }
`

export default {
  apollo: {
    dealers: {
      query: SINGLE_CAT,
      prefetch: true,
      variables () {
        return {
          ID: this.sity.getSityId,
          UID: this.$route.params.cat
        }
      }
    }
  },
  setup () {
    const sity = useSity()
    return { sity }
  },
  data () {
    return {
      ymapMob: false,
      mapYandex: 0
    }
  },
  components: { aYMap, ADealer },
  name: 'IndexPage',
  layout: 'main',
  methods: {},
   watch: {
    'sity.getSityId' () {
      this.mapYandex += 1;  
    }
  },
}
</script>
<style>
/* .ymap-container{
  position: absolute;
  top: 0;
  right: 0;
} */
</style>
