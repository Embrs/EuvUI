<template lang="html">
    <div class="env-upload" :style="styles">
        <!-- 第一步 選擇圖 -->
        <div v-show="stepPage === 1" class="box-group">
            <!-- 顯示選擇圖示 -->
            <div class="box" v-for="file,index in fileList">
                <!-- 刪圖按鈕 -->
                <div class="x-botton" @click="deleteImage($event,index)">
                  <!-- <i class="material-icons x-button-icon">delete_forever</i>   -->
                  <!-- <h5>X</h5> -->
                  <img class="x-button-icon" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFJElEQVR4nO3cwU5iVxzH8d+hvRBE0gVpupsms5CVL6Aru+sbdBI2kpQEOoPME8z4BIMZExKncUXiI7Sb1p0vMN24MRlXM5mwMEYNMHq68aSGigP33MM5/s/vs0KTy/0HvoF4+SNARERERERERERERERERERERERERGRL+R7ANa31652dnVc+zr21tbWtlHrt49yLIjogn/EY0iMSG1AI8RiSIxIZUEjxGFIjEhdQiPEYEiMSFVDI8RjSIvIWULfb1b7OLVGn0/HyXOZ8nJTkYEBkhQGRFQZEVhgQWWFAZIUBkRUGRFYYEFlhQGSFARERERERERE9GsGttHJT8WG+Ng+n4XUgssKAyAoDIisMiKwwILLCgMgKAyIrDIisMCCywoDICgMiKwyIrDAgssKAyAoDIisMiKwwILLCgMgKAyIrUQWUJMmlhHOEJJqAms3mbqvVWq1UKqeuzlGpVE5brdZqs9ncdXWO0EQRULPZ3C0UCi+UUie1Wm3DRUSVSuW0VqttKKVOCoXCi1giEh+Qicf87CKiu/GY38USkeiAJuMxsozovniMGCISG9C0eIwsInooHkN6RCID+lo8hk1Es8RjSI5IXECzxmOkiWieeAypEYkKaN54jHkiShOPITEiMQElSXKZz+ffpD1+lohs4jHy+fwbSRcbxQQ0Ho+X+v3+odb6adr7eCiiLOLRWj/t9/uH4/F4Ke19hEZMQAAwGAyeuIgoy3gGg8GTtPcRom99D5C1OxGlfsKVUida641+v38IAIxnOnEBAdlGZG6nnUVyPICwt7C7sno7YzwPExsQkE1EacUQDyA8IMBPRLHEA0QQELDYiGKKB4gkIGAxEcUWDxBRQIDbiGKMB4gsIMBNRLHGA0QYEJBtRDHHA0QaEGUnyoCy+GzLcLmo/xhEF1CW8RgxRxRVQC7iMWKNKJqAXMZjxBhRFAEtIh4jtojEB7TIeIyYIhIdkI94jFgiEhtQVmuornaspRC5kZjlDvPt7UzWYyVerRb3CpT1AryrRX0pRAXk6tsTjGg6MQElSXLp8tsTWUbELxYGaDweL41Go5dpj5/lU/UsIhqNRi/5xcJA9Xq958Ph8O28x82zkmET0XA4fNvr9Z7Pe1zIRAUEzB9Rmn2eNBFJjAcQGBAwe0Q2y2DzRCQ1HkBoQMDXI8pik3CWiCTHAwgOCJgeUZZrqA9FJD0eQHhAwP8jcrHDfF9EMcQDRBAQ8F9ELhfg70YUSzwAoHwPMKnb7WpX950kyaXrazCuz9HpdIJ6zqJ4BTIWcQFP0kXCWUQVEGWPAZEVBkRWGBBZYUBkhQGRFQZEVoILSCl17XuGUIX42AQXULlc/ux7hlCF+NgEF9DKyso/vmcIVbVafe97hknBBbS+vv6X7xlCtba29rfvGSYFFxCAg1wu98X3EKG5fUwOfM8xKbiAlFIfNjc3f/c9R2jq9fo7pdQH33NMCi4gAFheXt4uFotnvucIRbFYPCuVStu+57hPkAEppT42Go1nIf7ZumhKqetGo/GLUuqT71nuE2RAAKCU+qPdbv8Wc0RKqet2u91SSv3pe5Zpgtpuu4/W+ue9vb2Dq6ur73zPskjFYvHs9pUn2HiARxAQAGitf7i4uHi1v7//683Njch/SWPkcrkv9Xr9XalU2g71beuuRxGQobX+EcCzo6Ojn46Pj1fPz8+/11p/43suG0qp63K5/Llarb6/vc5zEOJfW0RERERERERERERERERERERERERE7vwLIPdzkjTmyhEAAAAASUVORK5CYII='/>
                  <!-- <Icon type="arrow-right-b"></Icon> -->
                </div>
                <img class="show-select-img" :src="file.src">
            </div>
            <!-- 選擇上傳圖片 -->
            <div v-show="showUploadBox" class="box box-border">
                <div class="upload-msg">
                  <!-- 請拖曳一張圖片進行上傳 -->
                  <img class="upload-icon" src='data:image/png;base64,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'/>
                  <!-- <i class="material-icons upload-icon">backup</i> -->
                  <!-- <Icon class="" type="arrow-right-b"></Icon> -->
                  <div>
                    <p>{{t('i.upload.selectImage')}}</p>
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
      if(regexImage.test(file.type) && file && file.name.match(/^([0-9a-zA-Z_\-~ :\\])+(.png|.PNG)$/)) { // 圖片驗證
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
