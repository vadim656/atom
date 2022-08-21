<template>
  <div>
    <button class="flex items-center gap-3 bg-white rounded-md pl-4 pr-2 py-2 text-xs">
      <span class="">{{ filter_data.title }}</span>
      <img src="../../assets/img/icons/A-Icon-Menu.svg" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filter_data: {
      type: Object
    }
  }
}
</script>

<style></style>
