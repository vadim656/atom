<template>
  <div 
  class="flex flex-col justify-center gap-2  p-2 rounded-md" 
  :class="[dealer_data.VIP == true ? 'bg-[#FFDFB8]' : 'bg-[#E0E0E0]']"
  > 
      
      <div class="flex justify-between items-start">
          <h3 class="font-bold text-sm truncate cursor-pointer" :title="dealer_data.CompanyName">{{ dealer_data.CompanyName }} </h3>
          <span class="text-xs"> с {{ dealer_data.StartTimeWork }} до {{ dealer_data.EndTimeWork }} </span>
      </div>
      <span class="text-xs line-clamp-2">{{ dealer_data.CompanyDesc }} </span>
      <div class="flex justify-between items-end">
          <!-- <button class="flex gap-1 items-center" @click="getCoordToMap(dealer_data.Coordinates)">
              <img src="../../assets/img/icons/Icon-feather-map-pin.svg" alt="">
              На карте</button> -->
          <nuxt-link :to="`/company/` + company_url" class="underline-dark-500 font-semibold text-sm">Подробнее</nuxt-link>
      </div>
      
    </div>
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
    getCoordToMap(e){
      this.$emit("getCoordToMap" , e)
    }
  }
}
</script>

<style></style>
