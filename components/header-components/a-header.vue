<template>
  <div class="w-full justify-between grid grid-cols-6 grid-rows-2 gap-4 items-center">
    <div class="flex gap-4 items-center justify-between col-span-6 row-span-1">
      <div>
      <nuxt-link to="/">LOGO</nuxt-link>
    </div>
    <div @click="modal = true" class="cursor-pointer">
      Выберите город: <span class="font-semibold">{{ sity.sity }}</span>
    </div>
    </div>
    

    

    <!-- <div class="flex gap-2 items-center justify-end text-base col-span-2 sm:col-span-4">
      МЕНЮ
      <img src="../../assets/img/icons/menu-desc.svg" alt="" />
    </div> -->
    <div
      v-if="modal == true"
      @click="modal = false"
      class="fixed w-screen h-screen top-0 left-0 right-0 z-[99] bg-[#212121]/70  backdrop-blur-sm flex justify-center items-center"
    >
      <div
        @click="modal = true"
        class=" absolute   bg-white p-4 rounded-md flex justify-center items-center z-[999]"
      >
        <div class="flex flex-col gap-8">
          Выберите город:
          <div class="grid gap-4">
            <div
              v-for="(item, i) in sities.data"
              :key="i"
              class="border-[1px] border-[#212121]/50 px-4 py-2 cursor-pointer flex justify-center items-center"
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
import { mapState  } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
import gql from 'graphql-tag'

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
      search: ''
    }
  },
  setup() {
    const sity = useSity()
    return { sity }
  },
  methods: {
  }
}
</script>

<style></style>
