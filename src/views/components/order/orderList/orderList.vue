<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="orderOrProduct" placeholder="订单编号/商品货号"  @change="putChange" />
        </el-col>
      </el-form-item>
      <el-form-item label="收货人">
        <el-col :span="30">
          <el-input v-model="nameOrPhone" placeholder="收货人姓名/手机号码"  @change="putChange" />
        </el-col>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-col :span="11">
          <el-date-picker v-model="time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  @change="putChange"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectOrders()"><i class="el-icon-search">搜索</i></el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="refresh"><i class="el-icon-refresh-left">刷新</i></el-button>
      </el-form-item>
    </el-form>

    <el-table :data="ordersList" border style="width: 100%">
      <el-table-column prop="orderNumber" label="订单编号" width="165" />
      <el-table-column prop="submitDate" label="提交时间" width="165">
        <template slot-scope="scope">
              {{scope.row.submitDate | dateFormat}}
            </template>
      </el-table-column>
      <el-table-column prop="account" label="收货人姓名/账号" width="165" >
            <template slot-scope="scope">
              {{scope.row.cname}}({{scope.row.account}})
            </template>
      </el-table-column>
      <el-table-column prop="cphone" label="收货人手机号" width="165" />
      <el-table-column prop="sumMoney" label="订单金额" width="165" />
      <el-table-column label="订单状态" width="165">
        <template slot-scope="scope">
          <p v-if="scope.row.status=='1'">已发货</p>
          <p v-else-if="scope.row.status=='2'">已完成</p>
          <p v-else>已关闭</p>
        </template>
      </el-table-column>
      <el-table-column prop="autoReceiveTime" label="自动确认收货时间" width="165" />
      <el-table-column prop="maybeReceiveTime" label="订单应收时间" width="165">
          <template slot-scope="scope">
              {{scope.row.maybeReceiveTime | dateFormat}}
            </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="176">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="look(scope.row)">查看订单</el-button>
          <el-button type="text" size="small" @click="updateto(scope.row)">修改信息</el-button>
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
    />

    <el-dialog v-if="dialogVisible" title="订单详情" :visible.sync="dialogVisible" width="40%">
      <el-divider content-position="left">订单信息</el-divider>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        订单编号：<el-input v-model="orderNumber" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        订单金额：<el-input v-model="sumMoney" readonly style="width: 160px;" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        订单数量：<el-input v-model="counts" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        订单状态：<span v-if="status=='1'">已发货</span><span v-else-if="status=='2'">已完成</span><span v-else>已关闭</span>
        <el-divider content-position="left">用户信息</el-divider>
      </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        用户账号：<el-input v-model="account" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        用户昵称：<el-input v-model="cname" readonly style="width: 160px;" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        手&nbsp;&nbsp;机&nbsp;&nbsp;号：<el-input v-model="cphone" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        收货地址：<el-input v-model="caddress" readonly style="width: 160px;" /></p>
      <el-divider content-position="left">商品信息</el-divider>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品名称：<el-input v-model="productName" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品单价：<el-input v-model="price" readonly style="width: 160px;" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品货号：<el-input v-model="productNumber" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品图片：<el-image style="width: 50px; height: 50px" :src="require('@/dir/imgs/'+image)" :preview-src-list="[require('@/dir/imgs/'+image)]" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品规格：<el-input v-model="productModel" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品颜色：<el-input v-model="productColor" readonly style="width: 160px;" /></p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
    </el-dialog>




    
    <el-dialog v-if="dialogVisibleupdate" title="修改信息" :visible.sync="dialogVisibleupdate" width="30%">
     用户昵称：<el-input v-model="cname"  style="width: 200px;" /><br><br>
     手&nbsp;&nbsp;机&nbsp;&nbsp;号：<el-input v-model="cphone"  style="width: 200px;" /><br><br>
     收货地址：<el-input v-model="caddress"  style="width: 200px;" /><br><br>
      <el-button type="primary" @click="dialogVisibleupdate=false">关闭</el-button>
      <el-button type="primary" @click="update()">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordersList: [],
      orderOrProduct: '',
      serverNumber: '',
      nameOrPhone: '',
      time: '',
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      dialogVisible: false,
      dialogVisibleupdate:false,
      caddress:'',
      cname:'',
      cphone:'',
      id:''
    }
  },
  mounted() {
    this.selectOrders()
  },
  methods: {
    selectOrders: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/o/orders/selectOrders', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          orderOrProduct: this.orderOrProduct,
          nameOrPhone: this.nameOrPhone,
          time: this.time
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.ordersList = result.data
          qwe.totalSize = result.dataSize
        }).catch(function(err) {
          console.log(err)
        })
    },
    look: function(e) {
      this.dialogVisible = true
      this.orderNumber = e.orderNumber
      this.sumMoney = e.sumMoney
      this.counts = e.counts
      this.status = e.status
      this.account = e.account
      this.cname = e.cname
      this.cphone = e.cphone
      this.caddress = e.caddress
      this.productName = e.productName
      this.price = e.price
      this.productNumber = e.productNumber
      this.image = e.image
      this.productModel = e.productModel
      this.productColor = e.productColor
    },
    sizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.selectOrders()
    },
    currentChange(page) {
      this.currentPage = page
      this.selectOrders()
    },
    refresh: function() {
      const that = this
      this.$axios.get('http://localhost:8081/o/orders/selectOrders', {
        params: {
          pageSize: that.pageSize,
          currentPage: 1
        }
      })
        .then(function(res) {
          const result = res.data
          that.ordersList = result.data
          that.totalSize = result.dataSize
          that.currentPage = 1
          that.orderOrProduct = ''
          that.nameOrPhone = ''
          that.time = ''
        }).catch(function(err) {
          console.log(err)
        })
    },
    putChange:function(){
      this.currentPage=1
    },
      updateto: function(e) {
      this.dialogVisibleupdate = true
      this.cname = e.cname
      this.cphone = e.cphone
      this.caddress = e.caddress
      this.id = e.id
    },
     update: function(data) {
      const that = this
      that.dialogVisibleupdate=false
      this.$axios.get('http://localhost:8081/o/orders/updateInfo',{
      params:{
         id:this.id,
      cname:this.cname ,
      cphone:this.cphone,
      caddress:this.caddress
      }})
        .then(function(res=1) {
          that.selectOrders()
          that.$message({
          message: '修改成功',
          type: 'success'
        })
        }).catch(function(err) {
          console.log(err)
           that.$message({
          message: '修改失败',
          type: 'error'
        })
        })
    }
  }
}</script>
