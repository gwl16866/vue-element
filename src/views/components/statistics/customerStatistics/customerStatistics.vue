
<template>
<div id="app">


    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <h2 align="center">报表</h2>
      <br><br><br>
      <el-card>
      <div id="zhexian" :style="{width: '100%', height: '400px'}"> </div>
      </el-card>
    </div></el-col>


  
</div>
  
</template>

<script>
export default {
     data(){
        return{
           twoObj:{}
            

        }
    },
    methods:{

      customer(){

        var myChart = this.$echarts.init(document.getElementById('zhexian'));
 
         var option={

                    title: {
                        text: '年-客户报表图'
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
                        data: ['客户数量', '消费金额']
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
                            name: '客户数量',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: this.twoObj.renshu
                        },
                        {
                            name: '消费金额',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: this.twoObj.jine
                        }
                    ]
                }
                myChart.setOption(option);




      },   queryXian(){
           const that = this;
           this.$axios.get("http://localhost:8081/sta/statisticsCustomer", {
                    })
                    .then(function(res) {
                      that.twoObj = res.data;
                      that.customer();
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
   
        
      },

   


    },
    mounted(){
      this.queryXian()
     

    }
    
    
}
</script>

<style scoped>

</style>