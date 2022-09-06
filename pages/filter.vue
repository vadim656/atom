<template>
<div class="flex flex-col gap-10">
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-5 grid-rows-3 gap-4">
      <!-- Комплектующие -->

      <div
        class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-3"
      >
        <span class="font-semibold text-sm">Комплектующие:</span>
        <div class="flex flex-col gap-2" v-if="accessories !== undefined">
          <div
            v-for="(item, i) in accessories.data"
            :key="i"
            class="flex gap-1"
          >
            <input
              type="checkbox"
              v-model="accessoriesCheck"
              :value="item.attributes.Name"
            />
            <label for="" class="text-sm">{{ item.attributes.Name }}</label>
          </div>
        </div>
      </div>

      <!-- Производитель -->

      <div
        class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-3"
      >
        <span class="font-semibold text-sm">Производитель:</span>
        <div class="flex flex-col gap-2" v-if="manufacturers !== undefined">
          <div
            v-for="(item, i) in manufacturers.data"
            :key="i"
            class="flex gap-1"
          >
            <input
              type="checkbox"
              v-model="manufacturersCheck"
              :value="item.attributes.Name"
            />
            <label for="" class="text-sm">{{ item.attributes.Name }}</label>
          </div>
        </div>
      </div>

      <!-- Модель -->

      <div
        class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-3"
      >
        <span class="font-semibold text-sm">Модель:</span>
        <div class="flex flex-col gap-2" v-if="models !== undefined">
          <div v-for="(item, i) in models.data" :key="i" class="flex gap-1">
            <input
              type="checkbox"
              v-model="modelsCheck"
              :value="item.attributes.Name"
            />
            <label for="" class="text-sm">{{ item.attributes.Name }}</label>
          </div>
        </div>
      </div>

      <!-- Размещение -->

      <div
        class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-3"
      >
        <span class="font-semibold text-sm flex flex-col gap-4"
          >Размещение:</span
        >
        <div class="flex flex-col gap-2">
          <span class="text-xs text-[#212121]/70">Место</span>
          <div class="flex gap-4 w-full" v-if="razmechenieMestos !== undefined">
            <div
              v-for="(item, i) in razmechenieMestos.data"
              :key="i"
              class="flex gap-1"
            >
              <input
                type="checkbox"
                v-model="razmechenieMestosCheck"
                :value="item.attributes.Name"
              />
              <label for="" class="text-sm">{{ item.attributes.Name }}</label>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <span class="text-xs text-[#212121]/70">Тариф электроэнергии </span>
          <div class="flex flex-col gap-4 w-full">
            <input
              type="range"
              min="3"
              max="30"
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
        <div class="flex flex-col gap-4">
          <span class="text-xs text-[#212121]/70">Аренда ячейки </span>
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
              <span class="text-sm">До 100 000 ₽</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Монета -->

      <div
        class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-2"
      >
        <span class="font-semibold text-sm">Монета:</span>
        <div class="flex flex-col gap-2" v-if="monetas !== undefined">
          <div v-for="(item, i) in monetas.data" :key="i" class="flex gap-1">
            <input
              type="checkbox"
              v-model="monetasCheck"
              :value="item.attributes.Name"
            />
            <label for="" class="text-sm">{{ item.attributes.Name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-end gap-4">
      <button @click="getFilter" class="bg-[#FFDFB8] px-8 py-3 rounded-md">
        Применить фильтры
      </button>
      <nuxt-link to="/" class="bg-[#D9D9D9] px-8 py-3 rounded-md"
        >Закрыть</nuxt-link
      >
    </div>
  </div>
  <div class="grid grid-cols-12 gap-4">
    <div
      class="col-span-7 grid grid-cols-3 gap-4  sm:overflow-y-auto sm:h-[600px]"
      v-if="resultFilters !== undefined "
    >
      <a-dealer
        v-for="dealer in resultFilters.data"
        :key="dealer.id"
        :dealer_data="dealer.attributes"
        :company_url="dealer.id"
        class="max-h-[130px]"
      />
    </div>
    <div v-else>Ничего не нашлось</div>
    <div class="col-span-5 flex relative ">
      <div class="absolute top-0 w-full right-0 left-0  h-[400px]">
        <a-y-map
          v-if="resultFilters.data !== undefined "
          :ymap_data="resultFilters.data"
          :key="mapYandex"
        />
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import gql from 'graphql-tag'
import aDealer from '../components/dealer/a-dealer.vue'
import AYMap from '../components/a-y-map.vue'

const MAN_FILTERS = gql`
  query MAN_FILTERS {
    manufacturers {
      data {
        attributes {
          Name
          Active
        }
      }
    }
  }
`

const MODEL_FILTERS = gql`
  query MODEL_FILTERS {
    models {
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

const MONETA_FILTERS = gql`
  query MONETA_FILTERS {
    monetas {
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
  components: { aDealer, AYMap },
  layout: 'main',
  apollo: {
    manufacturers: {
      query: MAN_FILTERS,
      prefetch: true
    },
    models: {
      query: MODEL_FILTERS,
      prefetch: true
    },
    accessories: {
      query: ACCES_FILTERS,
      prefetch: false
    },
    razmechenieMestos: {
      query: MESTO_FILTERS,
      prefetch: false
    },
    monetas: {
      query: MONETA_FILTERS,
      prefetch: false
    }
  },
  data () {
    return {
      valueTarif: 3,
      valueArenda: 100,
      doneZap: '',
      mapYandex: 0,
      manufacturersCheck: [],
      accessoriesCheck: [],
      modelsCheck: [],
      razmechenieMestosCheck: [],
      monetasCheck: [],
      resultFilters: []
    }
  },
  methods: {
    getFilter () {
      let qsDD = '?'
      if (this.manufacturersCheck.length > 0) {
        for (let key in this.manufacturersCheck) {
          qsDD +=
            'filters[manufacturers][Name][$in]=' +
            this.manufacturersCheck[key] +
            '&'
        }
      }
      if (this.accessoriesCheck.length > 0) {
        for (let key in this.accessoriesCheck) {
          qsDD +=
            'filters[accessories][Name][$in]=' +
            this.accessoriesCheck[key] +
            '&'
        }
      }
      if (this.modelsCheck.length > 0) {
        for (let key in this.modelsCheck) {
          qsDD += 'filters[models][Name][$in]=' + this.modelsCheck[key] + '&'
        }
      }
      if (this.razmechenieMestosCheck.length > 0) {
        for (let key in this.razmechenieMestosCheck) {
          qsDD +=
            'filters[razmechenie_mestos][Name][$in]=' +
            this.razmechenieMestosCheck[key] +
            '&'
        }
      }
      if (this.monetasCheck.length > 0) {
        for (let key in this.monetasCheck) {
          qsDD += 'filters[monetas][Name][$in]=' + this.monetasCheck[key] + '&'
        }
      }
      this.fetchDialers(qsDD)
    },
    async fetchDialers (filter) {
      console.log(filter)

      const res = await this.$axios.$get('http://admin.996661-cn43153.tmweb.ru:1337/api/dealers' + filter, {
        params: {
          populate: '*'
        }
      })
      this.resultFilters = res
    }
  }
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
