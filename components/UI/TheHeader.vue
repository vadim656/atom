<template>
  <div class="w-full flex flex-col gap-4 h-full items-center justify-center">
    <a-header/>
    <a-header-tabs/>
    <a-header-filters/>
  </div>
</template>

<script>
import AHeaderFilters from '../header-components/a-header-filters.vue'
import AHeaderTabs from '../header-components/a-header-tabs.vue'
import aHeader from '../header-components/a-header.vue'
export default {
  components: { aHeader, AHeaderTabs, AHeaderFilters },}
</script>

<style></style>
