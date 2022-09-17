<template>
  <div class=" w-full flex flex-wrap relative">
    <div class=" flex flex-wrap items-center gap-2">
      <!-- filter -->
      <div class="flex gap-2 flex-wrap">
        <button
          @click="$router.back()"
          class="bg-[#7854F7] text-white px-4 rounded-full text-xs flex gap-2 justify-center items-center py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-3 h-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>

          Назад
        </button>
        <div class="relative" v-for="(filter, i) in filters" :key="filter[0]">
          <!-- v-if="filter.data.length " -->
          <button
            @click="checekedFilterID(i)"
            class="flex items-center gap-1 bg-white rounded-full pl-4 pr-2 py-2 text-xs"
          >
            <span v-if="filter[0] == 'accessories'" class=""
              >Комплектующие</span
            >
            <span v-else-if="filter[0] == 'repairs'" class="">Ремонт</span>
            <span v-else-if="filter[0] == 'modernizations'" class=""
              >Модернизация</span
            >
            <span v-else-if="filter[0] == 'models'" class="">Модели</span>
            <span v-else-if="filter[0] == 'arenda_moshes'" class=""
              >Мощность (кВт)</span
            >
            <span v-else-if="filter[0] == 'arenda_ohranas'" class=""
              >Охрана</span
            >
            <span v-else-if="filter[0] == 'arenda_reserv_internets'" class=""
              >Резервный канал интернета</span
            >
            <span v-else-if="filter[0] == 'arenda_reserv_pitanies'" class=""
              >Резервный источник питания</span
            >
            <span v-else-if="filter[0] == 'locations'" class="">Локация</span>
            <span v-else-if="filter[0] == 'tip_rabots'" class=""
              >Тип работ</span
            >
            <span v-else-if="filter[0] == 'razmechenie_mestos'" class=""
              >Место</span
            >
            <span v-else-if="filter[0] == 'razmechenie_tip_fermies'" class=""
              >Тип фермы</span
            >
            <span v-else-if="filter[0] == 'asics'" class=""
              >Комплектующие ASIC</span
            >
            <span v-else-if="filter[0] == 'zap_repair_asics'" class=""
              >Запчасти для ремонта ASIC</span
            >
            <span v-else-if="filter[0] == 'services'" class=""
              >Обслуживание</span
            >
            <span v-else-if="filter[0] == 'sleaning_asics'" class=""
              >Чистка ASIC</span
            >
            <span v-else-if="filter[0] == 'zap_repair_asic_filters'" class=""
              >Ремонт ASIC</span
            >
            <span v-else class="">{{ filter[0] }}</span>
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
                  @click="
                    getFilterName(filter[0], item.attributes.Name, $event)
                  "
                  :value="item.attributes.Name"
                  :id="filter[0]"
                  :cheked="item.cheked"
                  v-model="filter_accessoriesCheck"
                />

                <label class="text-xs">{{ item.attributes.Name }}</label>
              </div>
              <button
                @click="resetFilters()"
                class="bg-[#7854F7] mt-4 pb-2 text-white px-4 rounded-full text-xs flex  justify-center items-center py-2"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
        </div>

        <!-- размешение + стоимость место -->
        <div
          v-if="
            this.$route.params.cat == 'razmeshhenie' ||
              this.$route.params.cat == 'razmeshhenie-asic'
          "
        >
          <div class="relative">
            <!-- v-if="filter.data.length " -->
            <button
              @click="checekedFilterID(122)"
              class="flex items-center gap-1 bg-white rounded-full pl-4 pr-2 py-2 text-xs"
            >
              <span class="">Тариф электроэнергии</span>

              <img
                v-if="activeFilter !== 122"
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
              v-if="activeFilter == 122 && active == true"
              class="absolute top-9 left-0 w-full min-w-[300px] bg-white px-2 rounded-xl shadow z-[99] p-4"
            >
              <div class="flex flex-col gap-4">
                <span class="text-xs text-[#212121]/70"
                  >Тариф электроэнергии
                </span>
                <div class="flex flex-col gap-4 w-full">
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    v-model="valueTarif"
                    class="w-full"
                  />
                  <div class="w-full flex justify-between gap-2 items-center">
                    <input
                      type="number"
                      v-model="valueTarif"
                      class="px-4 py-2 border-[1px] border-[#212121]/50 rounded-md w-1/2"
                    />
                    <span class="text-sm">До 30 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- размешение + аренда ячейки -->

        <div
          v-if="
            this.$route.params.cat == 'razmeshhenie' ||
              this.$route.params.cat == 'arenda-pomeshheniya-pod-asic'
          "
        >
          <div class="relative">
            <!-- v-if="filter.data.length " -->
            <button
              @click="checekedFilterID(123)"
              class="flex items-center gap-1 bg-white rounded-full pl-4 pr-2 py-2 text-xs"
            >
              <span class="">Мощность (кВт)</span>

              <img
                v-if="activeFilter !== 123"
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
              v-if="activeFilter == 123 && active == true"
              class="absolute top-9 left-0 w-full min-w-[300px] bg-white px-2 rounded-xl shadow z-[99] p-4"
            >
              <div class="flex flex-col gap-4">
                <span class="text-xs text-[#212121]/70">Мощность (кВт) </span>
                <div class="flex flex-col gap-4 w-full">
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    v-model="valueArenda"
                    class="w-full"
                  />
                  <div class="w-full flex justify-between gap-2 items-center">
                    <input
                      type="number"
                      v-model="valueArenda"
                      class="px-4 py-2 border-[1px] border-[#212121]/50 rounded-md w-1/2"
                    />
                    <span class="text-sm">До 100 000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aFilterSelect from '../filters/a-filter-select.vue'
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
      activeFilter: null,
      valueTarif: '3',
      valueArenda: '100',
      fullPathFilters: ''
    }
  },
  computed: {
    filters: function () {
      const newArr = Object.entries(this.filtersList.data.attributes.ttt)
        .filter(x => x[1].data)
        .filter(q => q[1].data.length)
      return newArr
    }
  },
  methods: {
    resetFilters () {
      this.filter_accessoriesCheck = []
      this.fullPathFilters = ''
      setTimeout(() => {
        this.active = false
      }, 500)
    },
    getFilterMan (data) {
      this.$emit('getFilterMan', data)
    },
    getFilterName (nameFilter, val, event) {
      if (event.target.checked) {
        this.$emit('getFilterName')
        this.fullPathFilters = this.fullPathFilters.concat([
          '&filters[' + [nameFilter] + '][Name][$in]=' + val
        ])

        this.$router.replace({
          path: this.$route.fullPath,
          query: {
            populate: '*' + this.fullPathFilters.toString()
          }
        })
      } else {
        delete this.$route.query.populate
      }
      console.log('295', this.fullPathFilters)
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
      if (this.filter_accessoriesCheck.length == 0) {
        this.fullPathFilters = ''
        this.$router.replace({
          path: this.$route.fullPath,
          query: {
            populate: '*'
          }
        })
        console.log('пусто')
      }
      this.getFilterMan(data)
    }
  },
  mounted () {}
}
</script>

<style>
input[type='range'] {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(#4f4f4f, #4f4f4f);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* Input Thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #4f4f4f;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #4f4f4f;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type='range']::-ms-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #ff4500;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type='range']::-webkit-slider-thumb:hover {
  background: #242424;
}

input[type='range']::-moz-range-thumb:hover {
  background: #242424;
}

input[type='range']::-ms-thumb:hover {
  background: #242424;
}
</style>
