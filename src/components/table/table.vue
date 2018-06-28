<template lang="html">
    <div class="euv-table" :style="styles">
  
    </div>
</template>
<script>
/* eslint-disable */ 
import Icon from '../icon';
import Locale from '../../mixins/locale.js'; // for i18n

export default {
  name:'euvTable',
  mixins: [ Locale ], // for i18n
  filter:{
    reverse:function(value){
      return value.slice().reverse();
    }
  },
  components: {
    Icon
  },
  props:{
    multiple:{ // 上傳多張圖
      type: Boolean,
      default: false
    }, 
    eWidth: { // 元件寬
      type:String,
      default:'800',
    },
    eHeight:  { // 元件高
      type:String,
      default:'600',
    },
    usePosition:  { // 使用設定座標 
      type: Boolean,
      default: false
    },
    maxSize: { // 圖片最大大小 kb
      type: Number,
      default: 2048 //2mb
    }
  },
  data(){
    return {
      fileList:[],      // 內部暫存的資料
      sendFileList:[],  // 外傳的資料
      view:false,
      stepPage: 1,  
      setX:0, 
      setY:0, 
    }
  },

  computed:{
    showUploadBox(){
      if(this.fileList.length === 0 || this.multiple === true){
        return true;
      }
      return false;
    },
    styles(){
      return {
        height: `${this.eHeight}px`,
        width: `${this.eWidth}px`
      }
    }
  },
  methods:{    
    setXVal(event){
      this.setX = event.target.value;
    },
    setYVal(event){
      this.setY = event.target.value;
    },
    deleteImage(e,index){
      this.fileList.splice(index, 1);
    },
    getSelectImage(e){
      var file       = this.$refs.inputsx.files[0]
      var reader     = new FileReader();
      var regexImage = /^image\//;

      if(regexImage.test(file.type) && file) { // 圖片驗證
        if( file.size <= this.maxSize * 1024) {
          reader.readAsDataURL(file) // base64
          reader.onloadend = () => {
            this.fileList.push({// 加到暫存
              'file':file,
              'src':reader.result
            })
          }
        } else {
           this.$emit('on-fail', 'Image size is too large');
        }
      } else {
        this.$emit('on-fail', 'Non-image format'); // image 格式錯誤
      }
      this.$refs.inputsx.value = '';
    },  

    toUploadImage(){
      this.sendFileList = [];  // 清除傳出列表
      this.fileList.forEach((v) => {
        if (this.usePosition){ // 是否使用設定座標
          this.sendFileList.push({
            'file': v.file,
            'x': this.setX,
            'y': this.setY
          });
        } else {
          this.sendFileList.push({
            'file': v.file
          });
        }
      });
      this.$emit('on-success', this.sendFileList) // 送出File列表
      this.initData();
    },

    checkImageSize(file){
                if (file.size > this.maxSize * 1024) {
                  this.onExceededSize(file, this.fileList);
                  return false;
                }
    },
    initData(){ // 參數初始化
      this.fileList=[]; 
      // this.fileList.splice(0,this.fileList.length) 
      this.setX = 0;
      this.setY = 0;
      this.stepPage = 1;
    }
  }
}
</script>

<style lang="scss">
.euv-upload{
  border-radius: 10px;  
  min-width: 100px;
  min-height: 100px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center; 
  color: #666;
  font-size: 20px;
//   box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.1);
  .box-group{ // step page 1
    position: relative;
    align-content: center;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    
    .box{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      .show-select-img{
        margin: auto;
        max-width: 85%;
        max-height: 85%;
      }
      .x-botton{
        position: absolute;
        right: 5px;
        top: 5px;
        width: 40px;
        height: 40px;
        background: rgb(255, 255, 255);
        box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        z-index: 100;
        cursor: pointer;
        .x-button-icon{
          width: 100%;
          height: 100%;
        } 
        &:hover{
          transition:background-color  0.4s linear;
          background: rgb(252, 188, 227);
        }
      }
      .select-upload-image{
        opacity: 0; //隱藏按鈕
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: #666;
        z-index: 9999;
      } 
      .upload-msg{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
       
        .upload-icon{
          width: 10%;
          height: 10%;
          margin: 10px;
        }
      }
    }
    .box-border{
      background: #eee;
      border-style:dashed;  
      border-color:gray;
      border-radius: 10px;
      border-width: 4px;
      box-sizing: border-box;
    }
    .next-step{
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center; 
    }
  }
  .pos-group{ // step page 1
    position: relative;
    border-radius: 10px;
    width: 90%;
    height:90%;
    display: flex;
    justify-content: center;
    align-items: center; 
    .pos-box{
      position: relative;
      .set-pos{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px;
        input{
          width: 110px;
          font-size: 20px;
          color: #666;
        }
      }
    }
  }
}

.do-upload{
  outline:none;
  position: absolute;
  width: 90px;
  height: 40px;
  bottom: -5px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.1);
  color: #666;
  font-size: 14px;
  &:active{
    border:none;
  }
  &:hover{
    transition:background-color  0.4s linear;
    background: rgb(102, 196, 255);
    color:#fff;
  }
}

</style>
