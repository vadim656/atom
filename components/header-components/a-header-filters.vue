<template>
  <div class="bg-[#FFDEB6] w-full flex gap-4 p-4 rounded-md">
    <a-filter-select 
    v-for="filter , i in filters"
    :key="i"
    :filter_data="filter"
    />
    <button class="bg-white px-4 rounded-md text-xs">
        <img src="../../assets/img/icons/Icon-Filter.svg" alt="">
    </button>
    <button class="flex items-center gap-1 bg-white px-4 rounded-md text-xs">
        <img src="../../assets/img/icons/A_Icon_map_mini.svg" alt="">
        <span class="">На карте</span>
    </button>
  </div>
</template>

<script>
import aFilterSelect from '../filters/a-filter-select.vue'
export default {
  components: { aFilterSelect },
  data () {
    return {
      filters: [
        {
          title: 'Производитель:'
        },
        {
          title: 'Модель:'
        },
        {
          title: 'Монета:'
        },
        {
          title: 'Наличие:'
        }
      ]
    }
  }
}
</script>

<style></style>
