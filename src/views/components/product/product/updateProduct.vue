<template>
    <div>


      <el-divider content-position="left">商品信息</el-divider>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品名称：<el-input v-model="product.productName" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        单价：<el-input v-model="product.price" readonly style="width: 160px;" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        货号：<el-input v-model="product.productNumber" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        规格：<el-input v-model="product.productModel" readonly style="width: 160px;" />
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        颜色：<el-input v-model="product.productColor" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        上市日期：<el-input v-model="product.marketDate" readonly style="width: 160px;" /></p>

    
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        主要材料：<el-input v-model="product.productMaterials" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品图片：<el-image style="width: 100px; height: 50px" :src="require('@/dir/imgs/'+product.image)" :preview-src-list="[require('@/dir/imgs/'+product.image)]" /></p>
      
           <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        适用范围：<el-input v-model="product.productUser" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        分类：<el-input v-model="product.classes" readonly style="width: 160px;" /></p>

      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        销量：<el-input v-model="product.sellVolume" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        库存：<el-input v-model="product.counts" readonly style="width: 160px;" /></p>

             <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        审核状态：<el-input v-model="product.status" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        上架状态：<el-input v-model="product.upStatus" readonly style="width: 160px;" /></p>








</div>
</template>
<script>

export default {
   

    data(){
        return{
            product:{}

        };

    },props:[
        'onePid'

    ],methods:{


        query(){
            const that = this;

          this.$axios.get("http://localhost:8081/product/queryProductById", {
          params: {
            pid:that.onePid,
            
          }
        })
        .then(function(res) {
          that.product = res.data[0];
        })
        .catch(function(error) {
          console.log(error);
        });
            }



    },mounted(){
        this.query()
    }
    
}
</script>
<style scoped>

</style>