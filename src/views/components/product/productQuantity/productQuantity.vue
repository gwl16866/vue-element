<template>
  <div><br>
    <el-form label-width="“150px”" :inline="true">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="输入搜索">
        <el-col :span="30">
          <el-input v-model="productOrNumber" placeholder="商品名称/商品货号" @change="putChange" />
        </el-col>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-col :span="30">
          <el-select v-model="controlClass" placeholder="全部" @change="putChange">
            <el-option label="退货时" value="1" />
            <el-option label="添加商品" value="2" />
            <el-option label="订单发货时" value="3" />
            <el-option label="减少商品" value="4" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-col :span="11">
          <el-date-picker v-model="time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="putChange"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectQuantity()"><i class="el-icon-search">搜索</i></el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="refresh"><i class="el-icon-refresh-left">刷新</i></el-button>
      </el-form-item>
    </el-form>

    <el-table :data="quantity" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="165" />
      <el-table-column label="商品图片" width="165">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="require('@/dir/imgs/'+scope.row.image)"
            :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="商品名称" width="165" />
      <el-table-column label="货号/属性" width="165">
        <template slot-scope="scope">
          货号:<p>{{ scope.row.productNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column  label="订单号" width="165">
        <template slot-scope="scope">
          <span v-if="scope.row.controlClass=='2'">N/A</span>
          <span v-else>{{ scope.row.orderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="165">
        <template slot-scope="scope">
          数量: <span v-if="scope.row.controlClass=='3'">-{{ scope.row.ocounts }}</span>
          <span v-else-if="scope.row.controlClass=='4'">-{{ scope.row.ocounts }}</span>
          <span v-else>+{{ scope.row.ocounts }}</span>
          <p>剩余:<span>{{ scope.row.count }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="库存类型" width="165">
        <template slot-scope="scope">
          <p v-if="scope.row.status=='1'">商品库存</p>
          <p v-else>货品库存</p>
        </template>
      </el-table-column>
      <el-table-column  label="操作类型" width="165">
        <template slot-scope="scope">
          <p v-if="scope.row.controlClass=='1'">退货时</p>
          <p v-else-if="scope.row.controlClass=='2'">添加商品</p>
          <p v-else-if="scope.row.controlClass=='3'">订单发货时</p>
           <p v-else-if="scope.row.controlClass=='4'">减少商品</p>
        </template>
      </el-table-column>
      <el-table-column label="操作信息" width="165">
        <template slot-scope="scope">
          <span>admin</span><p> {{scope.row.applyTime | dateFormat}}</p>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: [],
      productOrNumber: '',
      controlClass: '',
      time: '',
      pageSize: 2,
      currentPage: 1,
      totalSize: 0
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
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          productOrNumber: this.productOrNumber,
          controlClass: this.controlClass,
          time: this.time
        }
      })
        .then(function(res) {
          const result = res.data
          qwe.quantity = result.data
          qwe.totalSize = result.dataSize
        }).catch(function(err) {
          console.log(err)
        })
    },
    sizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.selectQuantity()
    },

    currentChange(page) {
      this.currentPage = page
      this.selectQuantity()
    },
    refresh: function() {
      var qwe = this
      this.$axios.get('http://localhost:8081/ku/quantity/selectQuantity', {
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
          qwe.productOrNumber = ''
          qwe.controlClass = ''
          qwe.time = ''
        }).catch(function(err) {
          console.log(err)
        })
    },
    putChange:function(){
      this.currentPage=1
    }
  }
}</script>
