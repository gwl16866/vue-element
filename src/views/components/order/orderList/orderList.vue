<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="orderOrProduct" placeholder="订单编号/商品货号" />
        </el-col>
      </el-form-item>
      <el-form-item label="收货人">
        <el-col :span="30">
          <el-input v-model="nameOrPhone" placeholder="收货人姓名/手机号码" />
        </el-col>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-col :span="11">
          <el-date-picker v-model="time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectOrders()">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="ordersList" border style="width: 100%">
      <el-table-column prop="orderNumber" label="订单编号" width="165" />
      <el-table-column prop="submitDate" label="提交时间" width="165" />
      <el-table-column prop="account" label="用户账号" width="165" />
      <el-table-column prop="name" label="收货人" width="165" />
      <el-table-column prop="sumMoney" label="订单金额" width="165" />
      <el-table-column prop="status" label="订单状态" width="165" />
      <el-table-column prop="autoReceiveTime" label="自动确认收货时间" width="165" />
      <el-table-column prop="maybeReceiveTime" label="订单应收时间" width="165" />
      <el-table-column fixed="right" label="操作" width="176">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="del(scope.row)">查看订单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordersList: [
        { orderNumber: '', submitDate: '', account: '', name: '', sumMoney: '', status: '', autoReceiveTime: '', maybeReceiveTime: '' }
      ],
      orderOrProduct: '',
      nameOrPhone: '',
      time: ''
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
          orderOrProduct: this.orderOrProduct,
          nameOrPhone: this.nameOrPhone,
          time: this.time
        }
      })
        .then(function(res) {
          qwe.ordersList = res.data
        }).catch(function(err) {
          console.log(err)
        })
    }
  }
}</script>
