<template>
<div>
   
      <el-table :data="addProductList" border style="width: 100%;">
      <el-table-column label="编号" width="90">
            <template slot-scope="scope">
              <el-form :prop="'addProductList.'+scope.$index+'.pid'">
                  <el-form-item>
                      {{scope.row.pid}}
                  </el-form-item>
              </el-form>
          </template>
      </el-table-column>
      <el-table-column prop="productNumber" label="货号" width="90"></el-table-column>
      <el-table-column prop="productName" label="商品名称" width="80"></el-table-column>
      <el-table-column prop="image" label="图片" width="80">
        <template slot-scope="scope" >
          <el-image
            :src="require('@/dir/imgs/'+scope.row.image)"
            :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
            style="width:150px;height:80px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="productModel" label="规格" width="80"></el-table-column>
      <el-table-column prop="productColor" label="颜色" width="80"></el-table-column>
      <el-table-column  label="库存" width="80">
          <template slot-scope="scope">
          {{scope.row.counts}}</template></el-table-column>
      <el-table-column  label="秒杀价格" width="100">
          <template slot-scope="scope">
              <el-form :prop="'addProductList.'+scope.$index+'.seckillPrice'">
                  <el-form-item>
                      <el-input v-model="scope.row.seckillPrice"></el-input>
                  </el-form-item>
              </el-form>
          </template>
      </el-table-column>
      <el-table-column  label="秒杀数量" width="100">
          <template slot-scope="scope">
           <el-form :prop="'addProductList.'+scope.$index+'.seckillNumber'">
                  <el-form-item>
                      <el-input v-model="scope.row.seckillNumber" @input="Number"></el-input>
                  </el-form-item>
              </el-form>
          </template>
      </el-table-column>
      <el-table-column  label="剩余数量" width="100">
        <template slot-scope="scope">
           <el-form :prop="'addProductList.'+scope.$index+'.residueNumber'">
                  <el-form-item>
                      <el-input v-model="scope.row.residueNumber"></el-input>
                  </el-form-item>
              </el-form>
          </template>
      </el-table-column>
      <el-table-column  label="限购数量" width="100">

          <template slot-scope="scope">
           <el-form :prop="'addProductList.'+scope.$index+'.purchaseNumber'">
                  <el-form-item>
                      <el-input v-model="scope.row.purchaseNumber"  @input="Number"></el-input>
                  </el-form-item>
              </el-form>
          </template>
      </el-table-column>
    </el-table>
    <el-button  @click="back()">取消</el-button>
    <el-button @click="batchAdd()">提交</el-button>
    
</div>
</template>
<script>
import qs from 'qs'
  export default {
    data(){
      return{
        addProductList:[],
        product:{pid:'',seckillPrice:'',residueNumber:'',seckillNumber:'',purchaseNumber:''},
        seckillPrice:'',
        residueNumber:'',
        seckillNumber:'',
        counts:'',
        purchaseNumber:'',
      }
    },
    mounted(){
       this.search()
    },
     methods: {

      search:function(){
             const that = this
          this.$axios.get('http://localhost:8081/re/returnthings/search', {
            params: {
              batchList: this.batchList
            },
            paramsSerializer: params => {
              return qs.stringify(params, { indices: false })
            }
          })
            .then(function(res = 1) {
                const result = res.data
              that.addProductList = result.data
            })
            .catch(function(error) {
              console.log(error)
            })
        },
    //判断数量
    number() {
      if(this.seckillNumber>this.counts){
         this.$message({
            message: '秒杀数量不能大于商品数量',
            type: 'error'
          })
      }
      if(this.purchaseNumber>this.seckillNumber){
         this.$message({
            message: '限购数量不能大于秒杀数量',
            type: 'error'
          })
      }
    },
//批量添加
  batchAdd:function(){
             const that = this
          this.$axios.post('http://localhost:8081/re/returnthings/batchAdd?seckillId='+ that.seckillId, 
          that.addProductList
          )
            .then(function(res = 1) {
                 that.back()
                console.log(res)
            })
            .catch(function(error) {
              console.log(error)
            })
        },


    back:function() {
        this.$emit("back","false")
    }
    },
    props:[
        'batchList',
        'seckillId'
    ]
  }
</script>