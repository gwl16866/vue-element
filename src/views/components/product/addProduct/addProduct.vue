<template>
  <el-scrollbar style="height:650px;">
    <br />
    <div id="step">
      <el-steps :active="active" finish-status="success" space="300px">
        <el-step title="选择商品分类"></el-step>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品属性"></el-step>
      </el-steps>
    </div>

    <el-form>
      <div id="cla" v-show="claShow">
        <el-form-item label="类别:">
          <el-select v-model="contain.product.classes" placeholder="请选择商品分类" @change="change">
            <el-option
              v-for="item in classes"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div id="but">
          <el-button type="primary" style="margin-top: 12px;" @click="before" v-if="active > 0">上一步</el-button>
          <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active < 2">下一步</el-button>
          <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active == 2">完成</el-button>
          <el-button style="margin-top: 12px;" @click="clear">清空</el-button>
        </div>
      </div>

      <div id="info" v-show="infoShow">
        <el-form-item label="商品分类：">
          <el-select disabled v-model="contain.product.classes" placeholder="请选择商品分类">
            <el-option
              v-for="item in classes"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="contain.product.productName" placeholder="请输入商品名称" style="width:200px"></el-input>
        </el-form-item>


        <el-form-item label="商品货号：">
          <el-input disabled="true" v-model="contain.product.productNumber" placeholder="可自动生成" style="width:200px" @input="queryPNum"></el-input>
     <span style="color:red">{{spa}}</span> 
        </el-form-item>
          

        <div class="but">
          <el-button type="primary" style="margin-top: 12px;" @click="before" v-if="active > 0">上一步</el-button>
          <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active < 2">下一步</el-button>
          <el-button type="primary" style="margin-top: 12px;" @click="ok" v-if="active == 2">完成</el-button>
          <el-button style="margin-top: 12px;" @click="clear">清空</el-button>
        </div>
      </div>

      <div id="model" v-show="modelShow">
        <el-form-item label="商品规格：">
          <el-checkbox-group v-model="modelGroup" @change="modelGroupChange">
            <el-checkbox-button
              v-for="model in models"
              :label="model.twoModel"
              :key="model.twoModel"
            >{{model.twoModel}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="商品颜色：">
          <el-checkbox-group v-model="colorGroup" @change="colorGroupChange">
            <el-checkbox-button
              v-for="color in colors"
              :label="color.twoModel"
              :key="color.twoModel"
            >{{color.twoModel}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="开启一键填写:">
          <el-switch v-model="status" :active-value="1" :inactive-value="2" ></el-switch>
        </el-form-item>



        <el-table :data="contain.addList">
          <el-table-column type="index" label="序号" :index="indexMethod" width="100"></el-table-column>
          <el-table-column prop="model" label="规格" width="100">
            <template slot-scope="scope">
              <el-input readonly v-model="contain.addList[scope.row.index].model"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="color" label="颜色" width="100">
            <template slot-scope="scope">
              <el-input readonly v-model="contain.addList[scope.row.index].color"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="销售价格" width="100">
            <template slot-scope="scope">
              <el-input
                v-model="contain.addList[scope.row.index].price"
                @input="priceChange(scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="counts" label="商品库存" width="100">
            <template slot-scope="scope">
              <el-input
                v-model="contain.addList[scope.row.index].counts"
                @input="countsChange(scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="alarm" label="库存预警值" width="100">
            <template slot-scope="scope">
              <el-input
                v-model="contain.addList[scope.row.index].alarm"
                @input="alarmChange(scope.row)"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>

        <br />
        <br />
                                <el-form-item label="上市日期:">
                                    <el-date-picker
                                        v-model="contain.product.marketDate"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd">
                                        </el-date-picker>
                                </el-form-item>

        <el-form-item label="主要材料:">
          <el-input
            v-model="contain.product.productMaterials"
            placeholder="请输入主要材料"
            style="width:200px"
          ></el-input>
        </el-form-item>

        <el-form-item label="适用范围:">
          <el-input v-model="contain.product.productUser" placeholder="请输入适用范围" style="width:200px"></el-input>
        </el-form-item>

        <div class="but">
          <el-button type="primary" style="margin-top: 12px;" @click="before" v-if="active > 0">上一步</el-button>
          <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active < 2">下一步</el-button>
          <el-button type="primary" style="margin-top: 12px;" @click="ok" v-if="active == 2">完成</el-button>
          <el-button style="margin-top: 12px;" @click="clear">清空</el-button>
        </div>
      </div>
    </el-form>
  </el-scrollbar>
</template>

<script>
import qs from "qs";
import moment from "moment"

export default {
  data() {
    return {
      active: 0,
      claShow: true,
      infoShow: false,
      modelShow: false,
      classes: [],
      classesSelectStatus: false,
      models: [],
      colors: [],
      modelGroup: [],
      colorGroup: [],
      contain: {
        product: {},
        addList: []
      },
      priceModel: "",
      status: "",
      spa:""
    };
  },
  methods: {
    queryPNum(val){

    const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryPNum", 
          {
            params:{
               num:val
            }
          }
        )
        .then(res => {
          if (res.data == 0) {
               that.spa=""
              } else {
              that.spa="货号重复,请修改!"
              }


        })
        .catch(function(error) {
          console.log(error);
        });





    },
    priceChange(val) {
      this.$forceUpdate();
      if (val.index == 0) {
        if (this.status == 1) {
          const list = this.contain.addList;
          for (var i = 0; i < list.length; i++) {
            list[i].price = val.price;
          }
        }
      }
    },
    countsChange(val) {
      this.$forceUpdate();
      if (val.index == 0) {
        if (this.status == 1) {
          const list = this.contain.addList;
          for (var i = 0; i < list.length; i++) {
            list[i].counts = val.counts;
          }
        }
      }
    },
    alarmChange(val) {
      this.$forceUpdate();
      if (val.index == 0) {
        if (this.status == 1) {
          const list = this.contain.addList;
          for (var i = 0; i < list.length; i++) {
            list[i].alarm = val.alarm;
          }
        }
      }
    },
    next() {
      this.active = this.active + 1;
      if (this.active == 0) {
        this.claShow = true;
        this.infoShow = false;
        this.modelShow = false;
      }
      if (this.active == 1) {
        this.claShow = false;
        this.infoShow = true;
        this.modelShow = false;
      }
      if (this.active == 2) {
        this.claShow = false;
        this.infoShow = false;
        this.modelShow = true;
      }
    },
    before() {
      this.active = this.active - 1;
      if (this.active == 0) {
        this.claShow = true;
        this.infoShow = false;
        this.modelShow = false;
      }
      if (this.active == 1) {
        this.claShow = false;
        this.infoShow = true;
        this.modelShow = false;
      }
      if (this.active == 2) {
        this.claShow = false;
        this.infoShow = false;
        this.modelShow = true;
        f;
      }
    },
    ok() {
   
      const that = this;
      this.$axios
        .post("http://localhost:8081/product/addProduct", 
          that.contain
        )
        .then(res => {
          if (res.data.code == 200) {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "添加成功",
                  type: "success"
                });
              } else {
                that.$message({
                  showClose: true,
                  duration: 1000,
                  message: "添加失败",
                  type: "error"
                });
              }


        })
        .catch(function(error) {
          console.log(error);
        });
    },
    queryClasses() {
      const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryGoodClasses", {})
        .then(function(res) {
          that.classes = res.data;
        });
    },
    clear() {
      this.contain.product = {};
    },
    change() {
      this.contain.addList = [];
      this.models = [];
      this.color = [];
      this.colorGroup = [];
      this.modelGroup = [];

      const that = this;
      this.$axios
        .get("http://localhost:8081/product/queryClassModelOrColor", {
          params: {
            fid: that.contain.product.classes,
            type: "1"
          }
        })
        .then(function(res) {
          that.models = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });

      this.$axios
        .get("http://localhost:8081/product/queryClassModelOrColor", {
          params: {
            fid: that.contain.product.classes,
            type: "2"
          }
        })
        .then(function(res) {
          that.colors = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    modelGroupChange(val) {
      this.modelGroup = val;
      if (val.length == 0) {
        this.contain.addList = [];
      }
      const m = this.modelGroup;
      const c = this.colorGroup;
      const mLength = this.modelGroup.length;
      const cLength = this.colorGroup.length;
      if (mLength > 0 && cLength > 0) {
        var counts = 0;
        if (mLength > cLength) {
          this.contain.addList = [];
          for (var i = 0; i < cLength; i++) {
            for (var j = 0; j < mLength; j++) {
              const obj = {};
              obj.index = counts;
              counts = counts + 1;
              obj.model = m[j];
              obj.color = c[i];
              this.contain.addList.push(obj);
            }
          }
        } else if (mLength < cLength) {
          this.contain.addList = [];
          for (var i = 0; i < mLength; i++) {
            for (var j = 0; j < cLength; j++) {
              const obj = {};
              obj.index = counts;
              counts = counts + 1;
              obj.model = m[i];
              obj.color = c[j];
              this.contain.addList.push(obj);
            }
          }
        } else if (mLength == cLength) {
          this.contain.addList = [];
          for (var i = 0; i < cLength; i++) {
            for (var j = 0; j < mLength; j++) {
              const obj = {};
              obj.index = counts;
              counts = counts + 1;
              obj.model = m[j];
              obj.color = c[i];
              this.contain.addList.push(obj);
            }
          }
        }
      }

      console.log(this.contain.addList);
    },
    colorGroupChange(val) {
      this.colorGroup = val;
      if (val.length == 0) {
        this.contain.addList = [];
      }
      const m = this.modelGroup;
      const c = this.colorGroup;
      const mLength = this.modelGroup.length;
      const cLength = this.colorGroup.length;
      if (mLength > 0 && cLength > 0) {
        var counts = 0;
        if (mLength > cLength) {
          this.contain.addList = [];
          for (var i = 0; i < cLength; i++) {
            for (var j = 0; j < mLength; j++) {
              const obj = {};
              obj.index = counts;
              counts = counts + 1;
              obj.model = m[j];
              obj.color = c[i];
              this.contain.addList.push(obj);
            }
          }
        } else if (mLength < cLength) {
          this.contain.addList = [];
          for (var i = 0; i < mLength; i++) {
            for (var j = 0; j < cLength; j++) {
              const obj = {};
              obj.index = counts;
              counts = counts + 1;
              obj.model = m[i];
              obj.color = c[j];
              this.contain.addList.push(obj);
            }
          }
        } else if (mLength == cLength) {
          this.contain.addList = [];
          for (var i = 0; i < cLength; i++) {
            for (var j = 0; j < mLength; j++) {
              const obj = {};
              obj.index = counts;
              counts = counts + 1;
              obj.model = m[j];
              obj.color = c[i];
              this.contain.addList.push(obj);
            }
          }
        }
      }
      console.log(this.contain.addList);
    },
    indexMethod(index) {
      return index + 1;
    }
  },

  mounted() {
    this.queryClasses();
  }
};
</script>

<style>
#step {
  position: relative;
  left: 270px;
}

#cla {
  position: relative;
  top: 100px;
  left: 450px;
}

#info {
  position: relative;
  top: 100px;
  left: 450px;
}

#model {
  position: relative;
  top: 100px;
  left: 450px;
}

#but {
  position: relative;
  top: 100px;
  left: 70px;
}

body,
html {
  margin: 0 0 0 0;
  overflow: hidden hidden;
}
</style>