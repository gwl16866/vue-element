<template>
  <div id="app">

<el-container>
  <el-header>
    <el-form :inline="true" class="demo-form-inline">
  <el-form-item label="输入搜索">
    <el-input v-model="product.productName" placeholder="名称/商品货号"></el-input>
  </el-form-item>
  <el-form-item label="商品分类">
     <el-select v-model="product.classes" filterable placeholder="请选择">
                                                <el-option
                                                        v-for="item in classes"
                                                        :key="item.id"
                                                        :label="item.className"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="query">查询</el-button>
  </el-form-item>
</el-form>


  </el-header>
  <el-container>
    <el-aside width="115px">
      <br>
    
     

    <el-button type="primary" @click="query">查询</el-button><br><br>
    <el-button type="primary" @click="query">查询</el-button><br><br>
    <el-button type="primary" @click="query">查询</el-button><br><br>
    <el-button type="primary" @click="query">查询</el-button><br><br>
      
      </el-aside>


    <el-main>




      <el-table :data="productList" border style="width: 100%" max-height="400">
      <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>

      <el-table-column prop="productName" label="商品名称" width="80"></el-table-column>
      <el-table-column prop="price" label="单价" width="80"></el-table-column>
      <el-table-column prop="productNumber" label="货号" width="80"></el-table-column>
      <el-table-column prop="status" label="审核状态" width="80">
              <template slot-scope="scope">
        <template>
           <el-tag  v-if="scope.row.status == 1 " type="success">已审核</el-tag>
           <el-tag  v-if="scope.row.status == 2 " type="danger">未审核</el-tag>


        </template>
              </template>


      </el-table-column>
      <el-table-column prop="upStatus" label="上架状态" width="80"></el-table-column>
      <el-table-column prop="image" label="图片" width="170">
        <template slot-scope="scope" class="demo-image__preview">
          <el-image
            :src="require('@/dir/imgs/'+scope.row.image)"
            :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
            style="width:150px;height:80px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="productModel" label="规格" width="80"></el-table-column>
      <el-table-column prop="productColor" label="颜色" width="80"></el-table-column>
      <el-table-column prop="marketDate" label="上市日期" width="80"></el-table-column>
      <el-table-column prop="productMaterials" label="主要材料" width="80"></el-table-column>
      <el-table-column prop="productUser" label="适用范围" width="80"></el-table-column>

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
    ></el-pagination>




    </el-main>
  </el-container>
</el-container>















    
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
      product: { productName: "", classes: "" },
      classes:[]


    };
  },
  methods: {
    query: function() {
      const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryProduct", {
          params: {
            pageSize: that.pageSize,
            currentPage: that.currentPage,
            productName:that.product.productName,
            classes:that.product.classes
          }
        })
        .then(function(res) {
          const result = res.data;
          that.productList = result.data;
          that.totalSize = result.dataSize;
        })
        .catch(function(error) {
          console.log(error);
        });
    },queryClasses(){
       const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryClasses", {
        })
        .then(function(res) {
          that.classes = res.data;
        })
       



    },
    handleEdit() {},
    handleDelete() {},
    sizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.query();
    },

    currentChange(page) {
      this.currentPage = page;
      this.query();
    },
    indexMethod(index) {
      return index + 1;
    }
  },
  mounted() {
    this.query();
    this.queryClasses();
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