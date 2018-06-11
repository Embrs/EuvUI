<style lang="scss" scoped>

</style>

<template>
    <div class="container">
        <!-- <span>upload test</span>
        <br>
        <euvUpload @on-fail="failmsg" @on-success="successmsg " :usePosition='true'></euvUpload> -->
        <!-- <router-view></router-view> -->
         <br>
        <span>select test</span>
        <br>
        <euvSwitch @SelectIndex='SwitchFilter' :DefaultIndex='2' :Data="['中文','English']"></euvSwitch>
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
    },
    SwitchFilter(val){
      console.log(val)
    }
  }    
}
</script>
