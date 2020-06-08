<template>
  <div id="app">


      <el-table :data="productList">
      <el-table-column prop="productName" label="商品名称" width="90"></el-table-column>
      <el-table-column prop="productNumber" label="货号" width="90"></el-table-column>
      <el-table-column prop="image" label="图片" width="175">
        <template slot-scope="scope" class="demo-image__preview">
          <el-image
            :src="require('@/dir/imgs/'+scope.row.image)"
            :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
            style="width:150px;height:80px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="className" label="分类" width="90"></el-table-column>
      <el-table-column prop="sellVolume" label="销量" width="90"></el-table-column>
         <el-table-column prop="status" label="审核状态" width="90">
              <template slot-scope="scope">
           <el-tag  v-if="scope.row.status == 1 " type="success">已审核</el-tag>
           <el-tag  v-if="scope.row.status == 2 " type="danger">未审核</el-tag>
           <el-tag  v-if="scope.row.status == 0 " type="danger">已拒绝</el-tag>
              </template>
      </el-table-column>
      <el-table-column prop="upStatus" label="上架状态" width="90">
        <template slot-scope="scope">   
           <el-tag  v-if="scope.row.upStatus == 1 " type="success">已上架</el-tag>
           <el-tag  v-if="scope.row.upStatus == 2 " type="danger">未上架</el-tag>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>



export default {
  data() {
    return {
      productList: [],
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,


    };
  },props:[
        'pid'
    ],
  methods: {
    query: function(e) {
      const that = this;
      this.$axios.get("http://localhost:8081/product/queryProductById", {
          params: {
           pid:that.pid
          }
        })
        .then(function(res) {
          that.productList = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
        },
       


      
  mounted() {
    this.query();
  }
};
</script>

<style scoped>
#app{
  position: absolute;
  left: 20px;
  top: 10px;
}
</style>