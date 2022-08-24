<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-6 grid grid-cols-2 gap-4 max-h-[90px]">
      <a-dealer 
      v-for="dealer in dealers.data" 
      :key="dealer.id"
      :dealer_data="dealer"/>
    </div>
    <a-y-map :ymap_data="dealers.data" class="col-span-6 h-full"/>
  </div>
</template>

<script>
import aYMap from '../components/a-y-map.vue'
import ADealer from '../components/dealer/a-dealer.vue'

export default {
  components: { aYMap, ADealer },
  name: 'IndexPage',
  layout: 'main',
  async asyncData ({ $axios }) {
    const config = {
      headers: { Authorization: 'Bearer b1dbea101e465820cfe2546fd7ce024c1ec871778143ca6b3b0d6a0c8282a6e5fcd1dcd276824c0f0de67025af0228fac6367e8cce0c0782ad86782538afc35a80aca62dd66223e00ddcf129498735278f13ef6238c5e97ced1fb03ab5ba4cae4bd4e9b0d34b8928db5700f6e4cdde796929c227121841534d876ebdab926b4d' }
    }
    let dealers = await $axios.$get(
      'http://localhost:1337/api/dealers',
      config
    )

    return { dealers }
  }
}
</script>
