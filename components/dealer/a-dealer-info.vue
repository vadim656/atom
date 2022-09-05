<template>
  <div class="flex flex-col gap-4 ">
    <div class="flex flex-col sm:flex-row gap-2 sm:gap-0 items-start justify-between">
      <h1 class="font-bold text-4xl">
        {{ dealer_info.attributes.CompanyName }}
      </h1>
      <div class="flex gap-1 items-center">
        <span><b>Телефон: </b>+7{{ dealer_info.attributes.Phone }}</span>
      </div>
      <div v-if="dealer_info.attributes.Email">
        <span><b>Email:</b> {{ dealer_info.attributes.Email }}</span>
      </div>
      <div>
        <span
          ><b>Режим работы:</b> с {{ dealer_info.attributes.StartTimeWork }} до
          {{ dealer_info.attributes.EndTimeWork }}</span
        >
      </div>
    </div>
    <div class="flex gap-4 text-xs flex-wrap sm:text-sm">
      <div
        v-if="dealer_info.attributes.ArendaOhrana == true"
        class="px-4 py-2 bg-[#FFDEB6] rounded-md  flex gap-1 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>

        Охрана помещения
      </div>
      <div
        v-if="dealer_info.attributes.VIP == true"
        class="px-4 py-2 bg-[#FFDEB6] rounded-md flex gap-1 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>

        Компания проверена
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
