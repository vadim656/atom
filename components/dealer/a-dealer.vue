<template>
  <nuxt-link
    :to="`/company/` + company_url"
    class="flex flex-col justify-between gap-3  p-2 rounded-xl border-transparent  border-b-4 hover:border-[#7854F7] anime"
    :class="[
      dealer_data.VIP == true
        ? 'gradient text-white'
        : 'bg-white text-[#272D4E]'
    ]"
  >
    <div class="flex justify-start items-center gap-2">
      <h3
        class="font-medium text-sm truncate cursor-pointer "
        :class="[dealer_data.VIP == true ? 'text-white' : 'text-[#272D4E]']"
        :title="dealer_data.CompanyName"
      >
        {{ dealer_data.CompanyName }}
      </h3>
      <img
        v-if="dealer_data.VIP == true"
        src="~/assets/img/icons/vip.svg"
        alt=""
      />
    </div>
    <span class="text-xs font-normal line-clamp-2" :class="[dealer_data.VIP == true ? 'text-white' : 'text-[#94A2B3]']" v-html="dealer_data.CompanyDesc"></span>
    <!-- review -->
    <div class="flex gap-2 items-center">
      <img
        v-if="dealer_data.VIP == true"
        src="~/assets/img/icons/star_vip.svg"
        alt=""
      />
      <img v-else src="~/assets/img/icons/star_no_vip.svg" alt="" />
      <div v-if="reviewsSrednee !== 0" class="font-bold text-xs"   :class="[dealer_data.VIP == true ? 'text-white' : 'text-[#7854F7]']">
        {{ reviewsSrednee.toFixed(1) }}
      </div>
      <div
        v-else-if="dealer_data.reviews.data.length == 0"
        class=" text-xs"
        :class="[dealer_data.VIP == true ? 'text-white' : 'text-[#272D4E]/50']"
      >
        Нет отзывов
      </div>
      <div class=" text-xs" :class="[dealer_data.VIP == true ? 'text-white' : 'text-[#272D4E]/50']">
        ({{ dealer_data.reviews.data.length }})
      </div>
    </div>
    <!-- review -->
    <div class="flex justify-between items-center">
      <div class="text-xs flex gap-2  items-center " :class="[dealer_data.VIP == true ? 'text-white' : 'text-[#272D4E]']">
        <img
          v-if="dealer_data.VIP !== true"
          src="~/assets/img/icons/time_rab.svg"
          alt=""
        />
        <img v-else src="~/assets/img/icons/time_rab_vip.svg" alt="" />
        <span>с {{ dealer_data.StartTimeWork }}</span>
        <span>до {{ dealer_data.EndTimeWork }}</span>
      </div>
      <nuxt-link :to="`/company/` + company_url" class=""> </nuxt-link>
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
      data: [],
      reviewsSredneeValue: null
    }
  },
  methods: {
    getCoordToMap (e) {
      this.$emit('getCoordToMap', e)
    }
  },
  computed: {
    reviewsSrednee () {
      if (this.dealer_data.reviews.data.length) {
        return (
          this.dealer_data.reviews.data.reduce(
            (prev, user) => prev + user.attributes.Points,
            0
          ) / this.dealer_data.reviews.data.length
        )
      } else {
        return 0
      }

      // return this.dealer_data.reviews.data.reduce((prev, user) => prev + user.attributes.Points, 0) / this.dealer_data.reviews.data.length;
    }
  }
}
</script>

<style></style>
