<template>
  <div class="flex flex-col gap-8">
    <div class="grid grid-cols-2 gap-4 w-full">
      <div class="col-span-2 sm:col-span-1 flex flex-col justify-center gap-8">
        <h1 class="text-5xl font-bold">
          Продажа, ремонт, размещение <br />
          и настройка оборудования
        </h1>
        <div class="grid grid-cols-2 gap-6">
          <nuxt-link to="/asic"
            class="flex flex-col gap-3 p-3 border-2 rounded-xl border-[#242424]/5 hover:bg-white anime hover:shadow-md"
          >
            <img
              src="~/assets/img/Rectangle4.jpg"
              alt=""
              class="rounded-xl overflow-hidden"
            />
            <div class="flex items-center justify-between ">
              <div class="flex flex-col gap-3 items-start">
                <span class="font-bold text-sm uppercase">Майнинг</span>
                <h2 class="text-[#7854F7] text-5xl font-bold">ASIC</h2>
              </div>


            </div>
          </nuxt-link>
          <nuxt-link to="/gpu"
            class="flex flex-col gap-3 p-3 border-2 rounded-xl border-[#242424]/5 hover:bg-white anime hover:shadow-md"
          >
            <img
              src="~/assets/img/Rectangle5.jpg"
              alt=""
              class="rounded-xl overflow-hidden"
            />
            <div class="flex items-center justify-between ">
              <div class="flex flex-col gap-3 items-start">
                <span class="font-bold text-sm uppercase">Майнинг</span>
                <h2 class="text-[#7854F7] text-5xl font-bold">GPU</h2>
              </div>


            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="col-span-2 sm:col-span-1 flex relative ">
        <div class=" top-0 w-full right-0 left-0  h-[648px]">
          <a-y-map
            v-if="dealers !== undefined"
            :ymap_data="dealers.data"
            :key="this.sity.getSityId"
            class="rounded-[70px] overflow-hidden bg-[#FFFFFF]/25 p-3 border-[1px] border-[#242424]/5 shadow"
          />
        </div>
      </div>
    </div>
    <div>
      <div
        class="grid grid-cols-6  gap-2  sm:overflow-y-auto"
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
    </div>
    <div></div>
  </div>
</template>

<script>
import aYMap from '~/components/a-y-map.vue'
import ADealer from '~/components/dealer/a-dealer.vue'
import { useSity } from '@/store'
import gql from 'graphql-tag'

const SINGLE_CAT = gql`
  query SINGLE_CAT($ID: ID) {
    dealers(
      filters: { sity: { id: { eq: $ID } } }
      sort: "VIP:desc"
      pagination: { limit: 36 }
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
          Logo {
            data {
              attributes {
                url
              }
            }
          }
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
  layout: 'main',
  components: { aYMap, ADealer },
  apollo: {
    dealers: {
      query: SINGLE_CAT,
      prefetch: true,
      variables () {
        return {
          ID: this.sity.getSityId
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
      mapYandex: 0
    }
  },
  watch: {
    'sity.getSityId' () {
      this.mapYandex = Math.floor(Math.random() * 22)
      location.reload()
    }
  }
}
</script>

<style></style>
