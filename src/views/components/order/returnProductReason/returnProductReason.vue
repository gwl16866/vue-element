<template>

  <div id="app"><br>
    <el-button type="primary" @click="dialogVisible2=true">新增</el-button>
    <el-dialog v-if="dialogVisible2" title="新增退货原因" :visible.sync="dialogVisible2" width="30%">
      <el-form>
        <el-form-item label="原因类型">
          <el-input v-model="reason" />
        </el-form-item>
        <el-button @click="dialogVisible2=false">取消</el-button>
        <el-button @click="submitReason(dialogVisible2=false)">提交</el-button>
      </el-form>
    </el-dialog>
    <br><br>
    <el-table :data="returnReasonList" border style="width:100%">
      <el-table-column prop="reason" label="原因类型" width="370" />
      <el-table-column prop="reasonTime" label="添加时间" width="370" />
      <el-table-column label="是否启用" width="370">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.reasonStatus"
            on-color="#00A854"
            :active-value="1"
            off-color="#F04134"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="380">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
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

    <el-dialog v-if="dialogVisible" title="修改退货原因" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="原因类型">
          <el-input v-model="reason" />
        </el-form-item>
        <el-button type="primary" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="updateSubmit(dialogVisible=false)">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      returnReasonList: [],
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      dialogVisible: false,
      dialogVisible2: false,
      reason: ''
    }
  },
  mounted() {
    this.selectReturnReason()
  },
  methods: {
    selectReturnReason: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnmoney/selectReturnReason', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.totalSize = result.dataSize
          qwe.returnReasonList = result.data
        }).catch(function(err) {
          console.log(err)
        })
    },
    update: function(data) {
      this.dialogVisible = true
      this.reason = data.reason
      this.id = data.id
    },
    updateSubmit: function(e) {
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnmoney/updateReason', {
        params: {
          id: this.id,
          reason: this.reason
        }
      })
        .then(function(res = 1) {
          asd.selectReturnReason()
        }).catch(function(err) {
          console.log(err)
        })
    },
    submitReason: function(e) {
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnmoney/addReason', {
        params: {
          reason: this.reason
        }
      }).then(function(res = 1) {
        asd.selectReturnReason()
      }).catch(function(err) {
        console.log(err)
      })
    },
    changeStatus: function(data) {
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
    },
    del: function(data) {
      this.$axios.get('http://localhost:8081/re/returnmoney/deleteReason?id=' + data.id)
        .then(function(res) {
          this.selectReturnReason()
        }).catch(function(err) {
          console.log(err)
        })
    },
    sizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.selectReturnReason()
    },

    currentChange(page) {
      this.currentPage = page
      this.selectReturnReason()
    }
  }
}</script>
<style scoped>
#app{
  position: absolute;
  left: 20px;
  top: 10px;
}
</style>
