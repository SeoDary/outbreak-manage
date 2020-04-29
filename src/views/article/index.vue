<template>
  <div id="newsManage">
    <div class="top">
      <el-button type="primary" @click="$router.push({path:'/article/add'})">添加公告</el-button>
    </div>
    <div class="list">
      <div class="box" v-for="item in newsList" :key="item.id" @click="navToEditor(item.id)">
        <div class="img">
          <img :src="item.cover" alt="" v-if="item.cover">
        </div>
        <h3>{{item.title}}</h3>
        <div class="list-bottom">
          <p>{{item.author}}</p>
          <el-button type="danger" @click.stop="removeStudiesItem(item.id)">删除</el-button>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="param.pageSize"
      :current-page.sync="param.pageNo"
      background
      layout="total, prev, pager, next"
      :total="total"
      style="float: right"
    ></el-pagination>
  </div>
</template>

<script>
  import models from "../../interface/Models.js";
  export default {
    name: "index",
    data(){
      return{
        newsList:'',
        total:0,
        param: {
          size: 10,
          page: 1
        },
      }
    },
    mounted(){
      this. getListData()
    },
    methods:{
      //获取列表
      getListData(){
        models.getModel("articleList").get(this.param).then((res)=>{
          if (res.data.code == '200') {
            this.total = res.data.data.length;
            this.newsList = res.data.data
          }
        })
        
      },
      //分页点击
      handleSizeChange(val) {
        this.param.pageNo = val;
        this.getListData();
      },
      handleCurrentChange(val) {
        this.param.pageNo = val;
        this.getListData();
      },
      //跳转至详情页
      navToEditor(val){
        this.$router.push({
          path:'/article/add',
          query:{
            id:val
          }
        })
      },
      //删除新闻
      removeStudiesItem(val){
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          models.getModel("articleDelete").post({id:val}).then((res)=>{
            if (res.data.code == '200') {
              this.getListData();
              this.$message.success('删除成功');
            }else {
              this.$message.error('无法删除');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>

<style scoped lang="scss">
#newsManage{
  padding: 20px 40px;
  .top{
    width: 100%;
    display: flex;
    justify-content: start;
    padding: 20px 0;
  }
  .list{
    width: 100%;
    display: flex;
    justify-content: start;
    flex-flow: wrap;
    .box{
      width: 200px;
      height: 200px;
      margin-right: 30px;
      margin-bottom: 50px;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
      overflow: hidden;
      cursor: pointer;
      .img{
        width: 100%;
        height: 60%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      h3{
        line-height: 40px;
        height: 40px;
        /*display: inline-block;*/
        white-space: nowrap;
        width: 90%;
        margin-left: 5%;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      .list-bottom{
        display: flex;
        justify-content: space-around;
        align-items: center;
        p{
          color: #484848;
          font-size: 15px;
        }
        /deep/ .el-button{
          height: 25px;
          padding-top: 0;
          span{
            line-height: 25px;
          }
        }
      }
    }
  }
}
</style>
