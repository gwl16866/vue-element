<template>
  <div id="app">
    <el-dialog
      v-if="showorder"
      :fullscreen="true"
      :modal="true"
      title="订单详情"
      :visible.sync="showorder"
    >
      <orderCustomer :id="pid" />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showorder = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--<el-dialog v-if="showorder" :fullscreen="true" title="订单详情" :visible.sync="showorder" width="40%">
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
        用户昵称：<el-input v-model="name" readonly style="width: 160px;" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        手&nbsp;&nbsp;机&nbsp;&nbsp;号：<el-input v-model="phoneNo" readonly style="width: 160px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        收货地址：<el-input v-model="aname" readonly style="width: 160px;" /></p>
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
      <el-button type="primary" @click="showorder=false">关闭</el-button>
    </el-dialog>-->

    <div
      class="ax_default _默认样式"
      title="用户详情"
    >
      <p><span>用户详情</span></p>
    </div>
    <el-table
      v-show="istable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />

      <el-table-column
        prop="id"
        label="用户ID"
        width="220"
      />
      <el-table-column
        prop="account"
        label="用户账号"
        width="220"
      />
      <el-table-column
        prop="name"
        label="用户昵称"
        width="220"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="220"
        :formatter="formatStatus"
      />
      <el-table-column
        prop="birthday"
        label="生日"
        width="220"
      />
      <el-table-column
        prop="aname"
        label="详细地址"
        width="220"
      />
      <el-table-column
        prop="registDate"
        label="注册时间"
        width="220"
      />
      <el-table-column
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="upd(scope.row)"
          >
            编辑资料
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form
      v-show="isform"
      ref="form"
      :model="stu"
      label-width="80px"
    >
      <el-form-item label="用户ID">
        <el-input v-model="stu.id" />
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="stu.account" />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="stu.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio
          v-model="stu.sex"
          label="1"
        >
          男
        </el-radio>
        <el-radio
          v-model="stu.sex"
          label="2"
        >
          女
        </el-radio>
      </el-form-item>
      <el-form-item label="生日">
        <el-input v-model="stu.birthday" />
      </el-form-item>
      <!-- <el-form-item label="详细地址">
		  <el-input v-model="stu.aid"></el-input>
	  </el-form-item> -->
      <el-form-item label="注册时间">
        <el-col :span="11">
          <el-date-picker
            v-model="stu.registDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onbutton()"
        >
          修改
        </el-button>
        <!-- <span slot="footer" class="dialog-footer">
           <el-button @click="show = false">取 消</el-button>
          </span> -->
      </el-form-item>
    </el-form>

    <div
      class="ax_default _默认样式"
      title="收货地址"
    >
      <p><span>收货地址</span></p>
    </div>
    <el-table
      v-show="istable1"
      :data="tableData1"
      border
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="name"
        label="用户昵称"
        width="220"
      />
      <el-table-column
        prop="phoneNo"
        label="手机号"
        width="220"
      />
      <el-table-column
        prop="aname"
        label="详细地址"
        width="220"
      />
      <el-table-column
        prop="coding"
        label="邮政编码"
        width="220"
      />
      <el-table-column
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="upd1(scope.row)"
          >
            编辑地址
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form
      v-show="isform1"
      ref="form"
      :model="stu"
      label-width="80px"
    >
      <input
        v-model="stu.id"
        type="hidden"
      >
      <!-- <el-form-item label="用户昵称">
	  		  <el-input v-model="stu.name"></el-input>
	  </el-form-item>
    <el-form-item label="手机号">
		  <el-input v-model="stu.phoneNo"></el-input>
	  </el-form-item> -->
      <el-form-item label="详细地址">
        <el-input v-model="stu.aname" />
      </el-form-item>
      <!--  <el-form-item label="邮政编码">
          <el-input v-model="stu.coding"></el-input>
	  </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          @click="addupd()"
        >
          修改地址
        </el-button>
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
      </el-form-item>
    </el-form>

    <div
      class="ax_default _默认样式"
      title="订单记录"
    >
      <p><span>订单记录</span></p>
    </div>
    <el-table
      v-show="istable2"
      :data="tableData2.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="orderNumber"
        label="订单编号"
        width="220"
      />
      <el-table-column
        prop="submitDate"
        label="提交时间"
        width="220"
      />
      <el-table-column
        prop="account"
        label="用户账号"
        width="220"
      />
      <el-table-column
        prop="sumMoney"
        label="订单金额"
        width="220"
      />
      <el-table-column
        prop="orderResource"
        label="订单来源"
        width="220"
      />
      <el-table-column
        prop="status"
        label="订单状态"
        width="220"
      />
      <el-table-column
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="selectorder(scope.row)"
          >
            查看订单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import orderCustomer from '@/views/components/customer/addCustomer/orderCustomer.vue'

