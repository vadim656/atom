<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex w-full  flex-col gap-10 col-span-1">
      <a-dealer-info :dealer_info="dealer" class="" />
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 ">
        <a-dealer-services
          v-if="dealer.attributes.farms.data.length"
          title="Комплектующие"
          :data_service="dealer.attributes.farms"
        />
        <a-dealer-services
          v-if="dealer.attributes.repairs.data.length"
          title="Ремонт фермы"
          :data_service="dealer.attributes.repairs"
        />
        <a-dealer-services
          v-if="dealer.attributes.services.data.length"
          title="Обслуживание"
          :data_service="dealer.attributes.services"
        />
        <a-dealer-services
          v-if="dealer.attributes.modernizations.data.length"
          title="Модернизация"
          :data_service="dealer.attributes.modernizations"
        />

        <a-dealer-services
          v-if="dealer.attributes.asics.data.length"
          title="Комплектующие ASIC"
          :data_service="dealer.attributes.asics"
        />
        <a-dealer-services
          v-if="dealer.attributes.razmechenie_mestos.data.length"
          title="Размещение"
          :data_service="dealer.attributes.razmechenie_mestos"
        />
        <a-dealer-services
          v-if="dealer.attributes.farms.data.length"
          title="Фермы"
          :data_service="dealer.attributes.farms"
        />
        <a-dealer-services
          v-if="dealer.attributes.manufacturers.data.length"
          title="Производители"
          :data_service="dealer.attributes.manufacturers"
        />
      </div>
    </div>

    <a-ymap-dealer
      :ymap_data="dealer.attributes"
      :titleCompany="dealer.attributes.CompanyName"
      class="col-span-1 rounded-[70px] overflow-hidden bg-[#FFFFFF]/25 p-3 border-[1px] border-[#242424]/5 shadow"
    />
  </div>
</template>

<script>
import aDealerInfo from '../../components/dealer/a-dealer-info.vue'
import ADealerServices from '../../components/dealer/a-dealer-services.vue'
import AYmapDealer from '../../components/dealer/a-ymap-dealer.vue'
export default {
  components: { aDealerInfo, ADealerServices, AYmapDealer },
  layout: 'main',
  data () {
    return {
      company: []
    }
  },
  async asyncData ({ $axios, params }) {
    const companyId = params.id
    const config = {
      params: {
        populate: '*'
      }
    }
    let res = await $axios.$get(
      `http://admin.996661-cn43153.tmweb.ru:1337/api/dealers/` + companyId,
      config
    )
    const dealer = res.data

    return { dealer }
  }
}
</script>

<style></style>
