<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
    <el-button type="primary" @click="add()"><i class="el-icon-plus">新增</i></el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="seckills.title" placeholder="活动名称" @change="putChange"/>
        </el-col>
      </el-form-item>
      <el-form-item label="活动状态">
        <el-col :span="30">
          <el-select v-model="seckills.status" placeholder="全部" @change="putChange">
            <el-option label="活动进行中" value="1" />
            <el-option label="活动已结束" value="2" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker v-model="seckills.starTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="putChange"/>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
             <el-date-picker v-model="seckills.endTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="putChange"/>
        </el-col>
      </el-form-item>
      <el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="selectSeckill()"><i class="el-icon-search">搜索</i></el-button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <el-button type="primary" @click="refresh()"><i class="el-icon-refresh-left">刷新</i></el-button>
      </el-form-item>
    </el-form>





    <el-table :data="seckillList" border style="width: 100%">
      <el-table-column prop="seckillId" label="编号" width="165" />
      <el-table-column prop="title" label="活动标题" width="165"></el-table-column>
      <el-table-column label="活动状态" width="165">
        <template slot-scope="scope">
           <span v-show="scope.row.status==1">活动进行中</span>
           <span v-show="scope.row.status ==2">活动已结束</span>
        </template>
      </el-table-column>
      <el-table-column prop="starTime" label="开始日期" width="165"></el-table-column>
      <el-table-column prop="endTime"  label="结束日期" width="165"></el-table-column>
      <el-table-column label="开始/结束时间" width="165">
      <template slot-scope="scope">
          {{scope.row.seckillStarTime}}-{{scope.row.seckillEndTime}}
      </template>
      </el-table-column>
      <el-table-column prop="counts" label="商品数量" width="165"></el-table-column>
      <el-table-column label="上架/下架" width="165">
        <template slot-scope="scope">
           <el-switch
            v-model="scope.row.putOrNot"
            on-color="#00A854"
            :active-value=1
            off-color="#F04134"
            :inactive-value=2
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作信息" width="165">
           <template slot-scope="scope">
              <el-button type="text" size="small" @click="addProduct(scope.row.seckillId)">
                <span v-show="scope.row.status==1">添加商品</span><span v-show="scope.row.status !=1"> </span>
              </el-button>
              <el-button type="text" size="small" @click="productSeckill(scope.row.seckillId)">商品列表</el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="del(scope.row.seckillId)">删除</el-button>
            </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>



    <el-dialog v-if="dialogVisible2" title="新增秒杀活动" :visible.sync="dialogVisible2">
      <el-form>
          <el-form-item label="活动标题：">
              <el-input v-model="seckill2.title"  style="width: 300px;" />
          </el-form-item>
          <el-form-item label="活动日期：">
           <el-col :span="11">
                <el-date-picker v-model="seckill2.starTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"/>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-date-picker v-model="seckill2.endTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" />
            </el-col>
          </el-form-item>
          <el-form-item label="活动时间：">
              <el-col :span="11">
              <el-time-picker
                arrow-control
                v-model="seckill2.seckillStarTime"
                :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
                }"
                value-format="HH:mm:ss"
                placeholder="每日开始时间">
            </el-time-picker></el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col>
            <el-time-picker
                arrow-control
                v-model="seckill2.seckillEndTime"
                :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
                }"
                value-format="HH:mm:ss"
                placeholder="每日结束时间">
            </el-time-picker></el-col>
          </el-form-item>
        <el-button @click="dialogVisible2=false">取消</el-button>
        <el-button :plain="true" @click="addSeckill(dialogVisible2=false)" type="primary">提交</el-button>
     </el-form>
    </el-dialog>


      <el-dialog v-if="dialogVisible" title="修改活动" :visible.sync="dialogVisible">
      <el-form>
          <el-form-item label="活动标题：">
              <el-input v-model="seckill.title"  style="width: 300px;" />
          </el-form-item>
          <el-form-item label="活动日期：">
            <el-date-picker  v-model="seckill.starTime" value-format="yyyy-MM-dd" />
            -
            <el-date-picker  v-model="seckill.endTime" value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item label="活动时间：">
             
              <el-time-picker
                arrow-control
                v-model="seckill.seckillStarTime"
                :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
                }"
                value-format="HH:mm:ss">
            </el-time-picker>
            -
            <el-time-picker
                arrow-control
                v-model="seckill.seckillEndTime"
                :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
                }"
                value-format="HH:mm:ss">
            </el-time-picker>
          </el-form-item>
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button :plain="true" type="primary" @click="submitEdit(dialogVisible=false)">提交</el-button>
      </el-form>
    </el-dialog>


    <el-dialog v-if="dialogProduct" title="商品列表" :visible.sync="dialogProduct">
      <el-table :data="productList" border style="width: 100%;">
      <el-table-column prop="productNumber" label="编号" width="90"></el-table-column>
      <el-table-column prop="productName" label="商品名称" width="80"></el-table-column>
      <el-table-column prop="seckillPrice" label="秒杀价格" width="80"></el-table-column>
      <el-table-column prop="seckillNumber" label="秒杀数量" width="80"></el-table-column>
      <el-table-column prop="residueNumber" label="剩余数量" width="80"></el-table-column>
      <el-table-column prop="purchaseNumber" label="限购数量" width="80"></el-table-column>
      <el-table-column prop="image" label="图片" width="80">
        <template slot-scope="scope" >
          <el-image
            :src="require('@/dir/imgs/'+scope.row.image)"
            :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
            style="width:150px;height:80px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="productModel" label="规格" width="80"></el-table-column>
      <el-table-column prop="productColor" label="颜色" width="80"></el-table-column>
      <el-table-column label="操作" width="  80">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="productUpdate(scope.row,updateProduct=true,dialogProduct=false)">编辑</el-button>
          <br>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

      <el-pagination
      :current-page="currentPage1"
      :page-sizes="[4, 6, 8]"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize1"
      @size-change="sizeChange1"
      @current-change="currentChange1"
    ></el-pagination>
    </el-dialog>


    
    <el-dialog v-if="updateProduct" title="编辑商品" :visible.sync="updateProduct">
      <el-form>
           <el-form-item >
             <p>商品货号： <span style="display:inline-block;width: 160px;">{{updateProductList.productNumber}}</span>
                商品名称： <span>{{updateProductList.productName}}</span></p>
          </el-form-item>
           <p><el-form-item>
               商品数量：<span style="display:inline-block;width: 160px;">{{updateProductList.counts}}</span>
               商品图片：<el-image style="width: 50px; height: 50px" :src="require('@/dir/imgs/'+updateProductList.image)" :preview-src-list="[require('@/dir/imgs/'+updateProductList.image)]" />
          </el-form-item></p>
           <p><el-form-item >
             商品规格：<span style="display:inline-block;width: 160px;">{{updateProductList.productModel}}</span>
             商品颜色：<span style="display:inline-block;width: 160px;">{{updateProductList.productColor}}</span>
          </el-form-item></p>
          <p> <el-form-item >
              秒杀价格：<el-input v-model="updateProductList.seckillPrice"   style="width: 160px;" />
              秒杀数量：<el-input v-model="updateProductList.seckillNumber"   style="width: 160px;" @input="number"/>
          </el-form-item></p>
          <p> <el-form-item>
              剩余数量：<el-input v-model="updateProductList.residueNumber"   style="width: 160px;"/>
              限购数量：<el-input v-model="updateProductList.purchaseNumber"   style="width: 160px;"  @input="number"/>
          </el-form-item></p>
    <el-button size="mini" @click="updateProduct=false">取消</el-button>
    <el-button size="mini" type="primary" @click="updateProductSubmint(updateProduct=false)">提交</el-button>
    </el-form>
