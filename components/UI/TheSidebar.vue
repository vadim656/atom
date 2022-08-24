<template>
  <div class="flex flex-col gap-4 px-4">
    <a-logo/>
    <a-menu-sidebar/>
  </div>
</template>

<script>
import ALogo from '../sidebar/a-logo.vue'
import aMenuSidebar from '../sidebar/a-menu-sidebar.vue'
export default {
  components: { aMenuSidebar, ALogo },}
</script>

<style></style>

ALogo