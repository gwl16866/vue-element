<template>
<div id="app">


  <el-row :gutter="8"  type="flex" justify="around">
  <el-col :span="24" ><div class="grid-content bg-purple-dark">
    
    <el-card class="box-card">

  <el-table
    :data="tableOne"
    border
    style="width: 100%">
    <el-table-column
      prop="browser"
      label="浏览人数"
      >
    </el-table-column>
    <el-table-column
      prop="downOrderCounts"
      label="下单人数"
      >
    </el-table-column>
    <el-table-column
      prop="orderCounts"
      label="订单数">
    </el-table-column>
    <el-table-column
      prop="trueOrderCounts"
      label="有效订单数">
    </el-table-column>
     <el-table-column
      prop="sumMoney"
      label="下单金额">
    </el-table-column>
  </el-table>

    <el-table
    :data="tableTwo"
    border
    style="width: 100%">
    <el-table-column
      prop="returnMoney"
      label="退款金额"
      >
    </el-table-column>
    <el-table-column
      prop="payPeopleCounts"
      label="付款人数"
      >
    </el-table-column>
    <el-table-column
      prop="payOrderCounts"
      label="付款订单数">
    </el-table-column>
    <el-table-column
      prop="payMoney"
      label="付款金额">
    </el-table-column>
     <el-table-column
      prop="kedanMoney"
      label="客单价">
    </el-table-column>
  </el-table>
</el-card>
    
 
    
    
    
    


  <!-- <el-col :span="24"><div class="grid-content bg-purple-dark"> -->
      <el-card>
      <div id="zhexian" :style="{width: '100%', height: '400px'}"> </div>
      </el-card>
    <!-- </div></el-col> -->

    </div></el-col>

  <el-col :span="24"><div class="grid-content bg-purple-dark">
      <el-card>
        
        <el-form >
          <el-form-item label="点击查看今天:">
            <el-button type="primary" size="small" @click="todayFresh">今天</el-button>
          </el-form-item>
     
          <el-form-item label="选择时间显示:">
                    <el-date-picker @input="dateChange"
                        v-model="value2"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                   </el-date-picker>

          </el-form-item>


        </el-form>
      <div id="zhu" :style="{width: '100%', height: '400px'}"> </div>
      </el-card>
    </div></el-col>




</el-row>




    

</div>
  
</template>

<script>
import qs from "qs";
export default {
     data(){
     
        return{
            pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
            tableOne:[],
            tableTwo:[],
            twoObj:{},
            value2:"",
            zhu:[]

            

        }
    },
    methods:{
      dateChange(val){
                const that = this;
              this.$axios.get("http://localhost:8081/sta/queryPayMoneyMany", {
                      params:{
                        date:that.value2
                      },
                  paramsSerializer: params => {
                    return qs.stringify(params, { indices: false });
                  }
                    })
                    .then(function(res) {
                      that.zhu = res.data;
                      that.queryZhu();
                    })
                    .catch(function(error) {
                      console.log(error);
                    });



      },
      todayFresh(){
        const that = this;
              this.$axios.get("http://localhost:8081/sta/queryPayMoneyMany", {
                      params:{
                        type:"today",
                      }
                
                    })
                    .then(function(res) {
                      that.zhu = res.data;
                      that.queryZhu();
                    })
                    .catch(function(error) {
                      console.log(error);
                    });


      },
      queryXian(){
           const that = this;
           this.$axios.get("http://localhost:8081/sta/statisticsPayReturn", {
                    })
                    .then(function(res) {
                      that.twoObj = res.data;
                      that.zhexian();
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
            

                   this.$axios.get("http://localhost:8081/sta/queryPayMoneyMany", {
                     params:{
                       date:that.value2
                     }
                    })
                    .then(function(res) {
                      that.zhu = res.data;
                      that.queryZhu();
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
        
      },

      zhexian(){

         var myChart = this.$echarts.init(document.getElementById('zhexian'));
 
         var option={

                    title: {
                        text: '年-交易报表图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['付款金额', '退款金额']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '付款金额',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: this.twoObj.pay
                        },
                        {
                            name: '退款金额',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: this.twoObj.returns
                        }
                    ]
                }
                myChart.setOption(option);

      },queryTableOne(){
                 const that = this;
                  this.$axios.get("http://localhost:8081/sta/statisticsTable", {
                    })
                    .then(function(res) {
                      that.tableOne = res.data;
                     
                    })
                    .catch(function(error) {
                      console.log(error);
                    });

      },queryTableTwo(){
                 const that = this;
                  this.$axios.get("http://localhost:8081/sta/statisticsTable2", {
                    })
                    .then(function(res) {
                      that.tableTwo = res.data;
                     
                    })
                    .catch(function(error) {
                      console.log(error);
                    });

      },queryZhu(){
          // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('zhu'));
      
      const that =this;
         var  option = {
              title:{
                  text: '交易柱状图'
              },
             xAxis: {
                        type: 'category',
                        size: '20',
                        data: ['0-50元', '51-100元', '101-200元', '201-500元', '501-1000元', '1001-5000元', '5000-10000元']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: that.zhu,
                        type: 'bar',
                        showBackground: true,
                        barWidth:40,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
             };
                       myChart.setOption(option);


            



      }

      },
    mounted(){
      //this.myEcharts();
      this.queryTableOne();
      this.queryTableTwo();
      this.queryXian();
      this.queryZhu();
     
    }
    
    
}
</script>

<style scoped>
  /* .box-card {
    position: relative;
    top:20px;
    left: 60px;
    width: 1200px;
    height: 250px;
  } */








</style>