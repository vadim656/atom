<template>
  <nuxt-link
  :to="`/company/` + company_url"
    class="flex flex-col justify-between gap-2  p-2 rounded-xl border-transparent  border-b-4 hover:border-[#7854F7] anime"
    :class="[
      dealer_data.VIP == true
        ? 'gradient text-white'
        : 'bg-white text-[#272D4E]'
    ]"
  >
    <div class="flex justify-start items-center gap-2">
      <h3
        class="font-bold text-sm truncate cursor-pointer"
        :title="dealer_data.CompanyName"
      >
        {{ dealer_data.CompanyName }}
        
      </h3>
      <img v-if="dealer_data.VIP == true" src="~/assets/img/icons/vip.svg" alt="">
    </div>
    <span class="text-xs line-clamp-2" v-html="dealer_data.CompanyDesc"></span>
    <div class="flex justify-between items-center">
      <div class="text-xs flex gap-2  items-end">
        <span>с {{ dealer_data.StartTimeWork }}</span>
        <span>до {{ dealer_data.EndTimeWork }}</span>
      </div>
      <nuxt-link
        :to="`/company/` + company_url"
        class=""
        >
        <!-- <img v-if="dealer_data.VIP == true" src="~/assets/img/icons/pre_dealer-vip.svg" alt="">
        <img v-else src="~/assets/img/icons/pre_dealer-notvip.svg" alt=""> -->
        </nuxt-link
      >
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    dealer_data: {
      type: Object
    },
    company_url: {
      type: String
    }
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    getCoordToMap (e) {
      this.$emit('getCoordToMap', e)
    }
  }
}
</script>

<style></style>
