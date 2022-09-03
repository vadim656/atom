<template>
  <div class="relative">
    <button
      @click="active = !active"
      class="flex items-center gap-3 bg-white rounded-md pl-4 pr-2 py-2 text-xs"
    >
      <span class="">{{ title }}</span>
      <img v-if="active == false" src="../../assets/img/icons/A-Icon-Menu.svg" alt="" />
      <img v-else src="../../assets/img/icons/A-Icon-Menu.svg" alt=""  class="rotate-90"/>
    </button>

    <div v-if="active == true" class="absolute top-9 left-0 w-full min-w-[200px] bg-white px-2 rounded-md shadow-md">
      <div class="flex flex-col gap-1 p-2" v-if="filter !== undefined">
        <div
          v-for="(item, i) in filter.data"
          :key="i"
          class=" py-1 cursor-pointer flex gap-1"
        >
          <input type="checkbox" />
          <label class="text-xs">{{ item.attributes.Name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      selected: 'F',
      active: false
    }
  }
}
</script>

<style></style>
