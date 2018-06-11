<template>
  <div class="euv-switch">
    <div class="item" :key="index" v-for="(row, index) in Data" :class="{itemSelect:showSelect(index)}" @click="selectIndex(index)" ref="item">
        <span>{{row}}</span>
    </div>  
    <div class="selectBox" :style="selectStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'EuvSwitch',
  props: {
    DefaultIndex: {
      default: () => 0,
      type: Number
    },
    Data: {
      default: () => [1, 0],
      type: Array,
    },
  },

  data() {
    return {
      currentIndex: -1,
      currentLeft: 0,
      currentWidth: 0,
    };
  },  
  computed: {
    selectStyle() {
      return {
        left: `${this.currentLeft}px`,
        width: `${this.currentWidth}px`,
      }
    }
  },
  methods: {
    showSelect(index) {
        console.log('aaa', this.currentIndex)
       if (this.currentIndex === -1) this.currentIndex = this.DefaultIndex;
        
       return (this.currentIndex === index)? true : false;
    },
    selectIndex(index) {
   
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        this.currentWidth =  this.$refs.item[this.currentIndex].offsetWidth;
        this.currentLeft  =  this.$refs.item[this.currentIndex].offsetLeft;
        console.log(this.currentIndex, this.currentWidth, this.currentLeft)
        this.$emit('SelectIndex', this.currentIndex);
      }
    },
  },
  mounted(){
    if (this.currentIndex !== -1) {
      this.currentWidth=  this.$refs.item[this.currentIndex].offsetWidth;
      this.currentLeft  =  this.$refs.item[this.currentIndex].offsetLeft;
      console.log(this.currentIndex, this.currentWidth, this.currentLeft)
    }
   
  }
};
</script>

<style lang="scss" scoped>
.euv-switch
{
    position: relative;
    border-radius: 100px; // 60% 40% 40% 60%;
    display: inline-flex;
    border:#666 3px solid; 
    background: #888;
    height: 25px;
    .item{
        min-width: 30px;
        height: 100%;
        font-size: .75rem;
        cursor: pointer;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        transition: 1s all;
        overflow: hidden;
        z-index: 1;
     
    }
    .itemSelect{
        color: #666;
    }
    .selectBox {
        position: absolute;
        background: #fff;
        border-radius: 100px;
        transition: 0.3s all;
        left: 0;
        width: 0;
        height: 100%;
        color: #666;
    }
}

   
</style>
