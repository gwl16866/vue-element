<template>
  <div id="app">
    <div
      class="ax_default _默认样式"
      title="用户详情"
    >
      <p><span>订单信息</span></p>
    </div>
    <el-divider content-position="left">
      订单信息
    </el-divider>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      订单编号：<el-input
        v-model="stu.orderNumber"
        readonly
        style="width: 160px;"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      订单金额：<el-input
        v-model="stu.sumMoney"
        readonly
        style="width: 160px;"
      />
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      订单数量：<el-input
        v-model="stu.counts"
        readonly
        style="width: 160px;"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      订单状态：<span v-if="stu.status=='1'">已发货</span><span v-else-if="stu.status=='2'">已完成</span><span v-else>已关闭</span>
      <el-divider content-position="left">
        用户信息
      </el-divider>
    </p><p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      用户账号：<el-input
        v-model="stu.account"
        readonly
        style="width: 160px;"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      用户昵称：<el-input
        v-model="stu.name"
        readonly
        style="width: 160px;"
      />
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      手&nbsp;&nbsp;机&nbsp;&nbsp;号：<el-input
        v-model="stu.phoneNo"
        readonly
        style="width: 160px;"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      收货地址：<el-input
        v-model="stu.aname"
        readonly
        style="width: 160px;"
      />
    </p>
    <el-divider content-position="left">
      商品信息
    </el-divider>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      商品名称：<el-input
        v-model="stu.productName"
        readonly
        style="width: 160px;"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      商品单价：<el-input
        v-model="stu.price"
        readonly
        style="width: 160px;"
      />
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      商品货号：<el-input
        v-model="stu.productNumber"
        readonly
        style="width: 160px;"
      />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <!-- 商品图片：<el-image style="width: 50px; height: 50px" :src="require('@/dir/imgs/'+image)" :preview-src-list="[require('@/dir/imgs/'+image)]" /></p> -->
    </p><p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      商品规格：<el-input
        v-model="stu.productModel"
        readonly
        style="width: 160px;"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      商品颜色：<el-input
        v-model="stu.productColor"
        readonly
        style="width: 160px;"
      />
    </p>
  </div>
</template>

<script>
export default { props: [
  'id'
],

data() {
  return {
    isform: false,
    istable: true,
    checked: true,
    stu: {
      //  id: '',
      account: '',
      name: '',
      aname: '',
      productModel: '',
      phoneNo: '',
      productName: '',
      orderNumber: '',
      productNumber: '',
      price: '',
      sumMoney: '',
      productColor: '',
      status: '',
      counts: ''
    },
    tableData: []
  }
},
mounted() {
  this.loadDate(id)
},
methods: {
  loadDate(id) {
    var a = this
    this.$axios.get('http://localhost:8081/cu/customer/ordersselect', {
      params: {
        id: a.id
        // account:a.account,
        // name: a.name,
        // aname:a.aname,
        // productModel:a.productModel,
        // phoneNo:a.phoneNo,
        // productName:a.productName,
        // orderNumber:a.orderNumber,
        // productNumber:a.productNumber,
        // price:a.price,
        // sumMoney:a.sumMoney,
        // productColor:a.productColor,
        // status:a.status,
        // counts:a.counts

      }

    })
      .then(res => {
        a.stu = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }

}

}
</script>

<style scoped>

</style>
