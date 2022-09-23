<template>
  <div>
    <button id="btn">
      tut
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    bindListener () {
      document.getElementById('btn').addEventListener('click', this.handler)
    },
    unbindListener () {
      document.getElementById('btn').removeEventListener('click', this.handler)
    },
    handler () {
      alert('Whoo-Ha!')
    }
  }
}
</script>

<style></style>
