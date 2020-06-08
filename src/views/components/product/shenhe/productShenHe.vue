<template>
  <div id="app">


<el-dialog title="商品详情" :visible.sync="showDialog" v-if="showDialog">
 
   <div class="el-dialog-div">
     <br>
        <showOneTable :pid='pid'></showOneTable>


  </div> 
</el-dialog>




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

    <el-form-item>
    <el-button type="primary" @click="refresh">刷新页面</el-button>
  </el-form-item>
</el-form>


  </el-header>
  <el-container>
    <el-aside width="115px">
      <br>
      <br>
     

    <el-button type="primary" @click="query(2)">已审核</el-button><br><br>
    <el-button type="primary" @click="query(3)">待审核</el-button><br><br>
    <el-button type="primary" @click="query(4)">已拒绝</el-button><br><br>
      
      </el-aside>
      <el-main>

<el-button-group>
  <el-button type="primary" size="mini" @click="ControlSome('shenhe')" >批量审核</el-button>
  <el-button type="primary" size="mini" @click="ControlSome('jujue')" >批量拒绝</el-button>
</el-button-group>

  

      <el-table :data="productList" border style="width: 100%;" max-height="400" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column type="index" label="序号" :index="indexMethod" width="100"></el-table-column>
      <el-table-column prop="productName" label="商品名称" width="100"></el-table-column>
      <el-table-column prop="productNumber" label="货号" width="100"></el-table-column>
      <el-table-column prop="image" label="图片" width="175">
        <template slot-scope="scope" class="demo-image__preview">
          <el-image
            :src="require('@/dir/imgs/'+scope.row.image)"
            :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
            style="width:150px;height:80px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="className" label="分类" width="100"></el-table-column>
      <el-table-column prop="sellVolume" label="销量" width="100"></el-table-column>
         <el-table-column prop="status" label="审核状态" width="100">
              <template slot-scope="scope">
        <template>
           <el-tag  v-if="scope.row.status == 1 " type="success">已审核</el-tag>
           <el-tag  v-if="scope.row.status == 2 " type="danger">未审核</el-tag>
           <el-tag  v-if="scope.row.status == 0 " type="danger">已拒绝</el-tag>
        </template>
              </template>
      </el-table-column>
      <el-table-column prop="upStatus" label="上架状态" width="100">
        <template slot-scope="scope">
              <el-tooltip :content="scope.row.upStatus=='1' ? '已上架' : '未上架' " placement="top">
                <el-switch
                  v-model="scope.row.upStatus"
                  :active-value="1"
                  :inactive-value="2"
                  @change="changeSwitch(scope.row)">
                </el-switch>
              </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="showOne(scope.row)" >查看</el-button>


          <el-button size="mini" type="primary" @click="shenheButton(scope.row)" v-if="scope.row.status != 1">审核</el-button>


          <el-button size="mini" type="danger" @click="jujueButton(scope.row)" v-if="scope.row.status != 0">拒绝</el-button>
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
import { array } from 'jszip/lib/support';
import qs from 'qs';
import showOneTable from '@/views/components/product/shenhe/showOneProduct.vue';


