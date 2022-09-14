<template>
  <div class=" w-full flex flex-col gap-8 pb-4">
    <section class="flex justify-between gap-8 items-start">
      <div class="block w-2/12 uppercase font-bold text-3xl">О EXAMINE</div>
      <div class=" w-10/12 flex flex-col gap-4">
        <span
          ><b>EXAMINE</b> - это агрегатор Российских компаний, занимающихся
          продажей, ремонтом, размещением и настройкой оборудования в сфере
          майнинга. Предоставляем простой и удобный инструмент, который позволит
          найти Вам подходящего поставщика! ​​Кто-то ищет ближайшие компании,
          кто-то предпочитает только фирменный сервис, кому-то важны
          рекомендации. EXAMINE хорош для любого способа поиска.
        </span>
        <nuxt-link to="/o-nas"
          class="bg-[#7854F7] px-4 py-3 rounded-full text-white max-w-[200px] flex justify-center"
        >
          Подробнее о нас
        </nuxt-link>
      </div>
    </section>
    <section class="flex justify-between items=center">
      <div class="flex flex-col gap-4">
        <img src="~/assets/img/icons/Logo.svg" alt="" />
        <div>2022 Все права защищены . ООО “EXAMINE”</div>
      </div>
      <span class="flex h-full items-center">По вопросам рекламы и партнерства обращаться по<br> электронной почте: info.examine@gmail.com</span>
      <div class="flex gap-4">
        <img src="~/assets/img/icons/telegram.svg" alt="" />
        <img src="~/assets/img/icons/vk.svg" alt="" />
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
