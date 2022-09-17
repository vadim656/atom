<template>
  <div class="w-full justify-between grid grid-cols-6  gap-4 items-center">
    <div class="flex gap-4 items-center justify-between col-span-6 ">
      <div class="flex items-center gap-4">
        <nuxt-link class="font-bold text-2xl" to="/"
          ><img src="../../assets/img/icons/Logo.svg" alt=""
        /></nuxt-link>
        <span class="text-sm"
          >Сайт-каталог занимающихся продажей, ремонтом,<br />
          размещением и настройкой оборудования.</span
        >
      </div>
      <div class=" flex items-center relative">
        <input
          @input="searchHeader($event.target.value)"
          v-bind:value="searchInput"
          type="text"
          id="search"
          placeholder="Поиск"
          class="shadow    block w-full pr-12 pl-8 py-2 sm:text-sm  rounded-full z-[100]"
        />
        <div class="absolute inset-y-0 left-2 flex py-1.5 pr-1.5 z-[101]">
          <kbd class="inline-flex items-center text-sm text-[#BCBCBC]">
            <img
              src="~/assets/img/icons/A-Icon-Search.svg"
              alt=""
              class="w-5 h-5 "
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
                class="flex gap-4 text-xs col-span-4"
                v-if="item.attributes.categories.data.length"
              >
                <span
                  v-for="(attr, i) in item.attributes.categories.data"
                  :key="i"
                  @click="routeSearchResult(null)"
                  class="px-4 py-2 bg-[#7854F7] rounded-full text-white  cursor-pointer"
                  >{{ attr.attributes.Name }}</span
                >
              </div>
              <div class="text-xs flex flex-col gap-2  col-span-1 justify-end items-start">
                <div class="flex flex-col gap-2">
                  <a :href="`tel:${item.attributes.Phone}`" class="flex items-center gap-2">
                  <img src="~/assets/img/icons/Phone_light.svg" alt="" class="w-4 h-4">
                  {{ item.attributes.Phone }}</a
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
        </div>
        <div v-else class="py-3 flex justify-center items-center">
          Ничего не найдено
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <div
          @click="modal = true"
          class="cursor-pointer flex bg-[#7854F7] rounded-full px-4 py-2 gap-1 items-center"
        >
          <img src="~/assets/img/icons/sity-ico.svg" alt="" /><span
            class="text-white"
            >{{ sity.sity }}</span
          >
        </div>
        <div class="flex items-center gap-2">
          <img src="~/assets/img/icons/vk.svg" class="" alt="" />
          <img src="~/assets/img/icons/telegram.svg" class="" alt="" />
        </div>
      </div>
    </div>

    <div
      v-if="modal == true"
      @click="modal = false"
      class="fixed w-screen h-screen top-0 left-0 right-0 z-[99999999999] bg-[#212121]/70  backdrop-blur-sm flex justify-center items-center"
    >
      <div
        @click="modal = true"
        class=" absolute   bg-white p-4 rounded-md flex justify-center items-center z-[999]"
      >
        <div class="flex">

          <div class="flex flex-col items-start ">
            <div
              v-for="(item, i) in sities.data"
              :key="i"
              class=" px-2 py-2 cursor-pointer flex justify-center items-center border-b-[1px] border-[#EEF5FF]"
              @click="sity.SetSityData(item)"
            >
              {{ item.attributes.Name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSity } from '@/store'
import gql from 'graphql-tag'

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
          Phone
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

const SEARCH = gql`
  query($NAME: String) {
    dealers(filters: { models: { Name: { containsi: $NAME } } }) {
      data {
        attributes {
          CompanyName
          CompanyDesc
          models {
            data {
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`

export default {
  props: {
    sities: {
      type: Object
    }
  },
  data () {
    return {
      selectedSity: 'Москва',
      modal: false,
      search: '',
      searchInput: '',
      loading: true,
      searchResults: [],
      searchResultsView: false,
      active: false
    }
  },
  setup () {
    const sity = useSity()
    return { sity }
  },
  methods: {
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
