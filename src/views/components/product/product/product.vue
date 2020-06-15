<template>
  <div id="app">



    <el-dialog title="修改商品" :visible.sync="showDialog" v-if="showDialog" center>
     
        <update :onePid='onePid' @LisUpdate="listenUpdate"></update>

</el-dialog>






    <el-container>
      <el-header>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="输入搜索">
            <el-input v-model="product.productName" placeholder="名称/商品货号" @change="inputChange"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select
              v-model="product.classes"
              filterable
              placeholder="请选择"
              @change="selectChange"
            >
              <el-option
                v-for="item in classes"
                :key="item.id"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="refresh">刷新页面</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-container>
        <el-aside width="115px">
          <br />

          <el-button type="primary" @click="query(1)">已上架</el-button>
          <br />
          <br />
          <el-button type="primary" @click="query(2)">未上架</el-button>
          <br />
          <br />
          <el-button type="primary" @click="query(3)">待审核</el-button>
          <br />
          <br />
          <el-button type="primary" @click="query(4)">未通过</el-button>
          <br />
          <br />
          <el-button type="primary" @click="query(5)">已删除</el-button>
          <br />
          <br />
        </el-aside>
        <el-main>
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              @click="ControlSome('shangjia')"
              :disabled="isOne"
            >批量上架</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="ControlSome('xiajia')"
              :disabled="isTwo"
            >批量下架</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="ControlSome('del')"
              :disabled="isThree"
            >批量删除</el-button>
          </el-button-group>

          <el-table
            :data="productList"
            border
            style="width: 100%;"
            max-height="400"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column type="index" label="序号" :index="indexMethod" width="40"></el-table-column>

            <el-table-column prop="productName" label="商品名称" width="80"></el-table-column>
            <el-table-column prop="price" label="单价" width="50"></el-table-column>
            <el-table-column prop="productNumber" label="货号" width="80"></el-table-column>

            <el-table-column prop="image" label="图片" width="175">
              <template slot-scope="scope" class="demo-image__preview">
                <el-image
                  :src="require('@/dir/imgs/'+scope.row.image)"
                  :preview-src-list="[require('@/dir/imgs/'+scope.row.image)]"
                  style="width:150px;height:80px"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="productModel" label="规格" width="50"></el-table-column>
            <el-table-column prop="productColor" label="颜色" width="50"></el-table-column>
            <el-table-column label="上市日期" width="100">
              <template slot-scope="scope">
                {{scope.row.marketDate | Format}}
              </template>
            </el-table-column>
            <el-table-column prop="productMaterials" label="主要材料" width="80"></el-table-column>
            <el-table-column prop="productUser" label="适用范围" width="80"></el-table-column>
            <el-table-column prop="className" label="分类" width="80"></el-table-column>
            <el-table-column prop="sellVolume" label="销量" width="60"></el-table-column>
             <el-table-column prop="counts" label="库存" width="60"></el-table-column> 
            <el-table-column prop="status" label="审核状态" width="80">
              <template slot-scope="scope">
                <template>
                  <el-tag v-if="scope.row.status == 1 " type="success">已审核</el-tag>
                  <el-tag v-if="scope.row.status == 2 " type="danger">未审核</el-tag>
                  <el-tag v-if="scope.row.status == 0 " type="danger">已拒绝</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="upStatus" label="上架状态" width="80">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.upStatus=='1' ? '已上架' : '未上架' " placement="top">
                  <el-switch
                    v-model="scope.row.upStatus"
                    :active-value="1"
                    :inactive-value="2"
                    @change="changeSwitch(scope.row)"
                  ></el-switch>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>

                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize"
          ></el-pagination>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { array } from "jszip/lib/support";
import qs from "qs";
import update from '@/views/components/product/product/updateProduct.vue'