export default {
      components:{
        showOneTable
    },

  data() {
    return {
      productList: [],
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      product: { productName: "", classes: "" },
      classes:[],
      upStatus:"",
      pid:"",
      shangjia:"",
      shenhe:"",
      idss:[],
      showDialog:false,
      open1:false


    };
  },
  methods: {
    changeSwitch(e){
      
      const that = this;
      this.$axios.get('http://localhost:8081/product/updateUpStatusById',{ 
                       params:{
                          upStatus:e.upStatus,
                          pid:e.pid
                       }
                }).then(function(res){
                   if(res.data.code == 200 && e.upStatus == 1){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '上架成功',
                              type: 'success'
                         });

                   }else if(res.data.code == 200 && e.upStatus == 2){
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '下架成功',
                              type: 'success'
                         });

                   }else if(res.data.code == 400){
                         that.$message({
                              showClose:true,
                              duration:1000,
                              message: '操作失败',
                              type: 'error'
                         });

                   }
                }).catch(function (error) {
                    console.log(error);
                });

    }
    ,handleSelectionChange(val) {
            const ids=new Array();
          val.forEach(row => {
           ids.push(row.pid)
          });
          this.idss=ids;
        
      },
    query: function(e) {
     if(e != null && e != ""){
       if(e == 2){
         this.shenhe=1;
       }else if(e == 3){
         this.shenhe=2;
       }else if(e == 4){
         this.shenhe=0;
       }
     }
      const that = this;
      this.$axios.get("http://localhost:8081/product/queryProduct", {
          params: {
            pageSize: that.pageSize,
            currentPage: that.currentPage,
            productName:that.product.productName,
            classes:that.product.classes,
            status:that.shenhe,
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
    },showOne(e){
      this.pid = e.pid;
      this.showDialog=true;
    }
    
    
    ,queryClasses(){
       const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryClasses", {
        })
        .then(function(res) {
          that.classes = res.data;
        })
    },
    shenheButton(e) {
      this.$confirm('确定审核通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const that = this;
            this.$axios.get('http://localhost:8081/product/updateStatusById',{ 
                       params:{
                          pid:e.pid,
                          status:1   
                       }
                }).then(function(res){
                   if(res.data.code == 200){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '审核成功',
                              type: 'success'
                         });
                         that.query();
                   }else{
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '审核失败',
                              type: 'error'
                         });

                   }
                }).catch(function (error) {
                    console.log(error);
                });
        }).catch(() => {
          this.$message({
            type: 'info',
             showClose:true,
             duration:1000,
            message: '已取消审核'
          });          
        });


    }, jujueButton(e) {
      this.$confirm('确定拒绝?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const that = this;
            this.$axios.get('http://localhost:8081/product/updateStatusById',{ 
                       params:{
                          pid:e.pid,
                          status:0   
                       }
                }).then(function(res){
                   if(res.data.code == 200){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '拒绝成功',
                              type: 'success'
                         });
                         that.query();
                   }else{
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '拒绝失败',
                              type: 'error'
                         });

                   }
                }).catch(function (error) {
                    console.log(error);
                });
        }).catch(() => {
          this.$message({
            type: 'info',
             showClose:true,
             duration:1000,
            message: '已取消拒绝'
          });          
        });


    },
    
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
    },refresh(){
          const that = this;
      this.$axios.get("http://localhost:8081/product/queryProduct", {
          params: {
            pageSize: that.pageSize,
            currentPage: 1,
          }
        })
        .then(function(res) {
          const result = res.data;
          that.productList = result.data;
          that.totalSize = result.dataSize;
          that.currentPage = 1;
          that.product.productName="";
          that.product.classes="";
          that.shenhe="";

        })
        .catch(function(error) {
          console.log(error);
        });

    },ControlSome(e){
        if(this.idss == null || this.idss == ""){
           this.$message({
                              showClose:true,
                              duration:1000,
                              message: '请先选择',
                              type: 'error'
                         });

        }else{
          const that = this;
           if(e == 'shenhe'){
                this.$axios.get("http://localhost:8081/product/controlSomeStatus", {
          params: {
            type:"shenhe",
            ids:that.idss
          },
          paramsSerializer:params => {
            return qs.stringify(params,{indices: false})
          }
         
        })
        .then(function(res) {
            if(res.data.code == 200){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '批量审核成功',
                              type: 'success'
                         });
                         that.query();
                   }else{
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '批量审核失败',
                              type: 'error'
                         });

                   }
        })
        .catch(function(error) {
          console.log(error);
        });
        }else if(e == 'jujue'){
              this.$axios.get("http://localhost:8081/product/controlSomeStatus", {
          params: {
            type:"jujue",
            ids:that.idss
          },
          paramsSerializer:params => {
            return qs.stringify(params,{indices: false})
          }
         
        })
        .then(function(res) {
                if(res.data.code == 200){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '批量拒绝成功',
                              type: 'success'
                         });
                         that.query();
                   }else{
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '批量拒绝失败',
                              type: 'error'
                         });

                   }
        })
        .catch(function(error) {
          console.log(error);
        });


        }
        }
       


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

  .el-dialog-div{
      height: 35vh;
      overflow: auto;
    }


</style>



