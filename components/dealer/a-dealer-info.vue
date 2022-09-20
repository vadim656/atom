<template>
  <div class="flex flex-col gap-4 ">
    <div
      class="flex flex-col sm:flex-row gap-2 sm:gap-0 items-start justify-between"
    >
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <img v-if="dealer_info.attributes.Logo.data  !== null" :src="`http://admin.996661-cn43153.tmweb.ru:1337` +  dealer_info.attributes.Logo.data.attributes.url" alt="" />
        <h1 class="font-bold text-4xl">
          {{ dealer_info.attributes.CompanyName }}
        </h1>
      </div>
    </div>
    <p v-html="dealer_info.attributes.CompanyDescNew"></p>
    <div>
      <!-- MoreInfo -->
      <div class="bg-white px-4 rounded-xl flex flex-col" v-if="dealer_info.attributes.MoreInfo !== null">
        <div class="font-bold py-4">О {{ dealer_info.attributes.CompanyName }} </div>
        <div v-for="(item, i) in dealer_info.attributes.MoreInfo" :key="i">
          <div
            class="w-full flex justify-between border-b-2 border-[#EEF5FF] py-4 text-xs sm:text-base"
          >
            <span class="text-[#94A2B3]">{{ item.LeftText }}</span>
            <span class="font-bold text-[#272D4E]">{{ item.RightText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dealer_info: Object
  }
}
</script>

<style></style>