</el-dialog>




<el-dialog v-if="dialogVisibleadd" title="添加商品" :visible.sync="dialogVisibleadd">
      <el-form>
      <el-table :data="allProduct" border style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="pid" label="编号" width="90"></el-table-column>
      <el-table-column prop="productName" label="商品名称" width="80"></el-table-column>
      <el-table-column prop="productNumber" label="编号" width="90"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="counts" label="库存" width="80"></el-table-column>
      <el-table-column prop="classes" label="分类" width="80"></el-table-column>
      <el-table-column prop="image" label="图片" width="80">
        <template slot-scope="scope" >
          <el-image
            :src="require('@/dir/imgs/'+scope.row.image)"
            :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
            style="width:150px;height:80px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="productModel" label="规格" width="80"></el-table-column>
      <el-table-column prop="productColor" label="颜色" width="80"></el-table-column>
      </el-table>

    <el-pagination
          :current-page="currentPage2"
          :page-sizes="[4, 6, 8]"
          :page-size="pageSize2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize2"
          @size-change="sizeChange2"
          @current-change="currentChange2"
        ></el-pagination>

        <el-button @click="quxiao()">取消</el-button>
        <el-button :plain="true" @click="submitProduct()">添加</el-button>
      </el-form>
    </el-dialog>

  <el-dialog title="修改书籍" :visible.sync="dialogsubmitProduct" v-if="dialogsubmitProduct" width="60%">
   <addSeckillProduct :batchList="batchList" :seckillId="seckillId" @back="listener"></addSeckillProduct>
  </el-dialog>
  </div>
