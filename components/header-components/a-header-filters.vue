<template>
  <div
    class="bg-[#FFDEB6] w-full flex flex-wrap  gap-4 p-4 rounded-md relative"
  >
    <div class=" flex items-center">
      <div class=" flex items-center relative">
        <input
          @input="searchHeader($event.target.value)"
          v-bind:value="searchInput"
          type="text"
          id="search"
          placeholder="Поиск по сайту..."
          class="shadow-sm    block w-full pr-12 px-4 py-2 sm:text-sm  rounded-md z-[100]"
        />
        <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 z-[101]">
          <kbd class="inline-flex items-center text-sm text-gray-400">
            <img
              src="../../assets/img/icons/A-Icon-Search.svg"
              alt=""
              class="w-5 h-5"
            />
          </kbd>
        </div>
      </div>
      <!-- выдача поиска -->
      <div
        class="fixed z-[9] w-screen h-screen bg-neutral-400/20 top-0 left-0 "
        @click="searchResultsView = false"
        v-if="searchResultsView == true"
      ></div>
      <!-- выдача поиска end -->
      <div
        class="absolute z-[99] top-20 left-0 bg-white  rounded-md shadow-md w-full  overflow-hidden"
        v-if="
          searchInput.length >= 3 &&
            searchResults.data !== undefined &&
            searchResultsView == true
        "
      >
        <div class="flex flex-col" v-if="searchResults.data.length >= 1">
          <div
            v-for="(item, i) in sortSearch"
            :key="i"
            class=" border-b-[1px] py-3 px-4"
            :class="[
              item.attributes.VIP == true ? 'bg-[#FFDEB6]/30' : 'bg-white'
            ]"
          >
            <div class="grid grid-cols-7 gap-4 items-center">
              <h4
                @click="routeSearchResult(item.id)"
                class="font-semibold col-span-2 cursor-pointer"
                :class="[
                  item.attributes.VIP == true ? 'text-md' : 'text-normal'
                ]"
              >
                {{ item.attributes.CompanyName }}
              </h4>
              <div
                class="flex gap-4 text-xs col-span-3"
                v-if="item.attributes.categories.data.length"
              >
                <span
                  v-for="(attr, i) in item.attributes.categories.data"
                  :key="i"
                  @click="routeSearchResult(null)"
                  class="px-3 py-1 bg-[#FFDEB6] rounded-md hover:bg-[#fdd19b] cursor-pointer"
                  >{{ attr.attributes.Name }}</span
                >
              </div>
              <div class="text-xs flex flex-col gap-2 col-span-2">
                <span class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {{ item.attributes.Adress }}</span
                >
                <span class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ item.attributes.StartTimeWork }} до
                  {{ item.attributes.EndTimeWork }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div v-else class="py-3 flex justify-center items-center">
          Ничего не найдено
        </div>
      </div>
    </div>
    <!-- filter1 -->

    
    <!-- filter -->


    <div class="relative">
      <button
        @click="active = !active"
        class="flex items-center gap-3 bg-white rounded-md pl-4 pr-2 h-9 text-xs"
      >
        <span class="">Комплектация</span>
        <img
          v-if="active == false"
          src="../../assets/img/icons/A-Icon-Menu.svg"
          alt=""
        />
        <img
          v-else
          src="../../assets/img/icons/A-Icon-Menu.svg"
          alt=""
          class="rotate-90"
        />
      </button>

      <div
        v-if="active == true"
        class="absolute top-9 left-0 w-full min-w-[200px] bg-white px-2 rounded-md shadow-md"
      >
        <div
          class="flex flex-col gap-1 p-2"
          v-if="filter_accessories !== undefined"
        >
          <div
            v-for="(item, i) in filter_accessories.data"
            :key="i"
            class=" py-1 cursor-pointer flex gap-1"
          >
            <input
              type="checkbox"
              :value="item.attributes.Name"
              v-model="filter_accessoriesCheck"
            />
            <label class="text-xs">{{ item.attributes.Name }}</label>
          </div>
        </div>
      </div>
    </div>

    <nuxt-link
      to="/filter"
      class="bg-white px-4 rounded-md text-xs flex justify-center items-center"
    >
      <img src="../../assets/img/icons/Icon-Filter.svg" alt="" />
    </nuxt-link>
    <button @click="getFilterMan(filter_accessoriesCheck)" class="bg-white px-4 rounded-md text-xs py-2">
      <span>Применить фильры</span>
    </button>
  </div>
</template>

<script>
import aFilterSelect from '../filters/a-filter-select.vue'
import gql from 'graphql-tag'
import { useSity } from '@/store'

const SEARCH_HEADER = gql`
  query SEARCH_HEADER($TAGS: String, $SITY: String) {
    dealers(
      filters: {
        sity: { Name: { eq: $SITY } }
        or: [{ Tags: { containsi: $TAGS } }]
      }
    ) {
      data {
        attributes {
          CompanyName
          Adress
          StartTimeWork
          EndTimeWork
          VIP
          categories {
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
  props: {
    filter_mesto: {
      type: Object
    },
    filter_accessories: {
      type: Object
    }
  },
  setup () {
    const sity = useSity()
    return { sity }
  },
  components: { aFilterSelect },
  data () {
    return {
      searchInput: '',
      loading: true,
      searchResults: [],
      searchResultsView: false,
      filter_accessoriesCheck: [],
      active: false
    }
  },
  methods: {
    getFilterMan(data){
      console.log('tut getFilterMan');
      this.$emit('getFilterMan', data)
    },
    async searchHeader (value) {
      this.searchInput = value
      const lowerCase = value.toLowerCase()

      try {
        const res = await this.$apollo.query({
          query: SEARCH_HEADER,
          variables: {
            TAGS: lowerCase,
            SITY: this.sity.getSityName
          }
        })

        if (res) {
          this.loading = false
          const { dealers } = res.data
          this.searchResults = dealers
          this.searchResultsView = true
        }
      } catch (err) {
        this.loading = false
        this.searchResults = []
      }
    },
    routeSearchResult (id) {
      if (id !== null) {
        this.$router.push({
          path: '/company/' + id
        })
      }

      this.searchResultsView = false
    }
  },
  computed: {
    sortSearch () {
      return this.searchResults.data.sort(x => (x.attributes.VIP ? -1 : 1))
    }
  },
  watch: {
    'sity.getSityName' () {
      this.searchInput = ''
    }
  }
}
</script>

<style></style>
