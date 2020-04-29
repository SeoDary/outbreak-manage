<template>
  <div class="register">
    <h2>今日：{{time}}</h2>
    <div class="box" v-for="(item,index) in list" :key="index">
      <h1>{{item.address}}</h1>
      <el-divider></el-divider>
      <div class="inner-box" v-for="(items,index) in item.children" :key="index" @click.stop="$router.push({path:'/homePage/index',query:{id:items.id}})">
        <p>{{items.address}}</p>
        <i class="el-icon-check" v-if="items.status == true"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import models from "../../interface/Models.js";
  export default {
    name: "index",
    data(){
      return{
        time:this.dateFormat("YYYY-mm-dd HH:MM", new Date()),
        list:'',
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      //获取全部楼栋信息
      getData(){
        
        models.getModel("getAddress").get().then(info=>{
          if(info.data.code == 200){
            this.list = info.data.data;
          }else {
            this.$message.error('请求错误')
          }
        })
      },
      dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          }
        }
        return fmt;
      }
    }
  }
</script>

<style scoped lang="scss">
  .register{
    padding: 50px 0 200px;
    width: 100%;
    h2{
      width: 80%;
      margin-left: 10%;
      font-size: 2rem;
      text-align: left;
      margin-bottom: 30px;
    }
    .box{
      padding: 30px 10px;
      width: 80%;
      margin: 20px auto 50px;
      background-color: rgba(242,242,242,1);
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      flex-flow: wrap;
      h1{
        font-size: 2rem;
        width: 90%;
        margin-left: 5%;
        text-align: left;
      }
     .inner-box{
       cursor: pointer;
        margin: 15px 1%;
        width: 30%;
       border-radius: 10px;
        height: 50px;
        /*border: 1px solid #000;*/
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: #fff;
       p{
         font-size: 1.5rem;
       }
       i{
         margin-left: 10px;
         font-size: 2.5rem;
         font-weight: 700;
         color: #feac5e;
       }
      }
    }
  }
</style>
