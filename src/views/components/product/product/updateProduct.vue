<template>
    <div>

<el-form :inline="true" :model="product" status-icon :rules="rules" ref="product" class="demo-ruleForm">

   <el-form-item label="名称:" prop="productName">
     <el-input v-model="product.productName"  style="width: 160px;" />
   </el-form-item>


   <el-form-item label="分类:">  
     <el-select v-model="product.classes" filterable placeholder="请选择">
                                                <el-option
                                                        v-for="item in classList"
                                                        :key="item.id"
                                                        :label="item.className"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
   </el-form-item>


      <el-form-item label="货号:" prop="productNumber">
    <el-input v-model="product.productNumber" disabled style="width: 160px;" />
   </el-form-item>

         <el-form-item label="材料:" prop="productMaterials">
   <el-input v-model="product.productMaterials"  style="width: 160px;" />
   </el-form-item>



         <el-form-item label="规格:">
   <el-select v-model="product.productModel" filterable placeholder="请选择">
                                                <el-option
                                                        v-for="item in modelList"
                                                        :key="item.id"
                                                        :label="item.twoModel"
                                                        :value="item.twoModel">
                                                </el-option>
                                            </el-select>
   </el-form-item>

   <el-form-item label="单价:" prop="price">
     <el-input v-model="product.price"  style="width: 160px;" />
</el-form-item>


    <el-form-item label="人群:" prop="productUser">
       <el-input v-model="product.productUser"  style="width: 160px;" />
    </el-form-item>



         <el-form-item label="颜色:">
    <el-select v-model="product.productColor" filterable placeholder="请选择">
                                                <el-option
                                                        v-for="item in colorList"
                                                        :key="item.twoModel"
                                                        :label="item.twoModel"
                                                        :value="item.twoModel">
                                                </el-option>
                                            </el-select>
   </el-form-item>


         <el-form-item label="销量:">
    <el-input v-model="product.sellVolume" disabled style="width: 160px;" />
         </el-form-item>

              <el-form-item label="库存:" prop="counts">
     <el-input v-model.number="product.counts"  style="width: 160px;" />

         </el-form-item>



       


         <el-form-item label="上市日期:" prop="marketDate">
            <el-date-picker
                                            v-model="product.marketDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd">
                                            </el-date-picker>
         </el-form-item>



         <el-form-item label="审核状态:">
            <el-select v-model="product.status" filterable placeholder="请选择" style="width:160px">
                                                <el-option
                                                        v-for="item in shenhe"
                                                        :key="item.id"
                                                        :label="item.status"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
         </el-form-item>

          <el-form-item label="上架状态:">
               <el-select v-model="product.upStatus" filterable placeholder="请选择" style="width:160px">
                                                <el-option
                                                        v-for="item in shangjia"
                                                        :key="item.id"
                                                        :label="item.status"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
         </el-form-item>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


         <el-form-item label="商品图片:">
 <el-image style="width: 100px; height: 50px" 
 :src="require('@/dir/imgs/'+product.image)" 
 :preview-src-list="[require('@/dir/imgs/'+ product.image)]" ></el-image>
         </el-form-item>




        <el-form-item>

              <el-upload v-model="product.image"
        class="upload-demo"
        ref="upload"
        action="http://localhost:8081/product/uploadFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-sccess="uploadScuuess"
        :on-error="uploadError"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>

        </el-form-item>


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;



          <el-form-item>

                                  <el-button @click="reback()" type="danger">取 消</el-button>
                                 <el-button type="primary" @click="add('product')">确 定</el-button>


          </el-form-item>



</el-form>


 
    

                                 





</div>
</template>
<script>

export default {
   

    data(){

       var checkPrice = (rule, value, callback) => {
         let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
            if (value === '') {
                callback(new Error('请输入价格'));
            } else if (!reg.test(value)) {
                callback(new Error('价格必须为数字'));
            } else {
                callback();
            }
      };

      var checkCounts = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('库存不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value <= 0) {
              callback(new Error('库存必须大于零'));
            } else {
              callback();
            }
          }
        }, 1000);
      };



        return{
          fileList:[],
            tests:{},
            product:{},
            rules:{
               productName:[ { required: true, message: '请输入商品名称', trigger: 'blur' }],
               productMaterials:[ { required: true, message: '请输入主要材料', trigger: 'blur' }],
               productUser:[ { required: true, message: '请输入适用人群', trigger: 'blur' }],
               price:[ { validator: checkPrice , trigger: 'blur' }],
               counts:[ { validator:checkCounts, trigger: 'blur' }],
               marketDate:[ { required: true, message: '请选择上市日期', trigger: 'blur' }],
               


                  },

            classList:[],
            modelList:[],
            colorList:[],
            shenhe:[
              {id:1,status:"已审核"},
              {id:2,status:"未审核"},
              {id:0,status:"已拒绝"}
            ],
             shangjia:[
              {id:1,status:"已上架"},
              {id:2,status:"未上架"},
            ]

        };

    },props:[
        'onePid'

    ],methods:{
        uploadScuuess(val){
          if(val != null && val != ""){
            this.$message({
                      showClose: true,
                      duration: 1000,
                      message: "上传成功",
                      type: "success"
                    });
          }

      this.product.image=val;
    },uploadError(){

    },submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    
    
    reback(){
            this.$emit("LisUpdate","reback");
        },
        
        add(formName){
             this.$refs[formName].validate((valid) => {
          if (valid) {

               let formData = new FormData;
                for(const key in this.product){
                    formData.set(key,this.product[key]);
                }
                const that=this;
                this.$axios({
                    method:"post",
                    url:"http://localhost:8081/product/updateProduct",
                    //  headers: {
                    //      "Content-Type": "multipart/form-data"
                    //  },
                  //   withCredentials:true,
                    data:formData
                }).then((res)=>{
                    if(res.data == true){
                        this.$emit("LisUpdate","success");
                    }else{
                        this.$emit("LisUpdate","error");
                    }
                });


          } else {
            console.log('error submit!!');
            return false;
          }

              });
        },
       test(){
                  const that = this;
                  this.$axios.get("http://localhost:8081/product/queryProductById", {
                  params: {
                    pid:that.onePid,
                  }
                    })
                    .then(function(res) {
                      that.tests = res.data[0];
                      that.queryClassModel(that.tests.classes)
                      that.queryClassColor(that.tests.classes)
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
            }
        ,query(){
                  const that = this;
                  this.$axios.get("http://localhost:8081/product/queryProductById", {
                  params: {
                    pid:that.onePid,
                  }
                    })
                    .then(function(res) {
                      that.product = res.data[0];
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
            },queryClassModel (e) {
                  const that = this;
                this.$axios.get('http://localhost:8081/product/queryClassModelOrColor',{ 
                  params:{
                    fid:e,
                    type:1
                  }
                }).then(function(res){
                    that.modelList=res.data.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },queryClassColor (e) {
                  const that = this;
                this.$axios.get('http://localhost:8081/product/queryClassModelOrColor',{       // 还可以直接把参数拼接在url后边
                  params:{
                    fid:e,
                    type:2
                  }
                }).then(function(res){
                    that.colorList=res.data.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },queryGoodClasses () {
                  const that = this;
                this.$axios.get('http://localhost:8081/product/queryGoodClasses',{       // 还可以直接把参数拼接在url后边
                }).then(function(res){
                    that.classList=res.data;
                }).catch(function (error) {
                    console.log(error);
                });
            }


    },mounted(){
        this.test()
        this.query()
        this.queryGoodClasses()
    }
    
}
</script>
<style scoped>

</style>