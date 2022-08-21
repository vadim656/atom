<template>
  <div
    class="container grid grid-cols-12 gap-4 grid-rows-[auto,1fr,1fr,1fr,1fr] "
  >
    <the-sidebar class="col-span-2 row-span-6 border-2 bg-neutral-200" />
    <the-header class="col-span-10 row-span-1  " />

    <div class="col-span-6">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from '../components/UI/TheHeader.vue'
import TheSidebar from '../components/UI/TheSidebar.vue'
export default {
  components: { TheHeader, TheSidebar }
}
</script>

<style></style>
