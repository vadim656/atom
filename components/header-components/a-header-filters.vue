<template>
  <div class=" w-full flex flex-wrap relative">
    <div class=" flex flex-wrap items-center gap-2">
      <!-- filter -->
      <div class="flex gap-2 flex-wrap">
        <div class="relative" v-for="(filter, i) in filters" :key="filter[0]">
          <!-- v-if="filter.data.length " -->
          <button
            
            @click="checekedFilterID(i)"
            class="flex items-center gap-1 bg-white rounded-full pl-4 pr-2 py-2 text-xs"
          >
            <span v-if="filter[0] =='accessories'" class="">Комплектующие</span>
            <span v-if="filter[0] =='repairs'" class="">Ремонт</span>
            <span v-if="filter[0] =='modernizations'" class="">Модернизация</span>
            <span v-if="filter[0] =='models'" class="">Модели</span>
            <img
              v-if="activeFilter !== i"
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
          <!-- filter dropdown -->
          <div
            v-if="activeFilter == i && active == true"
            class="absolute top-9 left-0 w-full min-w-[200px] bg-white px-2 rounded-xl shadow z-[99]"
          >
            <div
              class="flex flex-col gap-1 p-2"
              v-if="filter_accessories !== undefined"
            >
              <div
                v-for="(item, i) in filter[1].data"
                :key="i"
                class=" py-1 cursor-pointer flex gap-1"
              >
                <input
                  type="checkbox"
                  @click="getFilterName(filter[0], item.attributes.Name)"
                  :value="item.attributes.Name"
                  v-model="filter_accessoriesCheck"
                />
                <label class="text-xs">{{ item.attributes.Name }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- static button -->

      <!-- <nuxt-link
        v-if="this.$route.params.cat !== 'sborka-fermy'"
        to="/filter"
        class="bg-white px-4 rounded-full text-xs flex justify-center items-center py-2"
      >
        Прочие фильтры
      </nuxt-link> -->
      <!-- <button
        @click="getFilterMan(filter_accessoriesCheck)"
        class="bg-[#7854F7] text-white px-4 rounded-full text-xs py-2"
      >
        <span>Применить фильтры</span>
      </button> -->
    </div>
  </div>
</template>

<script>
import aFilterSelect from '../filters/a-filter-select.vue'
import gql from 'graphql-tag'
import { useSity } from '@/store'

export default {
  props: {
    filter_mesto: {
      type: Object
    },
    filter_accessories: {
      type: Object
    },
    filtersList: {
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
      filter_accessoriesCheck: [],
      active: false,
      activeFilter: null
    }
  },
  computed: {
    filters: function (){
      const newArr = Object.entries(this.filtersList.data.attributes.ttt).filter(x => x[1].data).filter(q => q[1].data.length)
      return newArr
    }
  },
  methods: {
    getFilterMan (data) {
      this.$emit('getFilterMan', data)
    },
    getFilterName(nameFilter, val){
      this.$emit('getFilterName', nameFilter, val)
    },
    checekedFilterID (i) {
      if (this.active == true && this.activeFilter == i) {
        this.active = false
        this.activeFilter = null
      } else {
        this.active = true
        this.activeFilter = i
      }
    }
  },
  watch: {
    filter_accessoriesCheck: function (data) {
      this.getFilterMan(data)
    }
  }
}
</script>

<style></style>
