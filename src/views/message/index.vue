<template>
  <div class="article">
    <h2>居民消息</h2>
    <div class="box" v-for="(item,index) in messageList" :key="index">
     <div class="header">
      <h1>{{item.title}}</h1>
       <p><span>姓名：</span>{{item.real_name}}</p>
       <p><span>时间：</span>{{item.message_time}}</p>
       <p><span>楼栋：</span>{{item.address}}</p>
     </div>
      <div class="inner-box">
        <el-input type="textarea" v-model="item.message" disabled></el-input>
      </div>
    </div>
    <!--<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="param.size"
      :current-page.sync="param.page"
      background
      layout="total, prev, pager, next"
      :total="total"
      style="float: right;margin: 50px 15%  0 0;"
    ></el-pagination>-->
  </div>
</template>

<script>
  import models from "../../interface/Models.js";

  export default {
    name: "index",
    data(){
      return{
        messageList:[],
      }
    },
    mounted(){
      this.getData();
      console.log(this.messageList);
    },
    methods:{
      getData(){
        models.getModel("getMessage").get().then((res)=>{
          this.messageList = res.data.data
        })
      },
     /* handleSizeChange(val) {
        this.param.page = val;
        this.getData()
      },
      handleCurrentChange(val) {
        this.param.page = val;
        this.getData()
      }*/
    },
  }
</script>

<style scoped lang="scss">
  .article{
    height: 100%;
    overflow: auto;
    background-color: rgb(240,242,242);
    padding: 100px 0 200px 0;
    h2{
      text-align: left;
      font-size: 3rem;
      width: 70%;
      margin: 0 auto 30px;
    }
    .box{
      border-radius: 5px;
      cursor: pointer;
      width: 70%;
      background-color: #fff;
      margin: 15px auto;
      padding-bottom: 30px;
      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        h1{
          padding: 0 30px;
          text-align: left;
          font-size: 2rem;
          width: 50%;
        }
        p{
          width: 33%;
          padding: 0 5px ;
          font-size: 1rem;
          span{
            font-weight: 700;
          }
        }
        &:first-child{
          margin-top: 0;
        }
      }
      .inner-box{
        width: 96%;
        margin-left: 2%;
      }
    }
    /deep/ .el-pagination{
      background-color: rgb(240,242,242);
    }
  }
</style>

