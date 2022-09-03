<template>
  <div
    class="container grid grid-cols-12 gap-4 grid-rows-[auto,1fr,1fr,1fr,1fr] relative"
  >
    <!-- <the-sidebar class="col-span-2 row-span-6 border-2 bg-neutral-200  " /> -->
    <the-header
      class="bg-white col-span-12 row-span-1  sticky top-0 pt-4 z-[9999999999999]"
      :sities="sities"
      :filter_mesto="razmechenieMestos"
      :filter_accessories="accessories"
    />

    <div class="col-span-12">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from '../components/UI/TheHeader.vue'
import TheSidebar from '../components/UI/TheSidebar.vue'
import gql from 'graphql-tag'

const SET_SITY = gql`
  query SET_SITY {
    sities {
      data {
        attributes {
          Name
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
  components: { TheHeader, TheSidebar },
  apollo: {
    sities: {
      query: SET_SITY,
      prefetch: true
    },
    razmechenieMestos: {
      query: MESTO_FILTERS,
      prefetch: false
    },
    accessories: {
      query: ACCES_FILTERS,
      prefetch: false
    }
  }
}
</script>

<style></style>