export default {
  components:{
    update
  },
  data() {
    return {
      productList: [],
      pageSize: 2,
      currentPage: 1,
      totalSize: 0,
      product: { productName: "", classes: "" },
      classes: [],
      upStatus: "",
      pid: "",
      shangjia: "",
      shenhe: "",
      shanchu: "",
      isOne: false,
      isTwo: false,
      isThree: false,
      idss: [],
      onePid:"",
      showDialog:false

    };
  },
  methods: {
    listenUpdate(reVal){
      if(reVal =="reback"){
        this.showDialog=false;
             this.$message({
                        showClose:true,
                        duration:1000,
                         message: '取消操作',
                         type: 'warning'
                    });
      }else if(reVal =="success"){
         this.showDialog=false;
                    this.query();
                    this.$message({
                        showClose:true,
                        duration:1000,
                         message: '修改成功',
                         type: 'success'
                    });

      }else{
                    this.query();
                    this.$message({
                        showClose:true,
                        duration:1000,
                         message: '修改失败',
                         type: 'error'
                    });

      }





    },
    query: function(e) {
      if (e != null && e != "") {
        if (e == 1) {
          this.shangjia = 1;
          this.shenhe = "";
          this.isOne = true;
          this.isTwo = false;
          this.isThree = false;
          this.shanchu = "";
          this.currentPage = 1;
        } else if (e == 2) {
          this.shangjia = 2;
          this.shenhe = "";
          this.isOne = false;
          this.isTwo = true;
          this.isThree = false;
          this.shanchu = "";
          this.currentPage = 1;
        } else if (e == 3) {
          this.shenhe = 2;
          this.shangjia = "";
          this.isOne = true;
          this.isTwo = true;
          this.isThree = false;
          this.shanchu = "";
          this.currentPage = 1;
        } else if (e == 4) {
          this.shenhe = 0;
          this.shangjia = "";
          this.isOne = true;
          this.isTwo = true;
          this.isThree = false;
          this.shanchu = "";
          this.currentPage = 1;
        } else if (e == 5) {
          this.shanchu = 0;
          this.shenhe = "";
          this.shangjia = "";
          this.isOne = true;
          this.isTwo = true;
          this.isThree = true;
          this.currentPage = 1;
        }
      }

      const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryProduct", {
          params: {
            pageSize: that.pageSize,
            currentPage: that.currentPage,
            productName: that.product.productName,
            classes: that.product.classes,
            status: that.shenhe,
            upStatus: that.shangjia,
            isShow: that.shanchu
          }
        })
        .then(function(res) {
          const result = res.data;
          that.productList = result.data;
          that.totalSize = result.dataSize;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    queryClasses() {
      const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryClasses", {})
        .then(function(res) {
          that.classes = res.data;
        });
    },
    handleEdit(e) {
      this.showDialog=true;
      this.onePid=e.pid;
    },
    handleDelete(e) {
      this.$confirm("确定删除?删除后自动下架！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const that = this;
          this.$axios
            .get("http://localhost:8081/product/deleteProductById", {
              params: {
                id: e.pid
              }
            })
            .then(function(res) {
              if (res.data.code == 200) {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "删除成功",
                  type: "success"
                });
                that.query();
              } else {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "删除失败",
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            showClose: true,
            duration: 1000,
            message: "已取消删除"
          });
        });
    },
    sizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.query();
    },

    currentChange(page) {
      this.currentPage = page;
      this.query();
    },
    indexMethod(index) {
      return index + 1;
    },
    refresh() {
      const that = this;
      this.$axios.get("http://localhost:8081/product/queryProduct", {
          params: {
            pageSize: that.pageSize,
            currentPage: 1
          }
        })
        .then(function(res) {
          const result = res.data;
          that.productList = result.data;
          that.totalSize = result.dataSize;
          that.currentPage = 1;
          that.product.productName = "";
          that.product.classes = "";
          that.shangjia = "";
          that.shenhe = "";
          that.shanchu = "";
          that.isOne = false;
          that.isTwo = false;
          that.isThree = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeSwitch(e) {
      const that = this;
      if (e.status == 0 || e.status == 2) {
        e.upStatus = 2;
        that.$message({
          showClose: true,
          duration: 1000,
          message: "先审核,后上架",
          type: "error"
        });
      } else {
        this.$axios
          .get("http://localhost:8081/product/updateUpStatusById", {
            params: {
              upStatus: e.upStatus,
              pid: e.pid
            }
          })
          .then(function(res) {
            if (res.data.code == 200 && e.upStatus == 1) {
              that.$message({
                showClose: true,
                duration: 1000,
                message: "上架成功",
                type: "success"
              });
              that.query();
            } else if (res.data.code == 200 && e.upStatus == 2) {
              that.$message({
                showClose: true,
                duration: 1000,
                message: "下架成功",
                type: "success"
              });
              that.query();
            } else if (res.data.code == 400) {
              that.$message({
                showClose: true,
                duration: 1000,
                message: "操作失败",
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    handleSelectionChange(val) {
      const ids = new Array();
      val.forEach(row => {
        ids.push(row.pid);
      });
      this.idss = ids;
    },
    ControlSome(e) {
      if (this.idss == null || this.idss == "") {
        this.$message({
          showClose: true,
          duration: 1000,
          message: "请先选择",
          type: "error"
        });
      } else {
        if (e == "shangjia") {
          this.$confirm("只批量上架已审核商品，继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              const that = this;
              this.$axios
                .get("http://localhost:8081/product/controlSome", {
                  params: {
                    type: "shangjia",
                    ids: that.idss
                  },
                  paramsSerializer: params => {
                    return qs.stringify(params, { indices: false });
                  }
                })
                .then(function(res) {
                  if (res.data.code == 200) {
                    that.$message({
                      showClose: true,
                      duration: 1000,
                      message: "批量上架成功",
                      type: "success"
                    });
                    that.query();
                  } else if (res.data.code == 300) {
                    that.$message({
                      showClose: true,
                      duration: 1000,
                      message: "没有可批量上架的商品",
                      type: "error"
                    });
                    that.query();
                  } else {
                    that.$message({
                      showClose: true,
                      duration: 1000,
                      message: "批量上架失败",
                      type: "error"
                    });
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                showClose: true,
                duration: 1000,
                message: "已取消批量上架"
              });
            });
        } else if (e == "xiajia") {
          this.$axios
            .get("http://localhost:8081/product/controlSome", {
              params: {
                type: "xiajia",
                ids: that.idss
              },
              paramsSerializer: params => {
                return qs.stringify(params, { indices: false });
              }
            })
            .then(function(res) {
              if (res.data.code == 200) {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "批量下架成功",
                  type: "success"
                });
                that.query();
              } else {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "批量下架失败",
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else if (e == "del") {
          this.$axios
            .get("http://localhost:8081/product/controlSome", {
              params: {
                type: "delete",
                ids: that.idss
              },
              paramsSerializer: params => {
                return qs.stringify(params, { indices: false });
              }
            })
            .then(function(res) {
              if (res.data.code == 200) {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "批量删除成功",
                  type: "success"
                });
                that.query();
              } else {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "批量删除失败",
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      }
    },
    inputChange() {
      //模糊查询 当前页设置为第一页
      this.currentPage = 1;
    },
    selectChange() {
      //模糊查询 当前页设置为第一页
      this.currentPage = 1;
    }
  },
  mounted() {
    this.query();
    this.queryClasses();
  }
};
</script>

<style scoped>
#app {
  position: absolute;
  left: 20px;
  top: 10px;
}
</style>