<template>
  <div class="grid grid-cols-12 grid-rows-[auto,auto-auto] gap-4 ">
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
    <div class="col-span-6 row-span-1">
      <span v-if="dealers !== undefined">{{sortedDealersApi.length}} </span>
      
      <a-header-filters
        :filter_accessories="accessories"
        :filtersList="filtersList"
        @getFilterMan="getFilterMan"
        @getFilterName="getFilterName"
      />
    </div>

    <div class="col-span-6 row-span-3 flex relative ">
      <div class="absolute top-0 w-full right-0 left-0  h-[600px]">
        <a-y-map
          v-if="dealers !== undefined"
          :ymap_data="sortedDealersApi"
          :key="this.sity.getSityId"
          class="rounded-[70px] overflow-hidden bg-[#FFFFFF]/25 p-3 border-[1px] border-[#242424]/5 shadow"
        />
      </div>
    </div>
    
    <div
      class="col-span-6 row-span-2 grid grid-cols-3 gap-2   sm:h-[600px]"
      :class="[dealers.data.length <= 12 ? '' : 'sm:overflow-y-auto']"
      v-if="dealers !== undefined"
    >
    
      <a-dealer
        v-for="dealer in sortedDealersApi"
        :key="dealer.id"
        :dealer_data="dealer.attributes"
        :company_url="dealer.id"
        class="max-h-[130px]"
      />
    </div>
  </div>
</template>

<script>
import aYMap from '~/components/a-y-map.vue'
import ADealer from '~/components/dealer/a-dealer.vue'
import gql from 'graphql-tag'
import { useSity } from '@/store'
import AHeaderFilters from '~/components/header-components/a-header-filters.vue'

const SINGLE_CAT = gql`
  query SINGLE_CAT($UID: String, $ID: ID) {
    dealers(
      filters: {
        sity: { id: { eq: $ID } }
        sub_categories: { URL: { eq: $UID } }
      }
      sort: "VIP:desc"
      pagination: { limit: 100 }
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
          sub_categories {
            data {
              attributes {
                Name
                URL
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

const MESTO_FILTERS = gql`
  query MESTO_FILTERS {
    razmechenieMestos {
      data {
        attributes {
          Name
          Active
        }
      }
    }
  }
`

const ACCES_FILTERS = gql`
  query ACCES_FILTERS {
    accessories {
      data {
        attributes {
          Name
          Active
        }
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
    },
    razmechenieMestos: {
      query: MESTO_FILTERS,
      prefetch: false
    },
    accessories: {
      query: ACCES_FILTERS,
      prefetch: false
    }
  },
  setup () {
    const sity = useSity()
    return { sity }
  },
  data () {
    return {
      ymapMob: false,
      mapYandex: 0,
      filtersTo: [],
      sortedDealers: [],
      filters: {
        s: '',
        sort: ''
      },
      oopp: [],
      demo: []
    }
  },
  components: { aYMap, ADealer, AHeaderFilters },
  name: 'IndexPage',
  layout: 'main',
  methods: {
    async FilterDealers (data) {
      const searchInput = data
      console.log('tut2  ' + searchInput)
      try {
        const res = await this.$apollo.query({
          query: SINGLE_CAT,
          variables: {
            $ID: this.sity.getSityId,
            $NAMEMAN: searchInput
          }
        })

        if (res) {
          this.loading = false
          const { results } = res.data
          this.testResults = results
        }
      } catch (err) {
        this.loading = false
        this.testResults = []
      }
    },
    async getFilterName (nameField, val) {
      const getParams = []
      const yy = val
      const route = this.$route.params.cat
      getParams.push(`filters[${nameField}][Name][$in]=${yy}`)

      console.log(nameField)
      this.oopp = getParams
      this.sortedDealers = this.dealers.data

      // fetch

      const res = await this.$axios.$get(
        `http://admin.996661-cn43153.tmweb.ru:1337/api/dealers/?filters[sity][Name][$in]=Москва&filters[sub_categories][URL][$in]=${route}&${getParams}`
      )
      this.demo = res.data
    },
    getFilterMan (data) {
      const doneTest = []
      for (const value of data.values()) {
        doneTest.push(value)
      }

      const joindealres = doneTest
        .join('","')
        .toString()
        .replaceAll('\n', '')
      this.FilterDealers(joindealres)
    }
  },
  watch: {
    'sity.getSityId' () {
      location.reload()
    }
  },
  async asyncData ({ $axios, query }) {
    const ID = query.id
    const filtersList = await $axios.$get(
      'http://admin.996661-cn43153.tmweb.ru:1337/api/sub-categories/' +
        ID +
        '?populate[ttt][populate]=*'
    )

    return { filtersList }
  },
  computed: {
    sortedDealersApi () {
      if (this.demo.length) {
        return this.demo
      } else {
        return this.dealers.data
      }
    }
  },
  mounted () {}
}
</script>
<style>
/* .ymap-container{
  position: absolute;
  top: 0;
  right: 0;
} */
</style>
