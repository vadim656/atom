<template>
  <div class="w-full justify-between flex items-center">
    <div>
      <nuxt-link to="/">LOGO</nuxt-link>
    </div>
    <div @click="modal = true" class="cursor-pointer">
      Выберите город: <span class="font-semibold">{{ sity.sity }}</span>
    </div>

    <div class="relative flex items-center">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Поиск по сайту..."
        class="shadow-sm border-[1px] block w-full pr-12 px-4 py-2 sm:text-sm border-gray-300 rounded-md"
      />
      <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd class="inline-flex items-center text-sm text-gray-400">
          <img src="../../assets/img/icons/A-Icon-Search.svg" alt="" />
        </kbd>
      </div>
    </div>

    <div class="flex gap-2 items-center text-base">
      МЕНЮ
      <img src="../../assets/img/icons/menu-desc.svg" alt="" />
    </div>
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

export default {
  props: {
    sities: {
      type: Object
    }
  },
  data () {
    return {
      selectedSity: 'Москва',
      modal: false
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
