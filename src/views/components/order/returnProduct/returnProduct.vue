<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="serverNumber" placeholder="服务单号" />
        </el-col>
      </el-form-item>
      <el-form-item label="收货人">
        <el-col :span="30">
          <el-input v-model="nameOrPhone" placeholder="收货人姓名/手机号" />
        </el-col>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-col :span="11">
          <el-date-picker v-model="time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectReturnThings()">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="returnThingsList" border style="width: 100%">
      <el-table-column prop="serverNumber" label="服务单号" width="180" />
      <el-table-column prop="applyTime" label="申请时间" width="180" />
      <el-table-column prop="account" label="用户账号" width="180" />
      <el-table-column prop="sumMoney" label="退款金额" width="180" />
      <el-table-column prop="name" label="联系人" width="180" />
      <el-table-column prop="applyStatus" label="申请状态" width="180">
        <template slot-scope="scope">
          <p v-if="scope.row.applyStatus=='1'">待处理</p>
          <p v-else>已处理</p>
        </template>
      </el-table-column>
      <el-table-column prop="dispose" label="处理时间" width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookRM(scope.row,dialogVisible=true)">详情</el-button>
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

    <el-dialog v-if="dialogVisible" title="退款详情" :visible.sync="dialogVisible" width="40%">
      <el-divider content-position="left">退款信息</el-divider>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        服务单号：<el-input v-model="serverNumber" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        申请时间：<el-input v-model="applyTime" readonly style="width: 160px;" /></p>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        退货原因：<el-input v-model="reason" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        退款金额：<el-input v-model="sumMoney" readonly style="width: 160px;" /></p>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        申请状态：<span v-if="applyStatus=='1'">待处理</span><span v-else>已处理</span></p>
      <el-divider content-position="left">用户信息</el-divider>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        用户账号：<el-input v-model="account" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        用户昵称：<el-input v-model="name" readonly style="width: 160px;" /></p>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        手&nbsp;&nbsp;机&nbsp;&nbsp;号：<el-input v-model="phoneNo" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        收货地址：<el-input v-model="address" readonly style="width: 160px;" /></p>
      <el-divider content-position="left">商品信息</el-divider>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品名称：<el-input v-model="productName" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品单价：<el-input v-model="price" readonly style="width: 160px;" /></p>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品货号：<el-input v-model="productNumber" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品图片：<el-image style="width: 50px; height: 50px" :src="require('@/dir/imgs/'+image)" :preview-src-list="[require('@/dir/imgs/'+image)]" /></p>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品规格：<el-input v-model="productModel" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        商品颜色：<el-input v-model="productColor" readonly style="width: 160px;" /></p>
      <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      returnThingsList: [],
      serverNumber: '',
      nameOrPhone: '',
      time: '',
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      dialogVisible: false
    }
  },
  mounted() {
    this.selectReturnThings()
  },
  methods: {
    selectReturnThings: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectReturnThings', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          serverNumber: this.serverNumber,
          nameOrPhone: this.nameOrPhone,
          time: this.time
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.returnThingsList = result.data
          qwe.totalSize = result.dataSize
        }).catch(function(err) {
          console.log(err)
        })
    },
    sizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.selectReturnThings()
    },

    currentChange(page) {
      this.currentPage = page
      this.selectReturnThings()
    },
    lookRM: function(e, d) {
      this.serverNumber = e.serverNumber
      this.applyTime = e.applyTime
      this.reason = e.reason
      this.applyStatus = e.applyStatus
      this.sumMoney = e.sumMoney
      this.account = e.account
      this.name = e.name
      this.phoneNo = e.phoneNo
      this.address = e.address
      this.productName = e.productName
      this.price = e.price
      this.productNumber = e.productNumber
      this.image = e.image
      this.productModel = e.productModel
      this.productColor = e.productColor
    }
  }
}</script>
