<template>
  <div class="grid grid-cols-1 gap-20">
    <a-dealer-info :dealer_info="dealer" />
    <div class="grid grid-cols-3 gap-8">
      <a-dealer-services
        title="Комплектующие"
        :data_service="dealer.attributes.farms"
      />
      <a-dealer-services
        title="Ремонт фермы"
        :data_service="dealer.attributes.repairs"
      />
      <a-dealer-services 
      title="Обслуживание"
      :data_service="dealer.attributes.services"
      /> 
      <a-dealer-services 
      title="Модернизация"
      :data_service="dealer.attributes.modernizations"
      />
     
      <!-- <a-dealer-services 
      title="Размещение"
      :data_service="dealer"
      />
      <a-dealer-services 
      title="Аренда помещения"
      :data_service="dealer"
      /> -->
      <a-dealer-services
        title="Комплектующие ASIC"
        :data_service="dealer.attributes.asics"
      />

      <!-- <a-dealer-services 
      title="Запчасти для ремонта"
      :data_service="dealer"
      />
      <a-dealer-services 
      title="Обслуживание ASIC"
      :data_service="dealer"
      />
      <a-dealer-services 
      title="Размещение ASIC"
      :data_service="dealer"
      />
      <a-dealer-services 
      title="Аренда помещения под ASIC"
      :data_service="dealer"
      /> -->
    </div>
    <a-ymap-dealer :ymap_data="dealer.attributes" :titleCompany="dealer.attributes.CompanyName"/>
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
      headers: {
        Authorization:
          'Bearer b1dbea101e465820cfe2546fd7ce024c1ec871778143ca6b3b0d6a0c8282a6e5fcd1dcd276824c0f0de67025af0228fac6367e8cce0c0782ad86782538afc35a80aca62dd66223e00ddcf129498735278f13ef6238c5e97ced1fb03ab5ba4cae4bd4e9b0d34b8928db5700f6e4cdde796929c227121841534d876ebdab926b4d'
      },
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
