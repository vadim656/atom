<template>
  <div class="bg-white shadow-md p-3 rounded-md flex flex-col gap-2">
    <div class="w-full flex justify-between items-center">
      <div class=" flex justify-between gap-4 items-center w-1/3">
        <span class="text-left w-full text-xs text-[#343434]/50">{{
          data_review.attributes.User
        }}</span>
        <span class="text-left w-full text-xs text-[#343434]/50">{{
          data_review.attributes.createdAt.slice(0, 10)
        }}</span>
      </div>

      <span class="text-right w-full">
        <a-star
          :value="data_review.attributes.Points.toString()"
          disabled="true"
        />
      </span>
    </div>

    <div class="w-full">
      <p v-html="data_review.attributes.Info" class="font-normal"></p>
    </div>
  </div>
</template>

<script>
import aStar from './a-star.vue'

export default {
  components: { aStar },
  props: {
    data_review: {
      type: Object
    }
  }
}
</script>

<style></style>
