<template>
  <div class="grid grid-cols-12 gap-4 ">
    <div
      class="col-span-7 grid grid-cols-3 gap-4 max-h-[90px] "
      v-if="dealers !== undefined"
    >
      <a-dealer
        v-for="dealer in dealers.data"
        :key="dealer.id"
        :dealer_data="dealer.attributes"
        :company_url="dealer.id"
      />
    </div>
    <div class="col-span-5 flex relative">
      <div class="absolute top-0 w-full right-0 left-0  h-[400px]">
        
        <a-y-map v-if="dealers !== undefined && dealers.data.length" :ymap_data="dealers.data" />
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
  components: { aYMap, ADealer },
  name: 'IndexPage',
  layout: 'main',
  // async asyncData ({ app, params }) {
  //   const client = app.apolloProvider.defaultClient
  //   // устанавливаем для фильтра значение URL
  //   const URL = params.cat

  //   const res = await client.query({
  //     query: SINGLE_CAT,
  //     variables: {
  //       URL: URL
  //     }
  //   })

  //   const { dealers } = res.data

  //   return { dealers }
  // },
  methods: {}
}
</script>
<style>
/* .ymap-container{
  position: absolute;
  top: 0;
  right: 0;
} */
</style>