</template>

<script>
import addSeckillProduct from '@/views/components/run/addSeckillProduct.vue'
import qs from 'qs'
export default {
  data() {
    return {
     seckillList:[],
     productList:[],
     allProduct:[],
      batchList: [],
      seckills:{ title:'' , status:'',  starTime:'',endTime:''},
     seckill:{ seckillId:'', title:'' , status:'',  starTime:'',  endTime:'', putOrNot:'', seckillStarTime:'',  seckillEndTime:''},
      seckill2:{ seckillId:'', title:'' , status:'',  starTime:'',  endTime:'', putOrNot:'', seckillStarTime:'',  seckillEndTime:''},
     pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      dialogVisible2:false,
      dialogVisible:false,
      dialogVisibleadd:false,
      dialogProduct:false,
      updateProduct:false,
      dialogsubmitProduct:false,
      title:'',
      starTime:'',
      endTime:'',
      seckillStarTime:'',
      seckillEndTime:'',
      counts:'',
      seckillId:'',
       pageSize1: 4,
      currentPage1: 1,
      totalSize1: 0,
      pageSize2: 4,
      currentPage2: 1,
      totalSize2: 0,
      updateProductList:{productNumber:'',productName:'',image:'',productModel:'',productColor:'',seckillPrice:'',seckillNumber:'',residueNumber:'',purchaseNumber:''}
    }
  },
  mounted() {
    this.selectSeckill()
  },
   components:{
      addSeckillProduct
    },
  methods: {
StrToGMT(time){
    let GMT = new Date(time)
    return GMT
},
    selectSeckill: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectSeckill', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          title: this.seckills.title,
          status: this.seckills.status,
          starTime: this.seckills.starTime,
          endTime:this.seckills.endTime
        }
      })
        .then(function(res) {
          console.log(res)
          const result = res.data
          qwe.seckillList = result.data
          qwe.totalSize = result.dataSize;
        }).catch(function(err) {
          console.log(err)
        })
    },
    //取消
    quxiao:function(){
      this.dialogVisibleadd=false,
      this.batchList=''
    },
    //主页面分页
    sizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.selectSeckill()
    },
    currentChange(page) {
      this.currentPage = page
      this.selectSeckill()
    },
