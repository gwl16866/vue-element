<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="serverNumber" placeholder="服务单号" />
        </el-col>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-col :span="30">
          <el-select v-model="applyStatus" placeholder="全部">
            <el-option label="待处理" value="1" />
            <el-option label="已处理" value="2" />
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

    <el-table :data="returnMoneyList" border style="width: 100%">
      <el-table-column prop="serverNumber" label="服务单号" width="200" />
      <el-table-column prop="applyTime" label="申请时间" width="200" />
      <el-table-column prop="account" label="用户账号" width="200" />
      <el-table-column prop="sumMoney" label="退款金额" width="200" />

      <el-table-column prop="applyStatus" label="申请状态" width="200">
        <template slot-scope="scope">
          <p v-if="scope.row.applyStatus=='1'">待处理</p>
          <p v-else>已处理</p>
        </template>
      </el-table-column>
      <el-table-column prop="dispose" label="处理时间" width="200" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="del(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      returnMoneyList: [],
      serverNumber: '',
      applyStatus: '',
      time: ''
    }
  },
  mounted() {
    this.selectReturnMoney()
  },
  methods: {
    selectReturnMoney: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnmoney/selectReturnMoney', {
        params: {
          serverNumber: this.serverNumber,
          applyStatus: this.applyStatus,
          time: this.time
        }
      })
        .then(function(res) {
          qwe.returnMoneyList = res.data
        }).catch(function(err) {
          console.log(err)
        })
    }
  }
}</script>
