<template>
<div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-5 grid-rows-3 gap-4">
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
          <input type="checkbox" v-model="manufacturersCheck" :value="item.attributes.Name"/>
          <label for="" class="text-sm">{{ item.attributes.Name }}</label>
        </div>
      </div>
    </div>

    <!-- Комплектующие -->

    <div
      class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-3"
    >
      <span class="font-semibold text-sm">Комплектующие:</span>
      <div class="flex flex-col gap-2" v-if="accessories !== undefined">
        <div v-for="(item, i) in accessories.data" :key="i" class="flex gap-1">
          <input type="checkbox" />
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
          <input type="checkbox" />
          <label for="" class="text-sm">{{ item.attributes.Name }}</label>
        </div>
      </div>
    </div>

    <!-- Размещение -->

    <div
      class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-3"
    >
      <span class="font-semibold text-sm flex flex-col gap-4">Размещение:</span>
      <div class="flex flex-col gap-2">
        <span class="text-xs text-[#212121]/70">Место</span>
        <div class="flex gap-4 w-full" v-if="razmechenieMestos !== undefined">
          <div
            v-for="(item, i) in razmechenieMestos.data"
            :key="i"
            class="flex gap-1"
          >
            <input type="checkbox" />
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
          <input type="checkbox" />
          <label for="" class="text-sm">{{ item.attributes.Name }}</label>
        </div>
      </div>
    </div>
    <!-- Наличие -->
    <!-- <div
      class="flex flex-col gap-4 p-4 rounded-md bg-white shadow-md col-span-1 row-span-1"
    >
      <span class="font-semibold text-sm">Наличие:</span>
      <div class="flex flex-col gap-2">
        <div class="flex gap-1">
          <input type="checkbox" />
          <label for="" class="text-sm">Есть</label>
        </div>
        <div class="flex gap-1">
          <input type="checkbox" />
          <label for="" class="text-sm">Под заказ</label>
        </div>
      </div>
    </div> -->
  </div>
  <div class="w-full flex justify-end gap-4">
      <button class="bg-[#FFDFB8] px-8 py-3 rounded-md">Применить фильтры</button>
      <nuxt-link to="/" class="bg-[#D9D9D9] px-8 py-3 rounded-md">Закрыть</nuxt-link>
  </div>
</div>
  
</template>

<script>
import gql from 'graphql-tag'

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
      manufacturersCheck: []
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