//商品列表页数
    sizeChange1(size) {
      this.pageSize1 = size
      this.currentPage1 = 1
      this.productSeckill(this.seckillId)
    },
    currentChange1(page) {
      this.currentPage1 = page
      this.productSeckill(this.seckillId)
    },
    //添加商品列表页数
    sizeChange2(size) {
      this.pageSize2 = size
      this.currentPage2 = 1
      this.addProduct(this.seckillId)
    },
    currentChange2(page) {
      this.currentPage2 = page
      this.addProduct(this.seckillId)
    },
    refresh: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectSeckill', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.seckillList = result.data
          qwe.totalSize = result.dataSize;
          qwe.seckills.title='',
          qwe.seckills.status='',
          qwe.seckills.starTime='',
          qwe.seckills.endTime=''
        }).catch(function(err) {
          console.log(err)
        })
    },
    changeStatus: function(data) {
      
      if(data.status==1){
 const asd = this
      this.$axios.get('http://localhost:8081/re/returnthings/putOrNot', {
        params: {
          seckillId: data.seckillId,
          putOrNot: data.putOrNot,
          starTime:data.starTime,
          endTime:data.endTime
        }
      })
        .then(function(res = 1) {
          var str = ''
          if (data.putOrNot === 1) {
            str = '上架成功'
          } else {
            str = '下架成功'
          }
          asd.$message({
            message: str,
            type: 'success'
          })
          console.log(res)
        }).catch(function(err) {
          console.log(err)
        })
      }else{
        const asd = this
        data.putOrNot=2;
        asd.$message({
            message: '该活动已结束！暂不能上架',
            type: 'success'
          })
      }
     
    },
     add: function() {
      this.dialogVisible2 = true
    },
    addSeckill: function(e) {
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnthings/addSeckill', {
        params: {
          title: this.seckill2.title,
          starTime:this.seckill2.starTime,
          endTime:this.seckill2.endTime,
          seckillStarTime:this.seckill2.seckillStarTime,
          seckillEndTime:this.seckill2.seckillEndTime
        }
      }).then(function(res = 1) {
        asd.selectSeckill()
        asd.$message({
          message: '添加成功',
          type: 'success'
        })
      }).catch(function(err) {
        console.log(err)
      })
    },
    del(e) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const asd = this
        this.$axios.get('http://localhost:8081/re/returnthings/deleteSeckill?seckillId=' + e)
          .then(function(res = 1) {
            asd.selectSeckill()
            asd.$message({
              message: '删除成功',
              type: 'success'
            })
          }).catch(function(err) {
            asd.$message({
              message: '删除失败',
              type: 'error'
            })
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          showClose: true,
          duration: 1000,
          message: '已取消删除'
        })
      })
    },
     edit: function(data) {
      this.dialogVisible = true
      this.seckill.seckillId=data.seckillId
      this.seckill.title = data.title
      this.seckill.starTime = data.starTime
      this.seckill.endTime = data.endTime
      this.seckill.seckillStarTime = data.seckillStarTime
      this.seckill.seckillEndTime = data.seckillEndTime
      this.seckill.status=data.status
      this.seckill.putOrNot=data.putOrNot
    },
    submitEdit: function(e) {
    
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnthings/updateSeckill', {
        params: {
           seckillId:this.seckill.seckillId,
           title : this.seckill.title,
           starTime : this.seckill.starTime,
           endTime : this.seckill.endTime,
           seckillStarTime : this.seckill.seckillStarTime,
           seckillEndTime:this.seckill.seckillEndTime,
           status:this.seckill.status,
           putOrNot:this.seckill.putOrNot
        }
      })
        .then(function(res = 1) {
          asd.selectSeckill()
          asd.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(function(err) {
          console.log(err)
        })
    },
    //查询当前活动的商品
  productSeckill: function(e) {
    this.dialogProduct=true
    this.seckillId=e
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/productList', {
        params: {
          pageSize: this.pageSize1,
          currentPage: this.currentPage1,
          seckillId:e
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.productList = result.data
          qwe.totalSize1 = result.dataSize;
          qwe.selectSeckill();
        }).catch(function(err) {
          console.log(err)
        })
    },
    putChange:function(){
      this.currentPage=1
    },
    //在活动中删除商品
     handleDelete(e) {
      this.$confirm('确定下架该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const asd = this
        this.$axios.get('http://localhost:8081/re/returnthings/deleterProduct?pid=' + e.pid+'&seckillId='+e.seckillId)
          .then(function(res = 1) {
            asd.productSeckill(e.seckillId)
            if(asd.totalSize==0){
              asd.dialogProduct=false
            }
            asd.$message({
              message: '删除成功',
              type: 'success'
            })
             asd.selectSeckill();
          }).catch(function(err) {
            asd.$message({
              message: '删除失败',
              type: 'error'
            })
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          showClose: true,
          duration: 1000,
          message: '已取消删除'
        })
      })
    },
     //查询所有商品
    addProduct: function(e) {
      this.seckillId=e
      this.dialogVisibleadd=true
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/allProductList', {
        params: {
          pageSize: this.pageSize2,
          currentPage: this.currentPage2
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.allProduct = result.data
          qwe.totalSize2 = result.dataSize;
        }).catch(function(err) {
          console.log(err)
        })
    },
      //循环id
    handleSelectionChange(val) {
      const bl = new Array()
      val.forEach(row => {
        bl.push(row.pid)
      })
      this.batchList = bl
    },
    //批量添加
    submitProduct() {
      if (this.batchList.length == 0) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: '请先选择',
          type: 'error'
        })
      } else {
       this.dialogsubmitProduct=true
      }
    },
    //商品列表  编辑
      productUpdate: function(data,e,d) {
        this.updateProductList.pid=data.pid
        this.updateProductList.seckillId=data.seckillId
      this.updateProductList.productNumber= data.productNumber
      this.updateProductList.seckillPrice = data.seckillPrice
 this.updateProductList.productName = data.productName
  this.updateProductList.counts = data.counts
   this.updateProductList.image = data.image
    this.updateProductList.productModel = data.productModel
     this.updateProductList.productColor = data.productColor
      this.updateProductList.seckillNumber = data.seckillNumber
this.updateProductList.residueNumber = data.residueNumber
      this.updateProductList.purchaseNumber = data.purchaseNumber
    },
    //判断数量
    number() {
      if(this.updateProductList.seckillNumber>this.updateProductList.counts){
         this.$message({
            message: '秒杀数量不能大于商品数量',
            type: 'error'
          })
      }
      if(this.updateProductList.purchaseNumber>this.updateProductList.seckillNumber){
         this.$message({
            message: '限购数量不能大于秒杀数量',
            type: 'error'
          })
      }
    },
    //提交商品修改
     updateProductSubmint: function(e) {
     if(this.updateProductList.seckillNumber>this.updateProductList.counts){
         this.$message({
            message: '秒杀数量不能大于商品数量',
            type: 'error'
          })
      }else if(this.updateProductList.purchaseNumber>this.updateProductList.seckillNumber){
         this.$message({
            message: '限购数量不能大于秒杀数量',
            type: 'error'
          })
      }else{
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnthings/updateProductSubmint', {
        params: {
         seckillPrice:this.updateProductList.seckillPrice,
         pid:this.updateProductList.pid,
         seckillNumber:this.updateProductList.seckillNumber,
         residueNumber:this.updateProductList.residueNumber,
         purchaseNumber: this.updateProductList.purchaseNumber
        }
      })
        .then(function(res = 1) {
          asd.productSeckill(asd.updateProductList.seckillId)
          asd.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(function(err) {
          console.log(err)
        })
      }
    },
    
      listener:function(val){
      if(val=="false"){
            this.dialogsubmitProduct=false;
            this.dialogVisibleadd=false;
            this.selectSeckill()
      }
    }
  }
}</script>