export default {
  components: {
    orderCustomer
  }, props: [
    'id'
  ],
  data() {
    return {
      id: '',
      show: false,
      isform: false,
      isform1: false,
      istable: true,
      istable1: true,
      istable2: true,
      checked: true,
      showorder: false,
      pid: '',
      stu: {
        id: '',
        account: '',
        name: '',
        sex: '',
        birthday: '',
        address: '',
        registDate: '',
        coding: '',
        phoneNo: '',
        orderNumber: '',
        submitDate: '',
        userId: '',
        sumMoney: '',
        orderResource: '',
        status: '',
        aname: '',
        fid: '',

        // account: '',
        //  name: '',
        //  aname:'',
        productModel: '',
        //  phoneNo:'',
        productName: '',
        // orderNumber:'',
        productNumber: '',
        price: '',
        //  sumMoney:'',
        productColor: '',
        // status:'',
        counts: ''

      },
      pagesize: 10,
      currpage: 1,
      tableData: [],
      tableData1: [],
      tableData2: []

    }
  },
  mounted() {
    this.loadDate()
    this.loadDate1()
    this.loadDate2()
  },
  methods: {
    selectorder(e) {
      this.showorder = true
      this.pid = e.id
    },
    loadDate(id) {
      var a = this
      this.$axios.get('http://localhost:8081/cu/customer/userselect', {
        params: {
          id: a.id
        }

      })
        .then(res => {
          a.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadDate1(id) {
      var a = this
      this.$axios.get('http://localhost:8081/cu/customer/addselect', {
        params: {
          id: a.id
        }

      })
        .then(res => {
          a.tableData1 = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadDate2(id) {
      var a = this
      this.$axios.get('http://localhost:8081/cu/customer/orderselect', {
        params: {
          id: a.id
        }

      })
        .then(res => {
          a.tableData2 = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    handleSelectionChange(val) {
      // this.tableData = res.data
    },
    formatStatus(row, column) {
      return row.sex === '1' ? '男' : '女'
    },
    upd(row) {
      this.stu = row
      this.istable = false
      this.istable1 = false
      this.istable2 = false
      this.isform = true
      console.log(row)
    },
    onbutton() {
      var a = this
      this.$axios.get('http://localhost:8081/cu/customer/custupd', {
        params: {
          id: this.stu.id,
          account: this.stu.account,
          name: this.stu.name,
          sex: this.stu.sex,
          birthday: this.stu.birthday,
          registDate: this.stu.registDate

        },
        showCancelButton: true,
        cancelButtonText: '取消'

      })

        .then(function(response) {
          a.isform = false
          a.istable = true
          a.istable1 = true
          a.istable2 = true
          a.loadDate()
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    upd1(row) {
      this.stu = row
      this.istable = false
      this.istable1 = false
      this.istable2 = false
      this.isform1 = true
      console.log(row)
    },
    addupd() {
      var a = this
      console.log(a.id + '12121212')
      this.$axios.get('http://localhost:8081/cu/customer/addupd', {

        params: {
          id: a.id,
          aname: a.stu.aname
        },
        showCancelButton: true,
        cancelButtonText: '取消'
      })
        .then(function(response) {
          a.isform1 = false
          a.istable = true
          a.istable1 = true
          a.istable2 = true
          a.loadDate1()
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }

  }

}
</script>

<style scoped>

</style>
