<style lang="scss" scoped>

</style>

<template>
    <div class="container">
        <span>upload test</span>
        <euvUpload @on-fail="failmsg" @on-success="successmsg"></euvUpload>
        <!-- <router-view></router-view> -->
    </div>
</template>
<script>
export default {
  methods: {
    failmsg(msg){
      console.log(msg)
    },
    successmsg(val){
      console.log(val)
    }
  }    
}
</script>
