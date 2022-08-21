<template>
  <div class="w-full justify-between flex">
    <div class="relative flex items-center">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Поиск по сайту..."
        class="shadow-sm border-[1px] block w-full pr-12 px-4 py-2 sm:text-sm border-gray-300 rounded-md"
      />
      <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd class="inline-flex items-center text-sm text-gray-400">
          <img src="../../assets/img/icons/A-Icon-Search.svg" alt="" />
        </kbd>
      </div>
    </div>

    <div class="flex gap-2 items-center text-base">МЕНЮ 
      <img src="../../assets/img/icons/menu-desc.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
