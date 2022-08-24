<template>
  <div 
  class="flex flex-col justify-center gap-2  p-2 rounded-md" 
  :class="[dealer_data.attributes.VIP == true ? 'bg-[#FFDFB8]' : 'bg-[#E0E0E0]']"
  > 
      <!-- {{ dealer_data.attributes.CompanyName }} -->
      <div class="flex justify-between items-start">
          <h3 class="font-bold text-sm">{{ dealer_data.attributes.CompanyName }} </h3>
          <span class="text-xs"> с {{ dealer_data.attributes.StartTimeWork }} до {{ dealer_data.attributes.EndTimeWork }} </span>
      </div>
      <span class="text-xs">{{ dealer_data.attributes.Coordinates }} </span>
      <div class="flex justify-between items-end">
          <button class="flex gap-1 items-center">
              <img src="../../assets/img/icons/Icon-feather-map-pin.svg" alt="">
              На карте</button>
          <nuxt-link :to="`/company/` + dealer_data.id" class="underline-dark-500">Подробнее</nuxt-link>
      </div>
      
    </div>
</template>

<script>
export default {
  props: {
    dealer_data: {
      type: Object
    }
  },
  data () {
    return {
      data: []
    }
  }
}
</script>

<style></style>
