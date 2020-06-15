<template>
<div id="app">
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
        width="220"
      />
      <el-table-column
        prop="userName"
        label="用户名"
        width="220"
      />
      <el-table-column
        prop="password"
        label="用户密码"
        width="220"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="220"
        :formatter="formatStatus"
      />
      <el-table-column
        prop="phoneNo"
        label="手机号"
        width="220"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="220"
      />
      <el-table-column
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="upd(scope.row)"
          >
            编辑
          </el-button>
          ||    <el-button
            type="text"
            size="small"
            @click="del(scope.row,scope.row)"
          >
            删除
          </el-button>
        ||  <el-button
            type="text"
            @click="add(scope.row)"
          >
            添加用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>

 <el-form
      v-show="isform"
      ref="form"
      :model="user"
      label-width="80px"
    >
      <el-form-item label="用户ID">
        <el-input v-model="user.uid" />
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="user.userName" />
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="user.password" />
      </el-form-item>
      <el-form-item label="性别">
       <!--  <el-input v-model="user.sex" /> -->
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
      <el-form-item>
        <el-button
          type="primary"
          @click="onbutton()"
        >
          创建
        </el-button>
      </el-form-item>
    </el-form>


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
         tableData: []
        }
    },
    mounted() {
    this.loadDate()
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
      this.istable = false
      this.isform = true
      console.log(row)
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
          email: a.user.email
        }

      })
        .then(function(response) {
          a.isform = false
          a.istable = true
          a.loadDate()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    del: function(c, a) {
        var a = this
      this.$axios.get('http://localhost:8081/system/user/del', {
        params: {
          uid: c.uid
        }
      })
        .then(function(response) {
          a.loadDate()
        })
        .catch(function(error) {
          console.log(error)
        })
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
			},


    }
    
    
    
}
</script>

<style scoped>

</style>