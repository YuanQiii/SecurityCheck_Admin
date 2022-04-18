<template>
  <div class="product-list">
    <!-- <product-filter class="filter" @SearchList="SearchList" /> -->

    <el-card class="operate-container" shadow="never">
      <div class="left">
        <i class="el-icon-tickets"></i> <span>数据列表</span>
      </div>

      <el-button class="btn-add" @click="handleBatchAdd" size="mini">
        批量添加
      </el-button>
    </el-card>

    <product-datasheets
      class="list"
      :loading="loading"
      :dataList="dataList"
      @selectionChange="selectionChange"
      @deleteIndex="deleteIndex"
    />

    <product-operate
      :total="total"
      :selectList="selectList"
      class="product-operate"
      @pageConfigChange="pageConfigChange"
      @batchOperate="batchOperate"
    />

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :show-close="false"
      width="30%"
    >
      <el-form ref="addCountForm" :model="addCount" label-width="120px">
        <el-form-item label="数量" prop="count">
          <el-input
            v-model="addCount.count"
            auto-complete="off"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ycProductListApi, ycBatchAddApi } from "@/api/yc";

import ProductFilter from "./components/ProductFilter.vue";
import ProductOperate from "./components/ProductOperate.vue";
import ProductDatasheets from "./components/ProductDatasheets.vue";
export default {
  name: "YCList",
  components: {
    ProductFilter,
    ProductOperate,
    ProductDatasheets,
  },
  created() {
    this.getProductList();
  },
  data() {
    return {
      productList: [],
      total: 0,
      loading: false,
      dataList: [],
      selectList: [],
      listConfig: {},
      pageConfig: {
        pageSize: 5,
        pageNum: 1,
      },
      dialogTitle: "添加数据数量",
      dialogVisible: false,
      addCount: {
        count: 0,
      },
    };
  },

  methods: {
    //  获取商品
    getProductList() {
      this.loading = true;
      ycProductListApi(this.pageConfig.pageSize, this.pageConfig.pageNum).then(
        (response) => {
          console.log(response);
          this.dataList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },

    pageConfigChange(value) {
      this.pageConfig = value;
      this.getProductList();
    },

    selectionChange(value) {
      this.selectList = value;
    },

    deleteIndex(value) {
      console.log(value);
    },

    batchOperate(value) {
      console.log(value);
    },

    getMatchResult(element) {
      let keys = Object.keys(this.listConfig);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];

        if (this.listConfig[key] != null || this.listConfig[key] != undefined) {
          if (key == "keyword") {
            if (!element.name.includes(this.listConfig[key])) {
              return false;
            }
          } else {
            if (this.listConfig[key] != element[key]) {
              return false;
            }
          }
        }
      }
      return true;
    },

    handleBatchAdd() {
      this.dialogVisible = true;
    },
    handleClose() {
      if (!this.dialogVisible && this.$refs.addCountForm) {
        this.$refs.addCountForm.clearValidate();
      }
    },
    handleConfirm() {
      let count = this.addCount.count;
      if (count) {
        ycBatchAddApi(count).then((response) => {
          this.getProductList();
        });
        this.loading = true;
      }
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.product-list {
  .filter {
    margin-top: 60px;
    margin-left: 20px;
  }
  .operate-container {
    margin-left: 20px;
    margin-top: 20px;
    .left {
      display: inline-block;
      .el-icon-tickets {
        margin-right: 5px;
      }
    }
    .btn-add {
      float: right;
    }
  }
  .list {
    margin-left: 20px;
    margin-top: 20px;
  }
  .product-operate {
    margin-bottom: 40px;
  }
}
</style>
