<template>
  <div class="bg-[#FFDEB6] w-full flex gap-4 p-4 rounded-md ">
    <a-filter-select
      :filter="filter_mesto"
      title="Размещение"
    />
    <a-filter-select
      :filter="filter_accessories"
      title="Комплектующие"
    />
    <button class="bg-white px-4 rounded-md text-xs">
      <img src="../../assets/img/icons/Icon-Filter.svg" alt="" />
    </button>
    <button class="bg-white px-4 rounded-md text-xs">
      <span>Применить фильры</span>
    </button>
    <button class="flex items-center gap-1 bg-white px-4 rounded-md text-xs">
      <img src="../../assets/img/icons/A_Icon_map_mini.svg" alt="" />
      <span class="">На карте</span>
    </button>
  </div>
</template>

<script>
import aFilterSelect from '../filters/a-filter-select.vue'




export default {
  props: {
    filter_mesto: {
      type: Object
    },
    filter_accessories: {
      type: Object
    }
  },
  components: { aFilterSelect },
  data () {
    return {
      filters: [
        {
          title: 'Производитель:'
        },
        {
          title: 'Размещение:'
        },
        {
          title: 'Монета:'
        }
      ]
    }
  },
  methods: {
    getFilters () {
      console.log('tut')
    }
  },
  mounted () {
    this.getFilters()
  }
}
</script>

<style></style>
