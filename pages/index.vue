<template>
  <div class="grid grid-cols-12 gap-4 ">
    <a-header-filters
      :filter_accessories="accessories"
      @getFilterMan="getFilterMan"
      class="col-span-12"
    />
    <div
      class="col-span-7 grid grid-cols-3 gap-4  sm:overflow-y-auto sm:h-[600px]"
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
    <!-- <div v-else> Ничего нет</div> -->
    <div class="col-span-5 flex relative ">
      <div class="absolute top-0 w-full right-0 left-0  h-[400px]">
        <a-y-map
          v-if="dealers !== undefined"
          :ymap_data="dealers.data"
          :key="mapYandex"
        />
      </div>
    </div>
    <!-- {{ sities.data[0].attributes.dealers.data}} -->
  </div>
</template>

<script>
import aYMap from '../components/a-y-map.vue'
import ADealer from '../components/dealer/a-dealer.vue'
import gql from 'graphql-tag'
import { useSity } from '@/store'
import AHeaderFilters from '../components/header-components/a-header-filters.vue'

const ALL_DEALERS_SITY = gql`
  query ALL_DEALERS_SITY($ID: ID) {
    dealers(
      filters: { sity: { id: { eq: $ID } } }
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
          razmechenie_mestos {
            data {
              attributes {
                Name
              }
            }
          }
          manufacturers {
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
const ALL_DEALERS_SITY_FILTER = gql`
  query ALL_DEALERS_SITY_FILTER($ID: ID, $NAMEMAN: String) {
    dealers(
      filters: { sity: { id: { eq: $ID } } }
      sort: "VIP:desc"
      manufacturers: { Name: { in: [$NAMEMAN] } }

      pagination: { limit: 50 }
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
          razmechenie_mestos {
            data {
              attributes {
                Name
              }
            }
          }
          manufacturers {
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
  components: { aYMap, ADealer, AHeaderFilters },
  layout: 'main',
  apollo: {
    dealers: {
      query: ALL_DEALERS_SITY,
      prefetch: true,
      variables () {
        return {
          ID: this.sity.getSityId
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
  data () {
    return {
      mapYandex: 0,
      flterNesto: [],
      filterManufac: [],
      testResults: [],
      dddssss: []
    }
  },
  setup () {
    const sity = useSity()
    return { sity }
  },
  watch: {
    'sity.getSityId' () {
      this.mapYandex += 1
    }
  },
  methods: {
    async FilterDealers (data) {
      const searchInput = data
      console.log(data)
      try {
        const res = await this.$apollo.query({
          query: ALL_DEALERS_SITY_FILTER,
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
    getFilterMan (data) {
      const doneTest = []
      for (const value of data.values()) {
       doneTest.push(value)
      }

      const joindealres = doneTest.join('","').toString().replaceAll('\n' , '')
      this.FilterDealers(joindealres)
    }
  },
  computed: {}
}
</script>
