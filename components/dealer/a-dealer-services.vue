<template>
  <div class="bg-white shadow-md rounded-md p-4">
    <div class="flex flex-col gap-2">
      <h4 class="font-semibold">{{ title }}</h4>
      <ul class="flex flex-col gap-1 list-disc list-inside">
        <li v-for="(item, i) in data_service.data" :key="i">
          {{ item.attributes.Name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    data_service: Object
  }
}
</script>

<style></style>
