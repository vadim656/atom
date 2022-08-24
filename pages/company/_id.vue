<template>
  <div>
      <h1 class="font-bold text-4xl">{{ dealer.CompanyName}}</h1>
      
  </div>
</template>

<script>
export default {
    layout:  'main',
    data() {
        return {
            company: []
        }
    },
    async asyncData ({ $axios, params }) {
        const companyId = params.id
    const config = {
      headers: { Authorization: 'Bearer b1dbea101e465820cfe2546fd7ce024c1ec871778143ca6b3b0d6a0c8282a6e5fcd1dcd276824c0f0de67025af0228fac6367e8cce0c0782ad86782538afc35a80aca62dd66223e00ddcf129498735278f13ef6238c5e97ced1fb03ab5ba4cae4bd4e9b0d34b8928db5700f6e4cdde796929c227121841534d876ebdab926b4d' }
    }
    let res = await $axios.$get(
      `http://localhost:1337/api/dealers/` + companyId,
      config
    )
    const dealer = res.data.attributes

    return { dealer }
  }
}
</script>

<style>

</style>