<template lang="html">
    <div class="env-upload" :style="styles">
        <!-- 第一步 選擇圖 -->
        <div v-show="stepPage === 1" class="box-group">
            <!-- 顯示選擇圖示 -->
            <div class="box" v-for="file,index in fileList">
                <!-- 刪圖按鈕 -->
                <div class="x-botton" @click="deleteImage($event,index)">
                  <i class="material-icons x-button-icon">delete_forever</i>  
                </div>
                <img class="show-select-img" :src="file.src">
            </div>
            <!-- 選擇上傳圖片 -->
            <div v-show="showUploadBox" class="box box-border">
                <div class="upload-msg">
                  <!-- 請拖曳一張圖片進行上傳 -->
                  <i class="material-icons upload-icon">backup</i>
                  <div>
                    <p>{{eTitle}}，{{t('i.upload.selectImage')}}</p>
                    <p>{{t('i.upload.ImageRule')}}{{maxSize}}{{t('i.upload.ImageRule2')}}</p>
                  </div>
                 
                </div>
                <input class="select-upload-image" ref="inputsx"  @change="getSelectImage($event)" type="file" name="" value="">
            </div>
            <!-- 上傳或下一步 -->
            <div v-show="fileList.length > 0" class='next-step'> 
                <button v-if="(usePosition === true)" class="do-upload" @click="stepPage = 2" type="button">下一步</button>
                <button v-else class="do-upload" @click="toUploadImage($event)" type="button">{{t('i.upload.okToUpload')}}</button>
            </div>
        </div>
        <!-- ========================================================================= -->
        <!-- 第二步 選擇座標 -->
        <div v-show="stepPage === 2" class="pos-group">
          <div class="pos-box">
            <div class="set-pos"> 
              <!-- X軸 -->
              {{t('i.upload.axisX')}}：<input type="number" :value="setX" @input="setXVal" >
            </div>
            <div class="set-pos">
              <!-- Y軸 -->
              {{t('i.upload.axisY')}}：<input type="number" :value="setY" @input="setYVal">
            </div>
          </div>
          <!-- 確認上傳 -->
          <button class="do-upload" @click="toUploadImage($event)" type="button">{{t('i.upload.okToUpload')}}</button>
        </div>
    </div>
</template>
<script>
/* eslint-disable */ 
import Locale from '../../mixins/locale.js'; // for i18n
// import Icon from '../icon/icon';


export default {
  // .match(/^([0-9.]){1,4}$/g)
  name:'euvUpload',
  components: {
    // Icon
  },
  mixins: [ Locale ], // for i18n
  props:{
    eTitle: {
      type: String,
      default: 'none'
    },
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
      default: true
    },
    maxSize: { // 圖片最大大小 kb
      type: Number,
      default: 300 // 300kb
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
      if(regexImage.test(file.type) && file && file.name.match(/^([0-9a-zA-Z_\-~ \[\]:()\\])+(.png|.PNG)$/)) { // 圖片驗證
        if( file.size <= this.maxSize * 1024) {
          reader.readAsDataURL(file) // base64
          reader.onloadend = () => {
            this.fileList.push({// 加到暫存
              'file':file,
              'src':reader.result
            })
          }
        } else {
           this.$emit('on-fail', '002, Image size is too large');
        }
      } else {
        this.$emit('on-fail', '001, Non-image format'); // image 格式錯誤
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
      if (file.size > this.maxSize * 300) {
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
.env-upload{
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
    
     border-radius: 10px;  
    position:relative;
    left: 0;
    background:linear-gradient(-45deg,#eee 0%,#eee 20%,#f7f7f7 20%, #f7f7f7 45%,#eee 45%,#eee 70%,#f7f7f7 70%, #f7f7f7 95%,#eee 95%,#eee 100%);
    background-size:90px 90px;
    background-position:0 0;
    animation:neonaction 1s infinite linear;
    @keyframes neonaction{
        0% { background-position:-90px 0; }
        100% { background-position:0 0; }
    }

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
        img{
          widows: 40px;
          height:40px;
        }
        .x-button-icon{
          font-size: 40px;
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
        // text-align: center;
        justify-content: center;
        img{
          padding-right: 20px;
          width:100px;
          height:80px;
        }
        .upload-icon{
          font-size: 50px;
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
