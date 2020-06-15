<template>
<div>
    
<el-form :model="classes" :rules="rules" ref="classes" class="demo-ruleForm">


   <el-form-item label="类别名称:" prop="className">
                  <el-input v-model="classes.className" style="width:200px" placeholder="请输入类别名称"></el-input>
   </el-form-item>


<el-form-item label="是否可用:">
      <el-switch
                  v-model="classes.status"
                  :active-value="1"
                  :inactive-value="2">
                </el-switch>
   </el-form-item>



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-button @click="reback()">取 消</el-button>
    <el-button type="primary" @click="add('classes')">确 定</el-button>


</el-form>



</div>
</template>




<script>
export default {
    data(){
        return{
            classes:{
                className:''

            },rules:{
        className:[
            { required: true, message: '请输入类别名称', trigger: 'blur' }
        ]




    }

        }
    },methods:{

        reback(){
            this.$emit("add","reback");
        },
        
        add(formName){
             this.$refs[formName].validate((valid) => {
          if (valid) {


               let formData = new FormData;
                for(const key in this.classes){
                    formData.set(key,this.classes[key]);
                }
                const that=this;
                this.$axios({
                    method:"post",
                    url:"http://localhost:8081/product/addClasses",
                     headers: {
                         "Content-Type": "multipart/form-data"
                     },
                  //   withCredentials:true,
                    data:formData
                }).then((res)=>{
                    if(res.data.code == 200){
                        this.$emit("add","success");
                    }else{
                        this.$emit("add","error");
                    }
                });


          } else {
            console.log('error submit!!');
            return false;
          }

              });


            


        }



    }
    
}
</script>


<style scoped>

</style>