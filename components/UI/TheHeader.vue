<template>
  <div class="w-full flex flex-col gap-4 h-full items-center justify-center">
    <a-header :sities="sities" />
    
  </div>
</template>

<script>
import AHeaderFilters from '../header-components/a-header-filters.vue'
import AHeaderTabs from '../header-components/a-header-tabs.vue'
import aHeader from '../header-components/a-header.vue'
export default {
  components: { aHeader, AHeaderTabs, AHeaderFilters },
  props: {
    sities: {
      type: Object
    },
    filter_mesto: {
      type: Object
    },
    filter_accessories: {
      type: Object
    }
  }
}
</script>

<style></style>
