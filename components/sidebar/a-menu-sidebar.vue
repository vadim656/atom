<template>
  <div>
    <ul>
      <li v-for="(link, i) in sidebarMenu" :key="i">
        <nuxt-link :to="link.url">{{ link.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sidebarMenu: [
        {
          title: 'Меню',
          url: '/'
        },
        {
          title: 'Меню',
          url: '/'
        },
        {
          title: 'Меню',
          url: '/'
        },
        {
          title: 'Меню',
          url: '/'
        }
      ]
    }
  }
}
</script>

<style></style>
