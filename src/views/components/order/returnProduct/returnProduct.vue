<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="list.serverNumber" placeholder="服务单号" @change="putChange"/>
        </el-col>
      </el-form-item>
      <el-form-item label="收货人">
        <el-col :span="30">
          <el-input v-model="list.nameOrPhone" placeholder="收货人姓名/手机号" @change="putChange"/>
        </el-col>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-col :span="11">
          <el-date-picker v-model="list.time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="putChange"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectReturnThings()"><i class="el-icon-search">搜索</i></el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="refresh"><i class="el-icon-refresh-left">刷新</i></el-button>
      </el-form-item>
    </el-form>

    <el-container>
      <el-aside width="130px">
        <br>
        <el-button type="primary" size="medium" @click="selectReturnThings()">全&nbsp;&nbsp;&nbsp;部({{AllSize}})</el-button><br><br>
        <el-button type="primary" size="medium" @click="selectPending()">待处理({{pendingSize}})</el-button><br><br>
        <el-button type="primary" size="medium" @click="selectAgree()">已同意({{agreeSize}})</el-button><br><br>
        <el-button type="primary" size="medium" @click="selectRefuse()">已拒绝({{refuseSize}})</el-button><br><br>
      </el-aside>
      <el-main>

        <el-button-group>
          <el-button type="primary" size="mini" :disabled="isAgree" @click="batch('agree')">批量同意</el-button>
          <el-button type="primary" size="mini" :disabled="isRefuse" @click="batch('refuse')">批量拒绝</el-button>
        </el-button-group>

        <el-table :data="returnThingsList" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column prop="serverNumber" label="服务单号" width="160" />
          <el-table-column prop="applyTime" label="申请时间" width="160">
              <template slot-scope="scope">
              {{scope.row.applyTime | dateFormat}}
            </template>
          </el-table-column>

       <el-table-column prop="account" label="收货人昵称/账号" width="160" >
            <template slot-scope="scope">
              {{scope.row.name}}({{scope.row.account}})
            </template>
      </el-table-column>
      <el-table-column prop="phoneNo" label="收货人手机号" width="160" />

          <el-table-column prop="sumMoney" label="退款金额" width="160" />
          <el-table-column prop="applyStatus" label="申请状态" width="160">
            <template slot-scope="scope">
              <p v-if="scope.row.applyStatus=='1'">待处理</p>
              <p v-else-if="scope.row.applyStatus=='2'">已同意</p>
              <p v-else>已拒绝</p>
            </template>
          </el-table-column>
          <el-table-column prop="dispose" label="处理时间" width="160">
             <template slot-scope="scope">
              {{scope.row.dispose | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookRM(scope.row,dialogVisible=true)">详情</el-button>
              <el-button type="text" size="small" @click="agree(scope.row.id)">同意</el-button>
              <el-button type="text" size="small" @click="refuse(scope.row.id)">拒绝</el-button>
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
      </el-main>
    </el-container>
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
        收货地址：<el-input v-model="aname" readonly style="width: 160px;" /></p>
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data() {
    return {
      returnThingsList: [],
      list:{ serverNumber: '',nameOrPhone: '', time: ''},
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      dialogVisible: false,
      batchList: [],
       AllSize:'',
      pendingSize:'',
      agreeSize:'',
      refuseSize:'',
      isAgree:false,
      isRefuse:false
    }
  },
  mounted() {
     this.selectPending();
    this.selectAgree();
    this.selectRefuse()
    this.selectReturnThings()
  },
  methods: {
    selectReturnThings: function() {

    
     const t=this;
      t.isAgree = false
      t.isRefuse = false;
      this.applyStatus=''
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectReturnThings', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          serverNumber: this.list.serverNumber,
          nameOrPhone: this.list.nameOrPhone,
          time: this.list.time,
          applyStatus: this.applyStatus
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.returnThingsList = result.data
          qwe.AllSize=result.dataSize
          qwe.totalSize = result.dataSize
        }).catch(function(err) {
          console.log(err)
        })
    },
    selectPending:function(){
       const t=this;
      t.isAgree = false
      t.isRefuse = false
      this.applyStatus = 1
       this.currentPage=1;
    
       var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectReturnThings', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          serverNumber: this.list.serverNumber,
          nameOrPhone: this.list.nameOrPhone,
          applyStatus: this.applyStatus,
          time: this.list.time
        }
      }).then(function(res) {
        const result = res.data
        qwe.returnThingsList = result.data
        qwe.pendingSize = result.dataSize
        qwe.totalSize = result.dataSize
      }).catch(function(err) {
        console.log(err)
      })
    },
    selectAgree:function(){
       const t=this;
      t.isAgree = true
      t.isRefuse = false
      this.applyStatus = 2
       this.currentPage=1;
    
       var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectReturnThings', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          serverNumber: this.list.serverNumber,
          nameOrPhone: this.list.nameOrPhone,
          applyStatus: this.applyStatus,
          time: this.list.time
        }
      }).then(function(res) {
        const result = res.data
        qwe.returnThingsList = result.data
        qwe.agreeSize = result.dataSize
        qwe.totalSize = result.dataSize

       
      }).catch(function(err) {
        console.log(err)
      })
    },
    selectRefuse:function(){
       const t=this;
      t.isAgree = false
      t.isRefuse = true
      this.applyStatus = 3
       this.currentPage=1;
    
       var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectReturnThings', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          serverNumber: this.list.serverNumber,
          nameOrPhone: this.list.nameOrPhone,
          applyStatus: this.applyStatus,
          time: this.list.time
        }
      }).then(function(res) {
        const result = res.data
        qwe.returnThingsList = result.data
        qwe.refuseSize = result.dataSize
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
      this.aname = e.aname
      this.productName = e.productName
      this.price = e.price
      this.productNumber = e.productNumber
      this.image = e.image
      this.productModel = e.productModel
      this.productColor = e.productColor
    },
    agree(data) {
      this.$confirm('确定同意?同意后买家会退回货物！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const asd = this
        this.$axios.get('http://localhost:8081/re/returnthings/agreeReturn?applyStatus=2&id=' + data)
          .then(function(res = 1) {
            asd.selectReturnThings()
            asd.$message({
              message: '已同意',
              type: 'success'
            })

                 asd.selectPending();
    asd.selectAgree();
    asd.selectRefuse()
    asd.selectReturnThings()
          }).catch(function(err) {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          showClose: true,
          duration: 1000,
          message: '已取消同意'
        })
      })
    },
    refuse(data) {
      this.$confirm('确定拒绝?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const asd = this
        this.$axios.get('http://localhost:8081/re/returnthings/agreeReturn?applyStatus=3&id=' + data)
          .then(function(res = 1) {
            asd.selectReturnThings()
            asd.$message({
              message: '已拒绝',
              type: 'success'
            })
  asd.selectPending();
    asd.selectAgree();
    asd.selectRefuse()
    asd.selectReturnThings()

          }).catch(function(err) {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          showClose: true,
          duration: 1000,
          message: '已取消拒绝'
        })
      })
    },
    refresh: function() {
      this.isAgree = false
      this.isRefuse = false
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectReturnThings', {
        params: {
          pageSize: this.pageSize,
          currentPage: 1
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.returnThingsList = result.data
          qwe.totalSize = result.dataSize
          qwe.currentPage = 1
          qwe.list.serverNumber = ''
          qwe.list.nameOrPhone = ''
          qwe.list.time = ''

            qwe.selectPending();
    qwe.selectAgree();
    qwe.selectRefuse()
    qwe.selectReturnThings()
        }).catch(function(err) {
          console.log(err)
        })
    },
    handleSelectionChange(val) {
      const bl = []
      val.forEach(row => {
        bl.push(row.id)
      })
      this.batchList = bl
    },
    batch(e) {
      if (this.batchList.length ==0) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: '请先选择',
          type: 'error'
        })
      } else {
        const that = this
        if (e === 'agree') {
          this.$axios.get('http://localhost:8081/re/returnthings/batch', {
            params: {
              type: 'agree',
              batchList: that.batchList
            },
            paramsSerializer: params => {
              return qs.stringify(params, { indices: false })
            }
          })
            .then(function(res = 1) {
              that.$message({
                showClose: true,
                duration: 1000,
                message: '批量同意成功',
                type: 'success'
              })

               that.selectPending();
    that.selectAgree();
    that.selectRefuse();
              that.selectReturnThings()


            })
            .catch(function(error) {
              that.$message({
                showClose: true,
                duration: 1000,
                message: '批量同意失败',
                type: 'error'
              })
              console.log(error)
            })
        } else if (e === 'refuse') {
          this.$axios.get('http://localhost:8081/re/returnthings/batch', {
            params: {
              type: 'refuse',
              batchList: that.batchList
            },
            paramsSerializer: params => {
              return qs.stringify(params, { indices: false })
            }
          })
            .then(function(res = 1) {
              that.$message({
                showClose: true,
                duration: 1000,
                message: '批量拒绝成功',
                type: 'success'
              })
                that.selectPending();
    that.selectAgree();
    that.selectRefuse()
    that.selectReturnThings()
            })
            .catch(function(error) {
              that.$message({
                showClose: true,
                duration: 1000,
                message: '批量拒绝失败',
                type: 'error'
              })
              console.log(error)
            })
        }
      }
    },
    putChange:function(){
      this.currentPage=1
    }
  }
}</script>
