<template>
<div>

    <el-button-group>
  <el-button type="primary" size="mini" @click="addModel()" >添加</el-button>
    </el-button-group>

<div v-if="showAdd">

        <el-form :model="model" :rules="rules" ref="model" class="demo-ruleForm">
           <el-form-item label="颜色:" prop="modelName">
                            <el-input v-model="model.modelName" style="width:200px" placeholder="请输入颜色"></el-input>
                    <el-button @click="showAdd = false">取 消</el-button>
                    <el-button type="primary" @click="add('model')">确 定</el-button>
            </el-form-item>
                <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                   
       </el-form>


</div>

       <el-table :data="modelList" border style="width: 100%;" height="350">
      <el-table-column type="index" label="序号" :index="indexMethod" width="200"></el-table-column>
      <el-table-column prop="twoModel" label="颜色" width="200"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="del(scope.row)" >删除</el-button>
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
            model:{
                modelName:""
            },

        rules:{
        modelName:[
            { required: true, message: '请输入颜色', trigger: 'blur' }
        ]
        },
         pageSize: 5,
         currentPage: 1,
         totalSize: 0,
         modelList:[],
         showAdd:false

        }
    },props:[
        'fid'
    ],methods:{
            query(){
                const that = this;
                this.$axios.get("http://localhost:8081/product/queryClassModel", {
                params: {
                    pageSize: that.pageSize,
                    currentPage: that.currentPage,
                    fid:that.fid,
                    type:'2'
                }
                })
                .then(function(res) {
                that.modelList = res.data.data;
                that.totalSize = res.data.dataSize;

                })
                .catch(function(error) {
                console.log(error);
                });



            }, sizeChange(size) {
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
            },addModel(){
                if(this.showAdd == true){
                this.showAdd=false;
                }else{
                    this.showAdd=true;
                }
            }, add(formName){
             this.$refs[formName].validate((valid) => {
                        if (valid) {
                            const forms= new FormData();
                         
                            forms.set("fid",this.fid)
                            forms.set("twoModel",this.model.modelName)
                            forms.set("type",2)

                                    const that=this;
                                    this.$axios({
                                        method:"post",
                                        url:"http://localhost:8081/product/addModelOrColor",
                                        // headers: {
                                        //     "Content-Type": "multipart/form-data"
                                        // },
                                    //   withCredentials:true,
                                        data:forms
                                    }).then((res)=>{
                                        if(res.data.code == 200){
                                            that.showAdd=false;
                                            that.$refs['model'].resetFields();
                                            that.query();
                                                that.$message({
                                                showClose:true,
                                                duration:1000,
                                                message: '添加成功',
                                                type: 'success'
                                            });
                                        }else{
                                           that.$refs['model'].resetFields();
                                               that.$message({
                                                showClose:true,
                                                duration:1000,
                                                message: '添加失败',
                                                type: 'error'
                                            });
                                        }
                                    });


                        } else {
                            console.log('error submit!!');
                            return false;
                        }
             
             });
    },del(e){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const that = this;
          this.$axios.get("http://localhost:8081/product/delModelOrColor", {
          params: {
            id:e.id
          }
        }).then(function(res) {
            if(res.data.code == 200){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '删除成功',
                              type: 'success'
                         });
                         that.query();
                   
                   }else{
                          that.$message({
                              showClose:true,
                              duration:1000,
                              message: '删除失败',
                              type: 'error'
                         });
                   }
        })
        .catch(function(error) {
          console.log(error);
        });
          

        }).catch(() => {
          this.$message({
            type: 'info',
             showClose:true,
             duration:1000,
            message: '已取消删除'
          });          
        });



    }


    },mounted(){
        this.query();
    }
    
}
</script>


<style scoped>

</style>