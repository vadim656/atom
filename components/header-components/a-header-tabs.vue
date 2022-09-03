<template>
  <div class="flex w-full justify-start gap-4 bg-neutral-200 py-6 px-4 rounded-md">
    <div class="" v-for="(item, i) in categories.data" :key="i">
      <NuxtLink
        :to="'/cat/' + item.attributes.URL"
        class="text-sm py-[10px] px-[12px] rounded-md"
      >
        {{ item.attributes.Name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import allCat from '../../apollo/queries/categories/all-cat.gql'

export default {
  apollo: {
    categories: {
      query: allCat,
      prefetch: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style></style>
