<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
    <el-button type="primary" @click="dialogVisible2=true"><i class="el-icon-plus">新增</i></el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="seckill.title" placeholder="活动名称" />
        </el-col>
      </el-form-item>
      <el-form-item label="活动状态">
        <el-col :span="30">
          <el-select v-model="seckill.status" placeholder="全部">
            <el-option label="活动进行中" value="1" />
            <el-option label="活动已结束" value="2" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker v-model="seckill.time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectQuantity()"><i class="el-icon-search">搜索</i></el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <el-button type="primary" @click="refresh"><i class="el-icon-refresh-left">刷新</i></el-button>
      </el-form-item>
    </el-form>

    <el-table :data="seckillList" border style="width: 100%">
      <el-table-column prop="seckillId" label="编号" width="165" />
      <el-table-column prop="title" label="活动标题" width="165"></el-table-column>
      <el-table-column label="活动状态" width="165">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='1'">活动进行中</span>
          <span v-else>活动已结束</span>
        </template>
      </el-table-column>
      <el-table-column  label="开始日期" width="165">
          <template slot-scope="scope">
          {{scope.row.starTime | format}}
      </template>
      </el-table-column>
      <el-table-column  label="结束日期" width="165">
           <template slot-scope="scope">
          {{scope.row.endTime | format}}
      </template>
      </el-table-column>
      <el-table-column label="开始/结束时间" width="165">
      <template slot-scope="scope">
          {{scope.row.seckillStarTime}}-{{scope.row.seckillEndTime}}
      </template>
      </el-table-column>
      <el-table-column prop="counts" label="商品数量" width="165"></el-table-column>
      <el-table-column label="上架/下架" width="165">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.putOrNot"
            on-color="#00A854"
            :active-value='1'
            off-color="#F04134"
            :inactive-value='2'
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作信息" width="165">
           <template slot-scope="scope">
              <el-button type="text" size="small" @click="porductList()">添加商品</el-button>
              <el-button type="text" size="small" @click="edit(scope.row.seckillId)">编辑</el-button>
              <el-button type="text" size="small" @click="del(scope.row.seckillId)">删除</el-button>
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
    ></el-pagination>


    <el-dialog v-if="dialogVisible2" title="添加活动" :visible.sync="dialogVisible2">
      <el-form>
          <el-form-item label="活动标题：">
              <el-input v-model="title"  style="width: 300px;" />
          </el-form-item>
          <el-form-item label="活动日期：">
           <p> <el-col :span="11">
                <el-date-picker v-model="starTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"/>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-date-picker v-model="endTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" />
            </el-col></p>
          </el-form-item>
          <el-form-item label="活动时间：">
              <el-col :span="11">
              <el-time-picker
                arrow-control
                v-model="seckillStarTime"
                :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
                }"
                value-format="HH:mm:ss"
                placeholder="每日开始时间">
            </el-time-picker></el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col>
            <el-time-picker
                arrow-control
                v-model="seckillEndTime"
                :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
                }"
                value-format="HH:mm:ss"
                placeholder="每日结束时间">
            </el-time-picker></el-col>
          </el-form-item>
        <el-button @click="dialogVisible2=false">取消</el-button>
        <el-button :plain="true" @click="addSeckill(dialogVisible2=false)" type="primary">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
     seckillList:[],
     seckill:{title: '',status: '',time: ''},
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      dialogVisible2:false,
      title:'',
      starTime:'',
      endTime:'',
      seckillStarTime:'',
      seckillEndTime:'',
      counts:''
    }
  },
  mounted() {
    this.selectSeckill()
  },
  methods: {
    selectSeckill: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectSeckill', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          title: this.seckill.title,
          status: this.seckill.status,
          time: this.seckill.time
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.seckillList = result.data
          qwe.totalSize = result.dataSize;
           console.log(qwe.counts=result.data.counts)
        }).catch(function(err) {
          console.log(err)
        })
    },
    sizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.selectSeckill()
    },
    currentChange(page) {
      this.currentPage = page
      this.selectSeckill()
    },
    refresh: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/re/returnthings/selectSeckill', {
        params: {
          pageSize: this.pageSize,
          currentPage: 1
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.quantity = result.data
          qwe.totalSize = result.dataSize
          qwe.currentPage = 1
          qwe.activityName = ''
          qwe.status = ''
          qwe.time = ''
        }).catch(function(err) {
          console.log(err)
        })
    },
    changeStatus: function(data) {
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnthings/putOrNot', {
        params: {
          seckillId: data.seckillId,
          putOrNot: data.putOrNot
        }
      })
        .then(function(res = 1) {
          var str = ''
          if (data.putOrNot === 1) {
            str = '上架成功'
          } else {
            str = '下架成功'
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
    addSeckill: function(e) {
      const asd = this
      this.$axios.get('http://localhost:8081/re/returnthings/addSeckill', {
        params: {
          title: this.title,
          starTime:this.starTime,
          endTime:this.endTime,
          seckillStarTime:this.seckillStarTime,
          seckillEndTime:this.seckillEndTime
        }
      }).then(function(res = 1) {
        asd.selectSeckill()
        asd.$message({
          message: '添加成功',
          type: 'success'
        })
      }).catch(function(err) {
        console.log(err)
      })
    },
  }
}</script>
