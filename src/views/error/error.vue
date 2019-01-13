<template>
  <div style="height:100%;width:100%;"><img class="logo" v-bind:src="logo" style="height:100%;width:100%;"/>没有该资源</div>
</template>
<style></style>
<script>
  export default {
    data () {
      return {
        logo: require('@/assets/image/404.jpg')
      }
    }
  }
</script>
