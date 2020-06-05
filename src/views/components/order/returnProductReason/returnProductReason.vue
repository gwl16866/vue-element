<template>
  <div><br>
    <el-table :data="returnReasonList" border style="width:100%">
      <el-table-column prop="reason" label="原因类型" width="370" />
      <el-table-column prop="reasonTime" label="添加时间" width="370" />
      <el-table-column label="是否启用" width="370">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.reasonStatus"
            on-color="#00A854"
            active-value="1"
            off-color="#F04134"
            inactive-value="2"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="380">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="del(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      returnReasonList: []
    }
  },
  mounted() {
    this.selectReturnReason()
  },
  methods: {
    selectReturnReason: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnmoney/selectReturnReason')
        .then(function(res) {
          qwe.returnReasonList = res.data
        }).catch(function(err) {
          console.log(err)
        })
    },
    changeStatus: function(data) {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnmoney/OpenOrNotStatus', {
        params: {
          id: data.id,
          reasonStatus: data.reasonStatus
        }
      })
        .then(function(res = 1) {
          console.log(res)
        }).catch(function(err) {
          console.log(err)
        })
    }
  }
}</script>
