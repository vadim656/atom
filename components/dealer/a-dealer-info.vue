<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-start justify-between">
      <h1 class="font-bold text-4xl">{{ dealer_info.attributes.CompanyName }}</h1>
      <div class="flex gap-1 items-center">
      <span><b>Телефон: </b>+7{{dealer_info.attributes.Phone}}</span>
    </div>
    <div>
      <span><b>Email:</b> {{dealer_info.attributes.Email}}</span>
    </div>
    <div>
      <span><b>Режим работы:</b> с {{dealer_info.attributes.StartTimeWork}} до {{dealer_info.attributes.EndTimeWork}}</span>
    </div>
    </div>
    
    <div class="flex flex-col gap-4">
      <h3 class="font-semibold text-2xl">О компании</h3>
      <span v-html="dealer_info.attributes.CompanyDesc"></span>
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
