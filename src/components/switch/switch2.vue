<template>
  <div class="euv-switch">
    <div class="item" :key="index" v-for="(row, index) in Data" :class="{select:showSelect(index)}" @click="selectIndex(index)">
        <span>{{row}}</span>
    </div>  
    <!-- <div class="select"></div> -->
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
      default: () => [1,0],
      type: Array,
    },
  },

  data() {
    return {
      currentIndex: -1
    };
  },  

  methods: {
    showSelect(index) {
       if (this.currentIndex === -1) this.currentIndex = this.DefaultIndex;
       return (this.currentIndex === index)? true : false;
    },
    selectIndex(index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        this.$emit('SelectIndex', this.currentIndex);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.euv-switch
{
    position: relative;
    border-radius: 100px;
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
        // margin: 0 1px;
        transition: 1s all;
    }
    .item::before {
        content: '';
        background: #fff;
        border-radius: 100px;
        transition: 1s all;
        color: #666;
    }
    .select {
        background: #fff;
        border-radius: 100px;
        transition: 1s all;
        color: #666;
    }
}

   
</style>
