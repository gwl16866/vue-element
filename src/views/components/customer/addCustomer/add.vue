<template>
  <div id="app">
    <el-dialog
      v-if="show"
      :fullscreen="true"
      :modal="true"
      title="查看详情"
      :visible.sync="show"
    >
      <detailsCustomer :id="id" />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="show = false">取 消</el-button>
      </span>
    </el-dialog>

    <div
      id="u5783"
      class="ax_default _默认样式"
      title="刷新"
    >
      <div
        id="u5783_div"
        class=""
      />
      <div
        id="u5783_text"
        class="text "
      >
        <p><span>刷新</span></p>
      </div>
    </div>
    <el-form
      :model="stu"
      label-width="80px"
    >
      <el-form-item label="用户账号">
        <el-input v-model="stu.account" />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="stu.name" />
      </el-form-item>
      <el-form-item label="订单数量">
        <el-input v-model="stu.orderCounts" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="somebutton()"
        >
          模糊查询
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-show="istable"
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
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
        prop="level"
        label="会员等级"
        width="220"
      />
      <el-table-column
        prop="money"
        label="消费金额"
        width="220"
      />
      <el-table-column
        prop="orderCounts"
        label="订单数量"
        width="220"
      />
      <el-table-column
        prop="status"
        label="账户启用状态"
        width="220"
        :formatter="formatStatus"
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
            编辑
          </el-button>
          ||    <el-button
            type="text"
            size="small"
            @click="del(scope.row,scope.row)"
          >
            删除
          </el-button>
          ||  <el-button
            type="text"
            @click="sel(scope.row)"
          >
            查看
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
      <el-form-item label="会员等级">
        <el-input v-model="stu.level" />
      </el-form-item>
      <el-form-item label="消费金额">
        <el-input v-model="stu.money" />
      </el-form-item>
      <el-form-item label="订单数量">
        <el-input v-model="stu.orderCounts" />
      </el-form-item>
      <el-form-item label="账户启用状态">
        <el-radio
          v-model="stu.status"
          label="1"
        >
          启用
        </el-radio>
        <el-radio
          v-model="stu.status"
          label="2"
        >
          不启用
        </el-radio>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onbutton()"
        >
          创建
        </el-button>
      </el-form-item>
    </el-form>

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
import detailsCustomer from '@/views/components/customer/addCustomer/detailsCustomer.vue'

export default {
  components: {
    detailsCustomer
  },

  data() {
    return {
      isform: false,
      istable: true,
      checked: true,
      show: false,
      id: '',
      stu: {
        id: '',
        account: '',
        name: '',
        level: '',
        money: '',
        orderCounts: '',
        status: ''
      },
      pagesize: 10,
      currpage: 1,
      tableData: []

    }
  },
  mounted() {
    this.loadDate()
  },
  methods: {
    sel(e) {
      this.show = true
      this.id = e.id
    },
    loadDate() {
      var a = this
      this.$axios.get('http://localhost:8081/cu/customer/select')
        .then(res => {
          a.tableData = res.data
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
      return row.status === '1' ? '启用' : '不启用'
    },
    del: function(c, a) {
      this.$axios.get('http://localhost:8081/cu/customer/del', {
        params: {
          id: c.id
        }
      })
      var that = this
      this.$axios.get('http://localhost:8081/cu/customer/select')
        .then(res => {
          that.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
        .then(function(response) {
          this.list.splice(a, 1)
          that.loadDate()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    upd(row) {
      this.stu = row
      this.istable = false
      this.isform = true
      console.log(row)
    },
    onbutton() {
      var a = this
      this.$axios.get('http://localhost:8081/cu/customer/upd', {
        params: {
          id: this.stu.id,
          account: this.stu.account,
          name: this.stu.name,
          level: this.stu.level,
          money: this.stu.money,
          orderCounts: this.stu.orderCounts,
          status: this.stu.status
        }

      })
        .then(function(response) {
          a.isform = false
          a.istable = true
          a.loadDate()
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    somebutton() {
		 const a = this
      this.$axios.get('http://localhost:8081/cu/customer/select', {
        params: {
          account: a.stu.account,
          name: a.stu.name,
          orderCounts: a.stu.orderCounts
        }

      })
        .then(res => {
          a.tableData = res.data
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
