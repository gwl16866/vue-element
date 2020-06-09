<template>
    
<el-form>


   <el-form-item label="类别名称:">
                  <el-input v-model="classes.className" placeholder="请输入类别名称"></el-input>
   </el-form-item>


<el-form-item label="是否可用:">
      <el-switch
                  v-model="classes.status"
                  :active-value="1"
                  :inactive-value="2">
                </el-switch>
   </el-form-item>




</el-form>


</template>




<script>
export default {
    data(){
        return{
            classes:{}

        }
    }
    
}
</script>


<style scoped>

</style>