<template>
  <div class="flex flex-col gap-8 pb-60">
    <nuxt-link to='/' class="flex items-center gap-4">
      <img
        src="~/assets/img/icons/mainBTN.svg"
        alt=""
        class="rounded-xl overflow-hidden rotate-180"
      />
      <div class="flex flex-col gap-1 items-start">
        <span class="font-bold text-sm uppercase">Майнинг</span>
        <h2 class="text-[#7854F7] text-5xl font-bold">ASIC</h2>
      </div>
    </nuxt-link>

    <div v-if="category !== undefined" class="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-10">
      <nuxt-link
        v-for="(item, i) in category.data.attributes.sub_categories.data"
        :key="i"
        class="border-[1px] rounded-xl bg-white anime min-h-[100px]  hover:shadow-md flex flex-col gap-2 p-4 justify-center items-center"
        :to="{ path: `/cat/` + item.attributes.URL, query: { id: item.id } }"
      >
        <img
          v-if="item.attributes.Img.data !== null"
          :src="
            `http://admin.996661-cn43153.tmweb.ru:1337` +
              item.attributes.Img.data.attributes.url
          "
          alt=""
           class="w-auto h-[80px] sm:h-[130px] object-cover"
        /> 
        <h3 class="font-semibold text-sm text-center">{{ item.attributes.Name }}</h3>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const CATEGORY_NAME = gql`
  query CATEGORY_NAME {
    category(id: 1) {
      data {
        attributes {
          Name
          sub_categories {
            data {
              attributes {
                Name
                URL
                Img {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              id
            }
          }
        }
        id
      }
    }
  }
`

export default {
  layout: 'main',
  apollo: {
    category: {
      query: CATEGORY_NAME,
      prefetch: true
    }
  }
}
</script>

<style></style>
