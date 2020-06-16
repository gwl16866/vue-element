<template>
<div id="app">


  <el-dialog title="修改用户信息" v-if="isform" :visible.sync="isform" center>
<el-form
      v-show="isform"
      ref="form"
      :model="user"
      :inline="true"
    >
      <el-form-item label="用户ID:">
        <el-input v-model="user.uid" disabled/>
      </el-form-item>
      <el-form-item label="用户姓名:">
        <el-input v-model="user.userName" />
      </el-form-item>

      <el-form-item label="角色:">

         <el-select v-model="haveRoles" multiple placeholder="请选择">
    <el-option
      v-for="item in roles"
      :key="item.rid"
      :label="item.roleName"
      :value="item.rid">
    </el-option>
  </el-select>


      </el-form-item>


      <el-form-item label="用户密码:">
        <el-input v-model="user.password" />
      </el-form-item>
      <br>
 
      <el-form-item label="手机号:">
        <el-input v-model="user.phoneNo" />
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="user.email" />
      </el-form-item>

     <el-form-item label="性别:">
        <el-radio
          v-model="user.sex"
          :label='1'
        >
          男
        </el-radio>
        <el-radio
          v-model="user.sex"
          :label='2'
        >
          女
        </el-radio>
      </el-form-item>
      <br>
      <br>
      <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item>
         <el-button
          type="danger"
          @click="reback()"
        >
          取消
        </el-button>

        <el-button
          type="primary"
          @click="onbutton()"
        >
          修改
        </el-button>
      </el-form-item>
    </el-form>


</el-dialog>



 <el-table
      v-show="istable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />

      <el-table-column
        prop="uid"
        label="用户ID"
        width="150"
      />
      <el-table-column
        prop="userName"
        label="用户名"
        width="150"
      />
      <el-table-column
        prop="password"
        label="用户密码"
        width="150"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="150"
        :formatter="formatStatus"
      />
      <el-table-column
        prop="phoneNo"
        label="手机号"
        width="150"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="150"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="upd(scope.row)"
          >
            编辑
          </el-button>
              <el-button
            type="danger"
            size="mini"
            @click="del(scope.row,scope.row)"
          >
            删除
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="add(scope.row)"
          >
            添加用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>


 


<el-dialog title="添加用户" :visible.sync="addUser">
	<el-form label-width="100px">
			<el-input type="hidden" v-model="user.uid" ></el-input>{{user.uid}}
    <el-form-item label="用户姓名">
	  		  <el-input type="text" v-model="user.userName"></el-input>
	  </el-form-item>
	  <el-form-item label="用户密码">
	  		  <el-input type="text" v-model="user.password"></el-input>
	  </el-form-item>
     <el-form-item label="性别">
        <el-radio
          v-model="user.sex"
          label="1"
        >
          男
        </el-radio>
        <el-radio
          v-model="user.sex"
          label="2"
        >
          女
        </el-radio>
      </el-form-item>
     <el-form-item label="手机号">
        <el-input v-model="user.phoneNo" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" />
      </el-form-item>

	</el-form>
	<div slot="footer" class="dialog-footer">
		  <el-button @click="addUser = false">取消</el-button>
	  	  <el-button type="primary" @click="create()">添加</el-button>
	</div>
</el-dialog>
</div>
</template>

<script>
import qs from "qs";

export default {
     data(){
        return{
            isform: false,
            istable: true,
            checked: true,
         user:{
            uid:'',
            userName:'',
            password:'' ,
            sex:'',
            phoneNo:'',
            email:''
         },
         addUser:false,
         tableData: [],
         roles:[],
         haveRoles:[]
        }
    },
    mounted() {
    this.loadDate()
    this.queryRoles()
    },
    methods:{
     loadDate() {
      var a = this
      this.$axios.get('http://localhost:8081/system/user/listselect')
        .then(res => {
          a.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    formatStatus(row, column) {
      return row.sex === 1 ? '男' : '女'
    },
     upd(row) {
      this.user = row
      var that = this
      this.$axios.get('http://localhost:8081/role/queryRolesById', {
        params: {
          uid: row.uid
        }

      })
        .then(function(response) {
          that.haveRoles=[]
           that.haveRoles=response.data;
        })
        .catch(function(error) {
          console.log(error)
        })
      this.isform = true
    },
    onbutton() {
      var a = this
      this.$axios.get('http://localhost:8081/system/user/userupd', {
        params: {
          uid: a.user.uid,
          userName: a.user.userName,
          password: a.user.password,
          sex: a.user.sex,
          phoneNo: a.user.phoneNo,
          email: a.user.email,
          haveRoles:a.haveRoles
        },paramsSerializer: params => {
          return qs.stringify(params, { indices: false });
          }

      })
        .then(function(response) {
          a.isform = false
          a.loadDate()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    del: function(c, a) {

       this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
                 var a = this
      this.$axios.get('http://localhost:8081/system/user/del', {
        params: {
          uid: c.uid
        }
      })
        .then(function(response) {
          a.loadDate()
                   a.$message({
                  showClose: true,
                  duration: 1000,
                  message: "删除成功",
                  type: "success"
                });
        })
        .catch(function(error) {
          console.log(error)
        })

        })
        .catch(() => {
          this.$message({
            type: "info",
            showClose: true,
            duration: 1000,
            message: "已取消删除"
          });
        });



 
    },
    add(){
				this.addUser=true;
				this.user={userName:"",password:"",sex:"",phoneNo:"",email:""}
			},
			create(){
				let formData =new FormData;
				for(const key in this.user){
					formData.set(key,this.user[key]);
				}
				const that=this;
				this.$axios({
					method:"post",
					url:"http://localhost:8081/system/user/add",
					headers:{
						"Content-Type":"multipart/form-data"
					},
					data:formData
				})
				.then((res)=>{
					that.addUser=false;
					that.loadDate();
				});
			},queryRoles(){
         var that = this
      this.$axios.get('http://localhost:8081/role/queryGoodRoles', )
        .then(function(res) {
         that.roles=res.data;
        })
        .catch(function(error) {
          console.log(error)
        })
        
        
        
        },reback(){
          this.isform=false;
        }


    }
    
    
    
}
</script>

<style scoped>

</style>