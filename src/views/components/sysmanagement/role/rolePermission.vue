<template>
<div id="app">


<el-dialog title="添加角色" :visible.sync="showAdd" v-if="showAdd" center width="25%">
    <el-form :model="role" :rules="rules" ref="role" class="demo-ruleForm">
   <el-form-item label="角色名称:" prop="roleName">
                  <el-input v-model="role.roleName" style="width:200px" placeholder="请输入角色名称"></el-input>
   </el-form-item>
<el-form-item label="是否可用:">
      <el-switch
                  v-model="role.status"
                  :active-value="1"
                  :inactive-value="2">
                </el-switch>
   </el-form-item>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-button @click="reback()">取 消</el-button>
    <el-button type="primary" @click="add('role')">确 定</el-button>
</el-form>
</el-dialog>




<el-dialog title="修改" :visible.sync="showUpdate" v-if="showUpdate" center width="25%">
   <el-form >
        <el-form-item label="角色名称:">
                        <el-input v-model="role.roleName" style="width:200px" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button @click="rebackUpdate()">取 消</el-button>
            <el-button type="primary" @click="addUpdate()">确 定</el-button>
   </el-form>
</el-dialog>



    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="角色名称:">
          <el-input  v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="refresh">刷新页面</el-button>
        </el-form-item>
</el-form>




<el-button-group>
  <el-button type="primary" size="small" @click="addRole()">添加角色</el-button>
</el-button-group>


  <el-table :data="roleList" border style="width: 100%;">
    <el-table-column type="index" label="序号" :index="indexMethod" width="400"></el-table-column>
    <el-table-column prop="roleName" label="角色名称" width="400"></el-table-column>

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
          <el-button size="mini" type="primary" @click="modelButton(scope.row)">修改</el-button>

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
          pageSize: 5,
          currentPage: 1,
          totalSize: 0,
          roleList:[],
          showAdd:false,
          showUpdate:false,
          name:"",
          role:{rid:"",roleName:""},
          rules:{
                        roleName:[
                            { required: true, message: '请输入角色名称', trigger: 'blur' }
                        ]

                 }

        }
    },
    methods:{
      query(){
             //模糊查询 当前页设置为第一页
     if(this.name != "" ){
        this.currentPage=1;
     }
      const that = this;
        this.$axios.get("http://localhost:8081/role/queryRoles", {
          params: {
            pageSize: that.pageSize,
            currentPage: that.currentPage,
            name:that.name
          }
        })
        .then(function(res) {
          that.roleList = res.data.data;
          that.totalSize = res.data.dataSize;

        })
        .catch(function(error) {
          console.log(error);
        });



      },sizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.query();
      },selectChange(){
         //模糊查询 当前页设置为第一页
             this.currentPage=1;
      },

      currentChange(page) {
        this.currentPage = page;
        this.query();
      },refresh(){
          const that = this;
      this.$axios.get("http://localhost:8081/role/queryRoles", {
          params: {
            pageSize: that.pageSize,
            currentPage: 1,
          }
        })
        .then(function(res) {
          const result = res.data;
          that.roleList = result.data;
          that.totalSize = result.dataSize;
          that.currentPage = 1;
          that.name="";

        })
        .catch(function(error) {
          console.log(error);
        });

    },changeSwitch(e){
      
      const that = this;
      this.$axios.get('http://localhost:8081/role/updateRoleStatus',{ 
                       params:{
                          status:e.status,
                          rid:e.rid
                       }
                }).then(function(res){
                   if(res.data >0 && e.status == 1){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '设置可用',
                              type: 'success'
                         });

                   }else if(res.data >0 && e.status == 2){
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '设置不可用',
                              type: 'success'
                         });

                   }else if(res.data <=0){
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
      this.showAdd=true;

    },modelButton(e){
      this.showUpdate=true;
      this.role.rid=e.rid;
      this.role.roleName=e.roleName;
    },addRole(){
        this.role.roleName="";
        this.showAdd=true;
    },reback(){
         this.showAdd=false;
    },rebackUpdate(){
      this.showUpdate=false;
    },addUpdate(){

      const that = this;
      this.$axios.get('http://localhost:8081/role/updateRoleName',{ 
                       params:{
                          roleName:that.role.roleName,
                          rid:that.role.rid
                       }
                }).then(function(res){
                   if(res.data >0 ){
                        that.$message({
                              showClose:true,
                              duration:1000,
                              message: '修改成功',
                              type: 'success'
                         });
                         that.showUpdate=false;
                         that.query()
                   }else if(res.data =0){
                       that.$message({
                              showClose:true,
                              duration:1000,
                              message: '修改失败',
                              type: 'success'
                         });
                   }
                }).catch(function (error) {
                    console.log(error);
                });
    }
    
    ,add(formName){
             this.$refs[formName].validate((valid) => {
          if (valid) {


               let formData = new FormData;
                for(const key in this.role){
                    formData.set(key,this.role[key]);
                }
                const that=this;
                this.$axios({
                    method:"post",
                    url:"http://localhost:8081/role/addRole",
                    //  headers: {
                    //      "Content-Type": "multipart/form-data"
                    //  },
                  //   withCredentials:true,
                    data:formData
                }).then((res)=>{
                    if(res.data != 0){
                          that.$message({
                        showClose:true,
                        duration:1000,
                         message: '添加成功',
                         type: 'success'
                    });
                    that.query();
                    that.role={};
                    that.showAdd=false;
                    }else{
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
        }

    },
    mounted(){
      this.query();
     

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