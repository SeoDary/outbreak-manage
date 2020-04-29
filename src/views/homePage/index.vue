<template>
<div>
  <span class="back" @click="$router.back()">返回</span>
  <div class="person" v-for="(item,index) in messages" :key="index" @click="dialogVisible = true,tableData = item">
    <i class="el-icon-user-solid"></i>
    <div>
      <p>户主名：{{item.real_name}}</p><p>用户名：{{item.username}}</p>
    </div>
  </div>
  <p v-if="messages.length == 0">暂无人员信息</p>
  
  <el-dialog
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose">
    <div id="table1"></div>
  </el-dialog>
</div>
</template>
<div>

</div>
<script>
  import models from "../../interface/Models.js";
  
  export default {
    name: "index",
    data(){
      return{
        dialogVisible:false,
        messages:'',
        tableData:[],
      }
    },
    watch:{
      dialogVisible(newVal){
        if(newVal == true){
          setTimeout(()=>{
            this.getTable1()
          },500)
        }
      }
    },
    mounted() {
      this.getData();
      
    },
    methods:{
      //获取数据
      getData(){
        models.getModel('getInfo').post({id:this.$route.query.id}).then(info=>{
          if(info.data.code == 200){
            this.messages = info.data.data;
          }else {
            this.$message.error('请求错误')
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      getTable1(){
        let arrX = [];
        let arrY = [];
        this.tableData.user_temps.map((val,i)=>{
          arrX[i] = val.registerTime.slice(0,10);
          arrY[i] = val.userTemp;
        });
        let myChart = this.$echarts.init(document.getElementById('table1'));
        // 绘制图表

        let option = {
          title: {
            text: this.tableData.real_name + '的每日温度'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '0%',
            right: '3%',
            bottom: '13%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: arrX,
          },
          yAxis: {
            type: 'value',
            min:33,
            max:43
          },
          series: [
            {
              name: this.cdn,
              type: 'line',
              stack: '总量',
              data: arrY,
            },
          ],
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }, {
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
        };
        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped lang="scss">
  span{
    cursor: pointer;
    margin-left: 90%;
  }
  p{
    text-align: center;
    font-size: 1.3rem;
    line-height: 1.5em;
  }
#table1{
  width: 90%;
  margin: 5%;
  height: 300px;
}
  .person{
    border-radius: 5px;
    cursor: pointer;
    margin: 20px auto;
    padding: 30px 20px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
    width: 60%;
    border: 1px solid #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      font-size: 3rem;
    }
    div{
      margin-left: 30px;
      p{
        text-align: left;
        font-size: 1.3rem;
        line-height: 1.5em;
      }
    }
  }
</style>
