<template>
<div id="app">

    <el-form :inline="true" class="demo-form-inline">

  <el-form-item label="商品分类">
     <el-select v-model="classId" filterable placeholder="请选择">
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

<el-button-group>
  <el-button type="primary" size="small" @click="addClass()">批量上架</el-button>
 
</el-button-group>


  <el-table :data="classesList" border style="width: 100%;">
    <el-table-column type="index" label="序号" :index="indexMethod" width="400"></el-table-column>
    <el-table-column prop="className" label="类别名称" width="400"></el-table-column>

   <el-table-column prop="status" label="是否可用" width="100">
        <template slot-scope="scope">
              <el-tooltip :content="scope.row.status=='1' ? '可用' : '不可用' " placement="top">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="2"
                  @change="changeSwitch(scope.row)">
                </el-switch>
              </el-tooltip>
        </template>
      </el-table-column>

         <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">规格</el-button>

          <el-button size="mini" type="primary" @click="handleDelete(scope.row)">颜色</el-button>
        </template>
      </el-table-column>


  </el-table>



    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
    ></el-pagination>




</div>
  
</template>

<script>
export default {
     data(){

        return{
          classesList:[],
          classes:[],
          pageSize: 5,
          currentPage: 1,
          totalSize: 0,
          classId:""
            

        }
    },
    methods:{
      query(){
      const that = this;
        this.$axios.get("http://localhost:8081/product/queryClassesTable", {
          params: {
            pageSize: that.pageSize,
            currentPage: that.currentPage,
            classId:that.classId
          }
        })
        .then(function(res) {
          that.classesList = res.data.data;
          that.totalSize = res.data.dataSize;

        })
        .catch(function(error) {
          console.log(error);
        });



      },sizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.query();
      },

      currentChange(page) {
        this.currentPage = page;
        this.query();
      },queryClasses(){
       const that = this;
      this.$axios.get("http://localhost:8081/product/queryClasses", {
        })
        .then(function(res) {
          that.classes = res.data;
        })
    },refresh(){
          const that = this;
      this.$axios.get("http://localhost:8081/product/queryClassesTable", {
          params: {
            pageSize: that.pageSize,
            currentPage: 1,
          }
        })
        .then(function(res) {
          const result = res.data;
          that.classesList = result.data;
          that.totalSize = result.dataSize;
          that.currentPage = 1;
          that.classId="";

        })
        .catch(function(error) {
          console.log(error);
        });

    },changeSwitch(e){
      
      const that = this;
      this.$axios.get('http://localhost:8081/product/updateClassStatus',{ 
                       params:{
                          status:e.status,
                          id:e.id
                       }
                }).then(function(res){
                   if(res.data.code == 200 && e.status == 1){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '设置可用',
                              type: 'success'
                         });

                   }else if(res.data.code == 200 && e.status == 2){
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '设置不可用',
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

    },indexMethod(index) {
      return index + 1;
    },addClass(){
      
    }

   


    },
    mounted(){
      this.query();
      this.queryClasses();
     

    }
    
    
}
</script>

<style scoped>
#app{
  position: absolute;
  left: 20px;
  top: 10px;
}
</style>