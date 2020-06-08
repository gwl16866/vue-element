<template>
<div id="app">


  <div id="step">
    <el-steps :active="active" finish-status="success" space="300px">
          <el-step title="选择商品分类"></el-step>
          <el-step title="填写商品信息"></el-step>
          <el-step title="填写商品属性"></el-step>
    </el-steps>
    {{active}}

  </div>

<el-form >
      <div id="cla" v-show="claShow">
         <el-form-item label="类别:">
            <el-select v-model="product.classes" placeholder="请选择商品分类">
                             <el-option
                                    v-for="item in classes"
                                    :key="item.id"
                                    :label="item.className"
                                    :value="item.id">
                            </el-option>
            </el-select>
          </el-form-item>
          <div id="but">
              <el-button type="primary" style="margin-top: 12px;" @click="before" v-if="active > 0">上一步</el-button>
              <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active < 2">下一步</el-button>
              <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active == 2">完成</el-button>
               <el-button  style="margin-top: 12px;" @click="clear">清空</el-button>
          </div>
       </div>

      <div id="info" v-show="infoShow">
          
               <el-form-item label="商品分类：">
                     <el-select disabled v-model="product.classes" placeholder="请选择商品分类">
                             <el-option
                                    v-for="item in classes"
                                    :key="item.id"
                                    :label="item.className"
                                    :value="item.id">
                            </el-option>
                     </el-select>
               </el-form-item>
                 <el-form-item label="商品名称：">
                  <el-input v-model="product.empName" placeholder="请输入商品名称" style="width:200px"></el-input>
                 </el-form-item>

                 <el-form-item label="商品单价：">
                  <el-input v-model="product.empName" placeholder="请输入商品单价" style="width:200px"></el-input>
                 </el-form-item>


                 <el-form-item label="商品货号：">
                  <el-input v-model="product.empName" placeholder="请输入商品货号" style="width:200px"></el-input>
                 </el-form-item>






          <div class="but">
              <el-button type="primary" style="margin-top: 12px;" @click="before" v-if="active > 0">上一步</el-button>
              <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active < 2">下一步</el-button>
              <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active == 2">完成</el-button>
               <el-button  style="margin-top: 12px;" @click="clear">清空</el-button>
          </div>

      </div>

      
      <div id="model" v-show="modelShow">

              model


       <div class="but">
              <el-button type="primary" style="margin-top: 12px;" @click="before" v-if="active > 0">上一步</el-button>
              <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active < 2">下一步</el-button>
              <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active == 2">完成</el-button>
               <el-button  style="margin-top: 12px;" @click="clear">清空</el-button>
          </div>



      </div>

       
</el-form>








</div>
  
</template>

<script>
export default {
     data(){
        return{
          active:0,
          claShow:true,
          infoShow:false,
          modelShow:false,
          classes:[],
          product:{},
          classesSelectStatus:false
            

        }
    },
    methods:{
       next() {
        this.active=this.active+1;
        if(this.active==0){
          this.claShow=true;
          this.infoShow=false;
          this.modelShow=false;
        }
        if(this.active==1){
          this.claShow=false;
          this.infoShow=true;
          this.modelShow=false;
        }
        if(this.active==2){
          this.claShow=false;
          this.infoShow=false;
          this.modelShow=true;
        }
      },
      before(){
         this.active=this.active-1;
        if(this.active==0){
          this.claShow=true;
          this.infoShow=false;
          this.modelShow=false;
        }
        if(this.active==1){
          this.claShow=false;
          this.infoShow=true;
          this.modelShow=false;
        }
        if(this.active==2){
          this.claShow=false;
          this.infoShow=false;
          this.modelShow=true;
        }
      },queryClasses(){
       const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryClasses", {
        })
        .then(function(res) {
          that.classes = res.data;
        })
    },clear(){
      this.product={};

    }

   


    },
    mounted(){
     this.queryClasses();

    }
    
    
}
</script>

<style scoped>
#step{
  position: relative;
  left:270px;
}

#cla{
  position: relative;
  top:100px;
  left:450px;
}

#info{
  position: relative;
  top:100px;
  left:450px;
}

#model{
  position: relative;
  top:100px;
  left:450px;
}



#but{
  position: relative;
  top:100px;
  left:70px;
}




</style>