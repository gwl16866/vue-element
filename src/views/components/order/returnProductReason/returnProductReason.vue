<template>

  <div id="app"><br>
    <el-button type="primary" @click="dialogVisible2=true"><i class="el-icon-plus">新增</i></el-button>
    <el-button type="primary" @click="refresh"><i class="el-icon-refresh-left">刷新</i></el-button>
    <el-dialog v-if="dialogVisible2" title="新增退货原因" :visible.sync="dialogVisible2" width="30%">
      <el-form>
        <el-form-item label="原因类型">
          <el-input v-model="reason" />
        </el-form-item>
        <el-button @click="dialogVisible2=false">取消</el-button>
        <el-button :plain="true" @click="submitReason(dialogVisible2=false)">提交</el-button>
      </el-form>
    </el-dialog>
    <br><br>
    <el-table :data="returnReasonList" border style="width:100%">
      <el-table-column prop="reason" label="原因类型" width="370" />
      <el-table-column prop="reasonTime" label="添加时间" width="370" >
         <template slot-scope="scope">
              {{scope.row.reasonTime | dateFormat}}
            </template>
      </el-table-column>
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
          <el-button type="text" size="small" :plain="true" @click="del(scope.row)">删除</el-button>
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="dialogVisible=false">取消</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
          asd.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(function(err) {
          console.log(err)
        })
    },
    submitReason: function() {
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnmoney/addReason', {
        params: {
          reason: this.reason
        }
      }).then(function(res = 1) {
        asd.selectReturnReason()
        asd.$message({
          message: '添加成功',
          type: 'success'
        })
      }).catch(function(err) {
        console.log(err)
      })
    },
    changeStatus: function(data) {
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnmoney/OpenOrNotStatus', {
        params: {
          id: data.id,
          reasonStatus: data.reasonStatus
        }
      })
        .then(function(res = 1) {
          var str = ''
          if (data.reasonStatus === 1) {
            str = '启用成功'
          } else {
            str = '禁止成功'
          }
          asd.$message({
            message: str,
            type: 'success'
          })

          console.log(res)
        }).catch(function(err) {
          console.log(err)
        })
    },
    del(e) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const asd = this
        this.$axios.get('http://localhost:8081/re/returnmoney/deleteReason?id=' + e.id)
          .then(function(res = 1) {
            asd.currentPage=1
            asd.selectReturnReason()
            asd.$message({
              message: '删除成功',
              type: 'success'
            })
          }).catch(function(err) {
            asd.$message({
              message: '删除失败',
              type: 'success'
            })
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          showClose: true,
          duration: 1000,
          message: '已取消删除'
        })
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
    },
    refresh: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnmoney/selectReturnReason', {
        params: {
          pageSize: this.pageSize,
          currentPage: 1
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.totalSize = result.dataSize
          qwe.returnReasonList = result.data
          qwe.currentPage = 1
        }).catch(function(err) {
          console.log(err)
        })
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
