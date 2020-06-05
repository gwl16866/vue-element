<template>
  <div><br>
    <el-form ref="form" :model="form" label-width="“150px”" :inline="true">
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="productOrNumber" placeholder="商品名称/商品货号" />
        </el-col>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-col :span="30">
          <el-select v-model="status" placeholder="全部">
            <el-option label="退货时"" value="1" />
            <el-option label="添加商品" value="2" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-col :span="11">
          <el-date-picker v-model="time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectReturnMoney()">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="quantity" border style="width: 100%">
      <el-table-column prop="productId" label="编号" width="200" />
      <el-table-column prop="image" label="商品图片" width="200">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="require('@/images/'+scope.row.image)"
            :preview-src-list="[require('@/images/'+scope.row.image)]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="商品名称" width="200" />
      <el-table-column prop="productNumber" label="货号/属性" width="200" />
      <el-table-column prop="orderNumber" label="订单号" width="200" />
      <el-table-column prop="count" label="库存" width="200" />
      <el-table-column prop="controlClass" label="库存类型" width="200" />
      <el-table-column prop="status" label="申请状态" width="200">
        <template slot-scope="scope">
          <p v-if="scope.row.status=='1'">退货时</p>
          <p v-else="scope.row.status=='2'">添加商品</p>
        </template>
      </el-table-column>
      <el-table-column prop="quantityTime" label="操作信息" width="200" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: [],
      productOrNumber: '',
      status: '',
      time: ''
    }
  },
  mounted() {
    this.selectQuantity()
  },
  methods: {
    selectQuantity: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/ku/quantity/selectQuantity', {
        params: {
          productOrNumber: this.productOrNumber,
          status: this.status,
          time: this.time
        }
      })
        .then(function(res) {
          qwe.quantity = res.data
        }).catch(function(err) {
          console.log(err)
        })
    }
  }
}</script>
