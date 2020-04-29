<template>
  <div class="outBox">
    <div class="bigBox">
      <el-form  label-width="100px">
        <el-form-item label="标题">
          <el-input  v-model="getFormData.title" placeholder="请输入标题"></el-input>
        </el-form-item>
  
        <el-form-item label="作者">
          <el-input  v-model="getFormData.author" placeholder="请输入作者"></el-input>
        </el-form-item>
  
       <!-- <el-form-item label="简介">
          <el-input type="textarea" :rows="4" v-model="getFormData.intro" placeholder="请输入简介"></el-input>
        </el-form-item>-->
    
       <!-- <el-form-item label="活动时间" required>
          <el-form-item>
            <el-date-picker
              v-model="getFormData.createtime"
              style="float:left;width: 45%;"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form-item>-->
    
       <!-- <el-form-item label="上传照片">
  
          <input style="display: none;" ref="pic" type="file" @change="onCoverChange($event)">
          <div @click="onClickCover">
            <img class="imgCovers" :src="getFormData.cover" v-if="getFormData.cover">
            <span class="addPic"  v-if="!getFormData.cover">点击添加图片</span>
          </div>
        </el-form-item>
        -->
        <editor v-model="getFormData.text"></editor>
        
      </el-form>
      <div class="submitArea">
        <div class="submit" @click="submit">{{submitWord}}</div>
        <div class="back" @click="$router.back()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  import models from "../../interface/Models.js";
  import editor from '@/components/Tinymce/index.vue'
  
  export default {
    name: "addNews",
    components: {editor},
    data(){
      return{
        submitWord:"提交",
        getFormData:{
          author:'',
          text:'',
          title:'',
        },
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      //编辑时获取信息
      getData(){
        if (this.$route.query.id) {
          models.getModel("articleInfo").post({id:this.$route.query.id}).then((res)=> {
            this.getFormData = res.data.data;
            this.submitWord = '修改'
          })
          }
        },
      //上传图片
      /*onClickCover() {
        this.$refs.pic.click();
      },*/
      /*onCoverChange(e) {
        var picCover = e.target.files[0];
        if (!picCover) {
          return
        } else {
          this.$store.dispatch("studies/resource", {files: picCover}).then((res) => {
            if (res.status == "200") {
              this.getFormData.cover = res.data.result[0];
            }
          });
        }
      },*/
      //转化时间格式
      formatDate(val) {
        function isZero(m) {
          return m < 10 ? '0' + m : m
        }
        //时间戳是整数，否则要parseInt转换
        var time = new Date(val); // 需要使用Date格式进行日期转化，若是时间戳、字符串时间，需要通过new Date(..)转化
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + isZero(m) + '-' + isZero(d) + ' ' + isZero(h) + ':' + isZero(mm) + ':' + isZero(s);
      },
      //提交
      submit() {
        if (this.$route.query.id) {
          models.getModel("articleUpdate").put(this.getFormData).then((res)=>{
            if (res.data.code == '200') {
              this.$router.back();
              this.$message.success('修改成功');
            }
          })
        }else {
          models.getModel("articleSave").post(this.getFormData).then((res)=>{
            if (res.status == '200') {
              this.$router.back();
              this.$message.success('添加成功');
            }
          })
        }
         /* this.$store.dispatch("article/newsSave", this.getFormData).then(res => {
            if (res.status == '200') {
              this.$router.back();
              this.$message.success('添加成功');
            }
          })*/
      }
    },
  }
</script>

<style scoped lang="scss">
  .outBox{
    background-color: rgb(244,247,252);
    padding: 100px 0;
    .bigBox{
      width: 80%;
      margin-left: 10%;
      background-color: #fff;
      border-radius: 15px;
      padding: 100px 10%;
      .inner-img {
        position: relative;
        width: 150px;
        margin: 0 20px 20px 0px;
        height: auto;
        border-radius: 15px;
        overflow: hidden;
    
        i {
          font-weight: 700;
          cursor: pointer;
          font-size: 20px;
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 10px;
        }
    
        img {
          width: 100%;
          height: 100%;
        }
      }
      .imgCovers{
        width: 300px;
        border-radius: 10px;
        float: left;
        margin-bottom: 50px;
      }
      .addPic {
        /*margin-left: 10px;*/
        cursor: pointer;
        display: block;
        border-radius: 15px;
        font-size: 16px;
        text-align: center;
        line-height: 100px;
        width: 150px;
        height: 100px;
        border: 1px dashed #999999;
        background-color: rgba(222, 222, 222, .1);
      }
      .submitArea{
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .submit,.back{
          cursor: pointer;
          margin: 20px;
          padding: 10px 35px;
          border-radius: 5px ;
          transition: all .2s;
          &:hover{
            opacity: .8;
          }
        }
        .submit{
          color: #ffffff;
          background-color:rgb(50,140,252);
        }
        .back{
          color: #000000;
          background-color: #dddddd;
        }
        
      }
    }
  }

</style>
