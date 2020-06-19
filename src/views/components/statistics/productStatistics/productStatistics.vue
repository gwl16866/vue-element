
<template>
<div id="app">


    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <el-card>


      <div id="zhexian" :style="{width: '100%', height: '400px'}"> </div>
              <el-form>
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
      </el-card>
    </div></el-col>


  
</div>
  
</template>

<script>
import qs from 'qs'
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
           list:[],
            value2:""
            

        }
    },
    methods:{
      dateChange(val){
                const that = this;
              this.$axios.get("http://localhost:8081/sta/queryProductStatus", {
                      params:{
                        date:that.value2
                      },
                  paramsSerializer: params => {
                    return qs.stringify(params, { indices: false });
                  }
                    })
                    .then(function(res) {
                   that.list = res.data;
                      that.customer();
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
      },
      customer(){
        var myChart = this.$echarts.init(document.getElementById('zhexian'));
                var option = {
                  title:{
                    text:'商品销售饼图'
                    },
                      tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            selectedMode: 'single',
                            data:this.list
                        }
                    ]
                };
                myChart.setOption(option);
      },   query(){
           const that = this;
           this.$axios.get("http://localhost:8081/sta/queryProductStatus", {

                    })
                    .then(function(res) {
                      that.list = res.data;
                      that.customer();
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
   
        
      },

   


    },
    mounted(){
      this.query()
     

    }
    
    
}
</script>

<style scoped>

</style>