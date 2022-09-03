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
          title: 'Майнинг на GPU:',
          url: '/',
          submenu: [
            {
              title: 'Комплектующие',
              url: '/'
            },
            {
              title: 'Сборка фермы',
              url: '/'
            },
            {
              title: 'Настройка фермы',
              url: '/'
            },
            {
              title: 'Ремонт фермы',
              url: '/'
            },
            {
              title: 'Модернизация',
              url: '/'
            },
            {
              title: 'Выкуп фермы',
              url: '/'
            },
            {
              title: 'Обслуживание фермы',
              url: '/'
            },
            {
              title: 'Размещение',
              url: '/'
            },
            {
              title: 'Аренда помещения',
              url: '/'
            }
          ]
        },
        {
          title: 'Майнинг на ASIC:',
          url: '/',
          submenu: [
            {
              title: 'Купить ASIC',
              url: '/'
            },
            {
              title: 'Комплектующие',
              url: '/'
            },
            {
              title: 'Запчасти для ремонта',
              url: '/'
            },
            {
              title: 'Обслуживание',
              url: '/'
            },
            {
              title: 'Ремонт',
              url: '/'
            },
            {
              title: 'Настройка',
              url: '/'
            },
            {
              title: 'Выкуп',
              url: '/'
            },
            {
              title: 'Размещение',
              url: '/'
            },
            {
              title: 'Аренда помещения для майнинга на ASIC',
              url: '/'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style></style>
