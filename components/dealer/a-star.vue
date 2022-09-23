<template>
  <div>
    <div class="star-rating">
      <label
        class="star-rating__star"
        v-for="(rating, i) in ratings"
        :key="i"
        v-bind:class="{
          'is-selected': value >= rating && value != null,
          'is-disabled': disabled
        }"
        v-on:mouseover="star_over(rating)"
        v-on:mouseout="star_out"
        v-on:click="set(rating)"
      >
        <input
          class="star-rating star-rating__checkbox"
          type="radio"
          v-bind:name="name"
          v-bind:value="rating"
          v-bind:required="required"
          v-bind:id="$index + 1"
          v-bind:disabled="disabled"
          v-model="value"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      temp_value: null,
      ratings: [1, 2, 3, 4, 5]
    }
  },
  props: {
    name: String,
    value: null,
    id: String,
    disabled: String,
    required: Boolean
  },
  methods: {
    star_over (index) {
      if (this.disabled == 'true') {
        return
      }

      this.temp_value = this.value
      this.value = index
    },
    star_out () {
      if (this.disabled == 'true') {
        return
      }

      this.value = this.temp_value
    },
    set (value) {
      if (this.disabled == 'true') {
        return
      }
      this.$emit('starNum', value)
      this.temp_value = value
      this.value = value
    }
  }
}
</script>

<style>
.star-rating__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.star-rating__star {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 1.5em;
  color: #ababab;
  transition: color;
}
.star-rating__star:hover {
  cursor: pointer;
}
.star-rating__star.is-selected {
  color: #df470b;
}
.star-rating__star.is-disabled:hover {
  cursor: default;
}
</style>
