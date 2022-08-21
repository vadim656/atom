<template>
  <div class="flex w-full justify-start gap-4 bg-neutral-200 p-4 rounded-md">
    <div class="" v-for="(item, i) in mainNav" :key="i">
      <div :class="item.active == true ? 'bg-white' : ''" class="px-4 py-2 rounded-md">
        <NuxtLink :to="item.url" class="text-sm">
          {{ item.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainNav: [
        {
          url: '/',
          title: 'Новые видеокарты',
          active: true
        },
        {
          url: '/',
          title: 'Б/У видеокарты',
          active: false
        },
        {
          url: '/',
          title: 'Ремонт',
          active: false
        },
        {
          url: '/',
          title: 'Аренда оборудования',
          active: false
        }
      ]
    }
  }
}
</script>

<style></style>
